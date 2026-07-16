import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./css/StarButton.css";

// will lead to login/register if no active login
// if logged in, will navigate to collections page
export default function StarButton() {
  // undefined (haven't checked yet), null (checked,
  // nobody logged in), or a real user object.
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

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

  // sets direction of click depending on login or not
  function handleClick() {
    if (user) {
      navigate("/collections");
    } else {
      navigate("/login");
    }
  }

  return (
    <button
      className="star-nav-button"
      onClick={handleClick}
      aria-label={user ? "Go to my collections" : "Log in"}
      disabled={user === undefined}
    > // 5 point star, thank you Claude
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 L14.9 9.1 L22.5 9.5 L16.6 14.4 L18.5 21.8 L12 17.6 L5.5 21.8 L7.4 14.4 L1.5 9.5 L9.1 9.1 Z" />
      </svg>
    </button>
  );
}
