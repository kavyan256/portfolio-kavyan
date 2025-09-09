const Line = ({ width = 200, height = 50, color = "black" }) => (
  <svg width={width} height={height}>
    <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke={color} strokeWidth="2" />
  </svg>
);

export default Line;