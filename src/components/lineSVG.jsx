function VerticalLineSVG() {
  return (
    <svg width="50" height="300">
      <circle cx="25" cy="25" r="12" stroke="black" strokeWidth="2" fill="white" />
      <line x1="25" y1="37" x2="25" y2="263" stroke="black" strokeWidth="2" />
      <circle cx="25" cy="275" r="4" fill="black" />
    </svg>
  );
}
export default VerticalLineSVG;