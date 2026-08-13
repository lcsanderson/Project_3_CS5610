import PropTypes from "prop-types";

export default function StarIcon({ filled = true }) {
    return (
        <svg 
        viewBox="0 0 24 24"
        fill={filled ? "currentColor": "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
        aria-hidden="true"
        >
            <path d="M12 2 L14.9 9.1 L22.5 9.5 L16.6 14.4 L18.5 21.8 L12 17.6 L5.5 21.8 L7.4 14.4 L1.5 9.5 L9.1 9.1 Z" />
        </svg>
    );
}

StarIcon.PropTypes = {
    filled: PropTypes.bool,
}