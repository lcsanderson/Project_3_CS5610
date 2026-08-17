import StarButton from "./StarButton";
import PropTypes from "prop-types";

export default function BaseTemplate({ children }) {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <StarButton />
      <main className="app-content" id="main-content" tabIndex={-1}> {children}</main>
      <footer className="app-footer">
        <p> LCS004 • 2026 </p>
      </footer>
    </div>
  );
}

BaseTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
