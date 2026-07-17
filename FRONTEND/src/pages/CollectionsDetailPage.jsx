import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Tile from "../components/Tile.jsx";
import "../css/CollectionsDetailPage.css";

export default function CollectionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  async function loadCollection() {
    try {
      const res = await fetch(`/api/collections/${id}`);
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      if (res.status === 404) {
        setCollection(undefined);
        return;
      }
      if (!res.ok) {
        throw new Error(`Backend responded with status ${res.status}`);
      }

      const data = await res.json();
      setCollection(data);
    } catch (err) {
      console.error("Failed to load collection:", err);
    }
  }

  useEffect(() => {
    // keeps old collection's data from showing up after URL change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleRenameSubmit() {
    if (!renameValue.trim()) return;
    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: renameValue.trim() }),
      });
      if (!res.ok) {
        throw new Error(`Failed to rename (status ${res.status})`);
      }
      setIsRenaming(false);
      loadCollection();
    } catch (err) {
      console.error("Failed to rename colleciton:", err);
    }
  }

  async function handleRemoveItem(item) {
    try {
      const res = await fetch(`/api/collections/${id}/items/${item.objectId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed to remove item (status ${res.status})`);
      }
      loadCollection();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  }

  async function handleDeleteCollection() {
    try {
      const res = await fetch(`/api/collections/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(`Failed to delete collection (status ${res.status})`);
      }
      navigate("/collections");
    } catch (err) {
      console.error("Failed to delete collection:", err);
    }
  }

  if (collection === null) {
    return <p>Loading collection...</p>;
  }

  if (collection === undefined) {
    return <p>Collection not found...</p>;
  }

  return (
    <div className="collection-detail">
      <div className="collection-detail-header">
        {isRenaming ? (
          <>
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              autoFocus
            />
            <button onClick={handleRenameSubmit}>Save</button>
            <button onClick={() => setIsRenaming(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h1>{collection.name}</h1>
            <button
              onClick={() => {
                setRenameValue(collection.name);
                setIsRenaming(true);
              }}
            >
              Rename
            </button>
          </>
        )}

        <button
          onClick={handleDeleteCollection}
          className="delete-collection-button"
        >
          Delete collection
        </button>
      </div>

      {collection.items.length === 0 ? (
        <p>No items saved in this collection yet.</p>
      ) : (
        <div className="tile-container">
          {collection.items.map((item) => (
            <Tile
              key={item.objectId}
              {...item}
              id={item.objectId}
              actionLabel="Remove"
              onAction={handleRemoveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
