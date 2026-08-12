import { useRef } from "react";
import PropTypes from "prop-types";

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

  return (
    <div className="tile" onMouseEnter={handleHover}>
      <audio ref={audioRef} src="/sounds/GlassSound.m4a" preload="auto" />
      <img src={imageUrl} alt={title} className="tile-image" />
      <p className="tile-title">{title}</p>
      <p className="tile-designer">{designer}</p>
      <p className="tile-country">{country}</p>
      <p className="tile-year">{year}</p>

      {onAction && (
        <button
          className="tile-save-button"
          onClick={() =>
            onAction({ objectId: id, title, designer, country, year, imageUrl })
          }
        >
          {actionLabel}
        </button>
      )}
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
