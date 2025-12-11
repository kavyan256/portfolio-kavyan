function VerticalLineSVG({ className = "" }) {
  return (
    <svg width="50" height="300" className={className}>
      <circle cx="25" cy="25" r="4" fill="#fffce1" />
      <line x1="25" y1="37" x2="25" y2="275" stroke="#fffce1" strokeWidth="1" />
      <circle cx="25" cy="287" r="4" fill="#fffce1" />
    </svg>
  );
}
export default VerticalLineSVG;