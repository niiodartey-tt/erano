import { ImageResponse } from "next/og";

export const alt         = "Erano Consulting — Tax Advisory, Audit & Business Consultancy";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          backgroundColor: "#080c14",
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "space-between",
          padding:         "72px 80px",
          fontFamily:      "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>

          {/* Wordmark */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "48px" }}>
            <span style={{
              fontSize:      "100px",
              fontWeight:    700,
              color:         "#ffffff",
              letterSpacing: "-2px",
              lineHeight:    1,
            }}>
              ERANO
            </span>
            <span style={{
              fontSize:      "20px",
              fontWeight:    400,
              color:         "#c4973a",
              letterSpacing: "8px",
              fontFamily:    "system-ui, -apple-system, sans-serif",
              marginTop:     "8px",
            }}>
              CONSULTING
            </span>
          </div>

          {/* Gold rule */}
          <div style={{
            width:           "100px",
            height:          "2px",
            backgroundColor: "#c4973a",
            marginBottom:    "48px",
          }} />

          {/* Services line */}
          <span style={{
            fontSize:      "26px",
            color:         "#c4973a",
            fontFamily:    "system-ui, -apple-system, sans-serif",
            fontWeight:    400,
            letterSpacing: "0.5px",
            lineHeight:    1.4,
          }}>
            Tax Advisory · Audit · Accounting · Business Consultancy
          </span>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{
            fontSize:   "15px",
            color:      "rgba(255,255,255,0.3)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "2px",
          }}>
            ICAG LICENSED · GRA REGISTERED · CITG CERTIFIED
          </span>
          <span style={{
            fontSize:   "18px",
            color:      "rgba(255,255,255,0.6)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}>
            eranoconsulting.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
