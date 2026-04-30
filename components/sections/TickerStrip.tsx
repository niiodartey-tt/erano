const items = [
  "ICAG Licensed",
  "24 Active Clients",
  "98% Client Retention",
  "GRA Registered",
  "CITG Certified",
  "6 Years Operating",
  "RGD Incorporated",
  "Tax · Audit · Advisory",
];

export default function TickerStrip() {
  const repeated = [...items, ...items];

  return (
    <div style={{
      background:  "#c4973a",
      overflow:    "hidden",
      whiteSpace:  "nowrap",
      paddingBlock:"0.875rem",
      position:    "relative",
      zIndex:      5,
    }}>
      <div style={{
        display:   "inline-flex",
        animation: "ticker 30s linear infinite",
      }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "1.5rem",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.75rem",
              fontWeight:    600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         "#ffffff",
              paddingInline: "2rem",
            }}
          >
            {item}
            <span style={{
              display:    "inline-block",
              width:      "4px",
              height:     "4px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}