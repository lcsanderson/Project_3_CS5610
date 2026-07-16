import { useState, useEffect } from "react";
import Tile from "../components/Tile.jsx";

export default function IndexPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/api/objects")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Backend responded with status ${res.status}`);
        }
        // Only reached if the response was actually successful —
        // NOW it's safe to assume the body is the real listings array.
        return res.json();
      })
      .then((data) => setListings(data))
      .catch((err) => console.error("Failed to fetch listings", err));
  }, []);

  return (
    <>
      <h1> This should be a search... bar </h1>
      <div className="tile-container">
        {listings.map((listing) => (
          <Tile key={listing.id} {...listing} />
        ))}
      </div>
    </>
  );
}
