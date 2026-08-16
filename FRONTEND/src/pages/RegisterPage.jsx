export default function RegisterPage() {
  return (
    <div className="auth-page">
      <h1 className="login-h1">REGISTER</h1>
      <form method="POST" action="/api/auth/register">
        <div className="login-criteria">
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="login-criteria">
          <label htmlFor="email">Email address: </label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="login-criteria">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="login-button">register</button>
      </form>
      <p className="register-direction">
        Already have a profile? <a href="/login">Login here</a>
      </p>
    </div>
  );
}