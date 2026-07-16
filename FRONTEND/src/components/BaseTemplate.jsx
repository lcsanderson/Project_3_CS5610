import StarButton from "./StarButton";

export default function BaseTemplate({ children }) {
  return (
    <div className="app-shell">
      <StarButton />
      <main className="app-content"> {children}</main>
      <footer className="app-footer">
        <hr />
        <p> LCS003 • 2026 </p>
      </footer>
    </div>
  );
}
