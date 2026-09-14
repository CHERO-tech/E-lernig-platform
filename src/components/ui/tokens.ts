// Color constants for non-className contexts (recharts stroke/fill, dynamic inline styles)
// MUST stay byte-identical to src/index.css @theme values
export const colors = {
  dg: "#071C12",
  dg2: "#0B291A",
  pg: "#35C47A",
  pg2: "#1F7A4B",
  mint: "#8BE0B0",
  ow: "#F5F7F5",
  dt: "#102019",
  mg: "#606C66",
  mg2: "#789183",
  border: "#E2E8E4",
  surface: "#EBEFED",
  warn: "#C17F33",
  info: "#336AC1",
  err: "#D64545",
  warn2: "#915F27",
  err2: "#C92C2C",
  // Categorical chart/identity palette — fixed order, see index.css comment.
  chart1: "#1F7A4B",
  chart2: "#BB811B",
  chart3: "#1B7DA7",
  chart4: "#6C38A8",
} as const;
