// needs major styling work
export default function LoginPage() {
  return (
    <div className="auth-page">
      <h1>Login</h1>
      <form method="POST" action="/api/auth/login">
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have a profile? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
