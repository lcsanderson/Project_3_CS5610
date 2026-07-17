import { useState, useEffect } from "react";
import { useNaviagte, Link } from "react-router";
import "../CollectionsPage.css";

export default function CollectionsPage() {
  // null means data is loading, [] means empty collection
  // [...] means here is filled collection
  const [collections, setCollections] = useState(null);
  const navigate = useNaviagte();

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
  // still waiting for fetch to bring back data
  if (collections === null) {
    return <p>Loading your collections...</p>;
  }
  if (collections.length === 0) {
    return <p> No collections yet 💔</p>;
  }

  return (
    <div className="collections-list">
      <h1> Saved Collections </h1>
      {collections.map((collection) => (
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
      ))}
    </div>
  );
}
