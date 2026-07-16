import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Tile from "../components/Tile.jsx";
import SaveToCollectionModal from "../components/SaveToCollectionModal.jsx";

export default function IndexPage() {
  const [objects, setObjects] = useState([]);
  const [query, setQuery] = useState("");

  const [modalItem, setModalItem] = useState(null);
  const [userCollections, setUserCollections] = useState([]);
  const navigate = useNavigate();

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

  // called by tile's onSave prop when save button is clicked
  async function handleSaveClick(item) {
    try {
      const res = await fetch("/api/collections");
      // res auto checks for login bc route is protected by auth
      // if fails sends to login bc likely not logged in
      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch collections (status ${res.status})`);
      }

      const collections = await res.json();
      setUserCollections(collections);
      setModalItem(item);
    } catch (err) {
      console.error("Failed to open save dialog:", err);
    }
  }

  function closeModal() {
    setModalItem(null);
  }

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
          <Tile key={object.id} {...object} onSave={handleSaveClick} />
        ))}
      </div>
      // if modalItem is null bc not activated React doesn't render it
      {modalItem && (
        <SaveToCollectionModal
          item={modalItem}
          collections={userCollections}
          onClose={closeModal}
        />
      )}
    </>
  );
}
