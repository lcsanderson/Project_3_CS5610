import { useState, useEffect, useCallback } from "react";
import Tile from "../components/Tile.jsx";

export default function IndexPage() {
  const [objects, setObjects] = useState([]);
  const [query, setQuery] = useState("");

  const reloadObjects = useCallback(async () => {
    const url = query.trim()
      ? `/api/search?q=${encodeURIComponent(query.trim())}`
      : "/api/objects";

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Backend responded with status ${res.status}`);
      }
      const data = await res.json();
      setObjects(data);
    } catch (err) {
      console.error("Failed to fetch objects:", err);
    }
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(reloadObjects, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [reloadObjects, query]);

  return (
    <>
      <h3>Welcome to...</h3>
      <h1> LCS003 </h1>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="tile-container">
        {objects.map((object) => (
          <Tile key={object.id} {...object} />
        ))}
      </div>
    </>
  );
}
