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
  return (
    <div className="tile">
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
  title: PropTypes.string.isRequires,
  designer: PropTypes.string.isRequires,
  country: PropTypes.string.isRequires,
  year: PropTypes.string.isRequires,
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  actionLabel: PropTypes.string.isRequires,
  onAction: PropTypes.string.func,
};
