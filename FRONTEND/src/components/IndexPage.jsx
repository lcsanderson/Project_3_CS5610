import { useState, useEffect } from "react";
import Tile from "./Tile.jsx";

export default function IndexPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/api/objects")
      .then((res) => res.json())
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
