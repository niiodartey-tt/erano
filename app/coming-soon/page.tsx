export default function ComingSoonPage() {
  return (
    <>
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>

      <main
        id="main-content"
        style={{
          minHeight:      "100vh",
          background:     "#080c14",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          padding:        "clamp(2rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)",
          textAlign:      "center",
        }}
      >
        {/* Card */}
        <div style={{
          width:        "100%",
          maxWidth:     "560px",
          background:   "rgba(255,255,255,0.04)",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding:      "clamp(2rem, 5vw, 3rem)",
          textAlign:    "center",
        }}>

          {/* Wordmark */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{
              fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontSize:      "clamp(2.25rem, 7vw, 4rem)",
              fontWeight:    700,
              color:         "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight:    1,
            }}>
              ERANO
            </div>
            <div style={{
              fontFamily:    "var(--font-inter), 'Inter', system-ui, sans-serif",
              fontSize:      "0.625rem",
              fontWeight:    600,
              letterSpacing: "0.4em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
              marginTop:     "0.5rem",
            }}>
              CONSULTING
            </div>
          </div>

          {/* Gold rule */}
          <div style={{
            width:        "40px",
            height:       "1px",
            background:   "#c4973a",
            marginBottom: "2.5rem",
            opacity:      0.7,
            margin:       "0 auto 2.5rem",
          }} />

          {/* Animated pulse dot */}
          <div
            aria-hidden="true"
            style={{
              width:        "7px",
              height:       "7px",
              borderRadius: "50%",
              background:   "#c4973a",
              marginBottom: "2.5rem",
              animation:    "pulseDot 2.5s ease-in-out infinite",
              margin:       "0 auto 2.5rem",
            }}
          />

          {/* Heading */}
          <h1 style={{
            fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
            fontSize:      "clamp(1.75rem, 4vw, 3rem)",
            fontWeight:    700,
            color:         "#ffffff",
            letterSpacing: "-0.025em",
            lineHeight:    1.1,
            margin:        "0 0 1.25rem 0",
          }}>
            Something exceptional is coming.
          </h1>

          {/* Subheading */}
          <p style={{
            fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif",
            fontSize:   "clamp(0.9375rem, 2vw, 1.0625rem)",
            lineHeight: 1.8,
            color:      "rgba(255,255,255,0.55)",
            margin:     "0 0 2.5rem 0",
          }}>
            We are putting the finishing touches on our new platform. Check back soon.
          </p>

          {/* Contact line — two lines */}
          <div style={{
            fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif",
            fontSize:   "0.875rem",
            color:      "rgba(255,255,255,0.4)",
          }}>
            <p style={{ margin: "0 0 0.25rem 0" }}>In the meantime, reach us at</p>
            <p style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexWrap:       "nowrap" as const,
              gap:            "0.375rem",
              margin:         0,
            }}>
              <a
                href="mailto:ray.ankrah@eranoconsulting.com"
                style={{ color: "#c4973a", textDecoration: "none", whiteSpace: "nowrap" as const }}
              >
                ray.ankrah@eranoconsulting.com
              </a>
              <span>or</span>
              <a
                href="https://wa.me/233275819606?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Erano%20Consulting%20services."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color:               "#ffffff",
                  textDecoration:      "underline",
                  textUnderlineOffset: "3px",
                  textDecorationColor: "rgba(255,255,255,0.3)",
                  whiteSpace:          "nowrap" as const,
                }}
              >
                WhatsApp
              </a>
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
