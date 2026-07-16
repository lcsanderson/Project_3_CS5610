// needs major styling work
export default function RegisterPage() {
  return (
    <div className="auth-page">
      <h1>Register</h1>
      <form method="POST" action="/api/auth/register">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have a profile? <a href="/login">Login here</a>
      </p>
    </div>
  );
}
