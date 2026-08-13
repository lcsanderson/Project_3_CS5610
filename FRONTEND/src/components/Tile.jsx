import { useRef } from "react";
import PropTypes from "prop-types";
import StarIcon from "./StarIcon";

export default function Tile({
  id,
  title,
  designer,
  country,
  year,
  imageUrl,
  actionLabel = "Save",
  onAction,
}) {
  // glass clink sound on hover
  const audioRef = useRef(null);

  function handleHover() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0; // allows immediate replay instead of queuing
    audio.play().catch(() => {});
  }
  const isSaved = actionLabel === "Remove";

  return (
    <div className="tile" onMouseEnter={handleHover}>
      <audio ref={audioRef} src="/sounds/GlassSound.m4a" preload="auto" />
      <div className="tile=image-wrap">
        {onAction && (
        <button
          className="tile-star-button"
          aria-label={isSaved ? "Remove from collection" : "Save to collection"}
          onClick={() =>
            onAction({ objectId: id, title, designer, country, year, imageUrl })
          }
        >
          <StarIcon filled={isSaved} />
        </button>
      )}
      <img src={imageUrl} alt={title} className="tile-image" />

      <p className="tile-title">{title}</p>
      <p className="tile-designer">{designer}</p>
      <p className="tile-country">{country}</p>
      <p className="tile-year">{year}</p>

      </div>
    </div>
  );
}

Tile.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  designer: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  actionLabel: PropTypes.string.isRequired,
  onAction: PropTypes.func,
};
