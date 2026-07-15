export default function Tile({ title, designer, country, year, imageUrl}) {
    return (
        <div className="tile">
        <img src={imageUrl} alt={title} className="tile-image" />
            <p className="tile-title">{title}</p>
            <p className="tile-designer">{designer}</p>
            <p className="tile-country">{country}</p>
            <p className="tile-year">{year}</p>
        </div>
    );
}