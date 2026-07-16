import { useState } from "react";
import "./SaveToCollectionModal.css";

export default function SaveToCollectionModal({ item, collections, onClose}) {
    const [selectedId, setSelectedId] = useState(
        collections.length > 0 ? collections[0]._id : "new" 
    );

    const [newCollectionName, setNewCollectionName] = useState("");

    // used to disable button once a save is happening
    const [saving, setSaving] = useState("false");

    // used to set a message to show if something goes wrong
    // null means no error rn
    const [error, setError] = useState(null);

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
                    throw new Error(`Failed to create collection (status ${createRes.status})`);
                }
                
                const newCollection = await createRes.json();
                targetCollectionId = newCollection._id;
            }

            const addRes = await fetch(`/api/collections/${targetCollectionId}items`, {
                method: "POST",
                headers: { "Content-Type": "applications/json" },
                body: JSON.stringify(item),
            });

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
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2>Save to collection</h2>
                {collections.length > 0 && (
                    <fieldset>
                        <legend>Choose an existing collection</legend>
                        {collections.map((collection) => (
                            <lavel key={collection._id} className="modal-radio-row">
                                <input 
                                type="radio"
                                name="colleciton-choice"
                                value={collection._id}
                                checked={selectedId === collection._id}
                                onChange={() => setSelectedId(collection._id)}
                                />
                                {collection.name}
                            </lavel>
                        ))}
                    </fieldset>
                )}

                <fieldset>
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
                    <button onClick={onClose} disabled={saving}>
                        Cancel
                    </button>
                    <button onClick={handleConfirm} disabled={saving}>
                        {saving ? "Saving" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
