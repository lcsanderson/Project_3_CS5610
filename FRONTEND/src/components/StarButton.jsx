import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import StarIcon from "./StarIcon";
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
      : "Log in";

  return (
    <button
      className="star-nav-button"
      onClick={handleClick}
      aria-label={label}
      disabled={user === undefined}
    >
      <StarIcon />
    </button>
  );
}
