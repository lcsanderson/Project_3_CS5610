import express from "express";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { connectToDatabase } from "./config/db.js";
import passport from "./config/passport.js";

import objectesRouter from "./routes/Objects.js";
import authRouter from "./routes/Auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

await connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true once deployed behind HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.static("./FRONTEND/dist"));
app.use("/api", objectesRouter);
app.use("/api/auth", authRouter);

app.get("*splat", function (req, res) {
  res.sendFile("index.html", {
    root: join(__dirname, "./FRONTEND/dist"),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
