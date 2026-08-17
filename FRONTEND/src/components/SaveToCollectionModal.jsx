import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../css/SaveToCollectionModal.css";

export default function SaveToCollectionModal({ item, collections, onClose }) {
  const [selectedId, setSelectedId] = useState(
    collections.length > 0 ? collections[0]._id : "new",
  );

  const [newCollectionName, setNewCollectionName] = useState("");

  // used to disable button once a save is happening
  const [saving, setSaving] = useState(false);

  // used to set a message to show if something goes wrong
  // null means no error rn
  const [error, setError] = useState(null);

  const modalRef = useRef(null); // NEW: for finding focusable elements inside
  const previouslyFocusedRef = useRef(null); // NEW: remembers what to refocus on close

  // traps focus inside the modal, closes on Escape, and restores
  // focus to whatever triggered the modal once it closes
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modalNode = modalRef.current;
    const focusableEls = modalNode.querySelectorAll(focusableSelector);
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    firstEl?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // manual wrap-around since the browser has no built-in focus trap
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus(); // return focus to the tile's save button
    };
  }, [onClose]);

  async function handleConfirm() {
    setError(null);

    if (selectedId === "new" && !newCollectionName.trim()) {
      setError("Please enter a name for the new collection.");
      return;
    }

    setSaving(true);

    try {
      let targetCollectionId = selectedId;
      if (selectedId === "new") {
        const createRes = await fetch("/api/collections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCollectionName.trim() }),
        });
        if (!createRes.ok) {
          throw new Error(
            `Failed to create collection (status ${createRes.status})`,
          );
        }

        const newCollection = await createRes.json();
        targetCollectionId = newCollection._id;
      }

      const addRes = await fetch(
        `/api/collections/${targetCollectionId}/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        },
      );

      if (!addRes.ok) {
        throw new Error(`Failed to save item (status ${addRes.status})`);
      }

      onClose();
    } catch (err) {
      console.error("Failed to save item to colelciton:", err);
      setError("Something went wrong saving this item. Please try again.");
    } finally {
      // always makes sure button re-enables even if save fails and need to try again
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title" id="modal-title">Save to collection</h2>
        {collections.length > 0 && (
          <fieldset className="modal-fieldset">
            <legend>Choose an existing collection</legend>
            {collections.map((collection) => (
              <label key={collection._id} className="modal-radio-row">
                <input
                  type="radio"
                  name="colleciton-choice"
                  value={collection._id}
                  checked={selectedId === collection._id}
                  onChange={() => setSelectedId(collection._id)}
                />
                {collection.name}
              </label>
            ))}
          </fieldset>
        )}

        <fieldset className="modal-fieldset">
          <legend>Or create a new colleciton</legend>
          <label className="modal-radio-row">
            <input
              type="radio"
              name="collection-choice"
              value="new"
              checked={selectedId === "new"}
              onChange={() => setSelectedId("new")}
            />
            <input
              type="text"
              placeholder="New collection name"
              value={newCollectionName}
              onChange={(e) => {
                setNewCollectionName(e.target.value);
                setSelectedId("new");
              }}
            />
          </label>
        </fieldset>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-actions">
          <button className="modal-button" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button
            className="modal-button"
            onClick={handleConfirm}
            disabled={saving}
          >
            {saving ? "Saving" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

SaveToCollectionModal.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    designer: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};
