import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "../models/users.js";

const strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },

  async (email, password, done) => {
    try {
      const user = await findUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "User or password incorrect" });
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPassword) {
        return done(null, false, { message: "User or password incorrect" });
      }

      // Claude suggested this as a safety and design decision measure
      // intended to prevent breaking next login attempt by keeping data
      // in unsued variable instead of deleting it permanently
      // interested to know if this is a smart practice (eslint doesn't think so)
      // eslint-disable-next-line no-unused-vars
      const { passwordHash, ...safeUser } = user;

      return done(null, safeUser);
    } catch (error) {
      done(error);
    }
  },
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
