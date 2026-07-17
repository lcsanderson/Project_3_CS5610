export default function Tile({
  id,
  title,
  designer,
  country,
  year,
  imageUrl,
  onSave,
}) {
  return (
    <div className="tile">
      <img src={imageUrl} alt={title} className="tile-image" />
      <p className="tile-title">{title}</p>
      <p className="tile-designer">{designer}</p>
      <p className="tile-country">{country}</p>
      <p className="tile-year">{year}</p>
      <button
        className="tile-save-button"
        onClick={() =>
          onSave({
            objectId: id,
            title,
            designer,
            country,
            year,
            imageUrl,
          })
        }
      >
        Save
      </button>
    </div>
  );
}
