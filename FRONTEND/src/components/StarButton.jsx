import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import "../css/StarButton.css";

// will lead to login/register if no active login
// if logged in, will navigate to collections page
export default function StarButton() {
  // undefined (haven't checked yet), null (checked,
  // nobody logged in), or a real user object.
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("/api/auth/user")
      .then((res) => {
        if (!res.ok) {
          setUser(null);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUser(data.user);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const onCollectionsPage = location.pathname.startsWith("/collections");

  // sets direction of click depending on login or not
  function handleClick() {
    if (onCollectionsPage) {
      navigate("/");
    } else if (user) {
        navigate("/collections");
    } else {
      navigate("/login");
    }
  }

  const label = onCollectionsPage
  ? "Go to home page"
  : user
  ? "Go to my colelctions"
  : "Log in"

  return (
    <button
      className="star-nav-button"
      onClick={handleClick}
      aria-label={label}
      disabled={user === undefined}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 L14.9 9.1 L22.5 9.5 L16.6 14.4 L18.5 21.8 L12 17.6 L5.5 21.8 L7.4 14.4 L1.5 9.5 L9.1 9.1 Z" />
      </svg>
    </button>
  );
}
