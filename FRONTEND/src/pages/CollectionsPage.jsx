import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import "../css/CollectionsPage.css";

export default function CollectionsPage() {
  // null means data is loading, [] means empty collection
  // [...] means here is filled collection
  const [collections, setCollections] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        if (!res.ok) {
          throw new Error(`Backend responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setCollections(data);
        }
      })
      .catch((err) => console.error("Failed to fetch collections:", err));
  }, [navigate]);

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        throw new Error(`Logout failed (status ${res.status})`);
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  }
  let body;
  if (collections === null) {
    body = <p>Loading collections...</p>;
  } else if (collections.length === 0) {
    body = <p>No collections yet 💔</p>;
  } else {
    body = collections.map((collection) => (
      <Link
        key={collection._id}
        to={`/collections/${collection._id}`}
        className="collection-row"
      >
        <span className="collection-name">{collection.name}</span>
        <span className="collection-count">
          {collection.items.length}{" "}
          {collection.items.length === 1 ? "item" : "items"}
        </span>
      </Link>
    ));
  }

  return (
    <div className="collections-list">
      <button
        className="logout-triangle-button"
        onClick={handleLogout}
        aria-label="Log out"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12,3 21,20 3,20" />
        </svg>
      </button>
      <h1> Saved Collections </h1>
      {body}
    </div>
  );
}
