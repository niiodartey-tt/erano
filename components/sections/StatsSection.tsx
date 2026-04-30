"use client";

import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { end: 24,  suffix: "+",  prefix: "",     label: "Active clients",          decimals: 0 },
  { end: 6,   suffix: "+",  prefix: "",     label: "Years operating",         decimals: 0 },
  { end: 4.2, suffix: "M+", prefix: "GHS ", label: "Tax managed annually",    decimals: 1 },
  { end: 98,  suffix: "%",  prefix: "",     label: "Client retention rate",   decimals: 0 },
];

function StatItem({
  end, suffix, prefix, label, decimals,
}: {
  end: number; suffix: string; prefix: string; label: string; decimals: number;
}) {
  const { count, ref } = useCountUp({ end, duration: 1800, decimals });

  return (
    <div style={{
      flex:          "1 1 200px",
      padding:       "0 2rem",
      borderRight:   "1px solid rgba(255,255,255,0.08)",
      textAlign:     "center",
    }}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize:      "clamp(2.75rem, 5vw, 4.5rem)",
          fontWeight:    800,
          letterSpacing: "-0.04em",
          color:         "#ffffff",
          lineHeight:    1,
          marginBottom:  "0.75rem",
        }}
      >
        {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
      </div>
      <div style={{
        fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
        fontSize:      "0.875rem",
        fontWeight:    500,
        letterSpacing: "0.04em",
        color:         "rgba(255,255,255,0.45)",
        textTransform: "uppercase" as const,
      }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section style={{
      background:   "#080c14",
      paddingBlock: "clamp(5rem, 9vw, 7.5rem)",
      position:     "relative",
      overflow:     "hidden",
    }}>

      {/* Subtle gold rule top */}
      <div style={{
        position:   "absolute",
        top:        0,
        left:       "clamp(1.5rem, 5.5vw, 5rem)",
        right:      "clamp(1.5rem, 5.5vw, 5rem)",
        height:     "1px",
        background: "linear-gradient(90deg, transparent, rgba(196,151,58,0.4), transparent)",
      }} />

      <div style={{
        maxWidth:      "1440px",
        margin:        "0 auto",
        paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
      }}>

        {/* Label */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "0.6875rem",
            fontWeight:    600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color:         "#c4973a",
          }}>
            Erano by the numbers
          </span>
        </div>

        {/* Stats row */}
        <div
          className="reveal reveal-delay-1"
          style={{
            display:        "flex",
            flexWrap:       "wrap" as const,
            justifyContent: "center",
            gap:            "0",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex:        "1 1 200px",
                padding:     "0 clamp(1rem, 3vw, 2.5rem)",
                borderRight: i < stats.length - 1
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "none",
                textAlign:   "center",
              }}
            >
              <StatItem {...stat} />
            </div>
          ))}
        </div>

        {/* Gold rule bottom */}
        <div
          className="reveal"
          style={{
            height:     "1px",
            background: "linear-gradient(90deg, transparent, rgba(196,151,58,0.4), transparent)",
            marginTop:  "4rem",
          }}
        />

        {/* Supporting line */}
        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily:  '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:    "0.9375rem",
            lineHeight:  1.7,
            color:       "rgba(255,255,255,0.4)",
            textAlign:   "center",
            marginTop:   "1.75rem",
            maxWidth:    "520px",
            margin:      "1.75rem auto 0",
          }}
        >
          Trusted by SMEs, law firms, embassies, mining companies,
          and corporate bodies across Ghana since 2018.
        </p>
      </div>

      {/* Subtle gold rule bottom */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       "clamp(1.5rem, 5.5vw, 5rem)",
        right:      "clamp(1.5rem, 5.5vw, 5rem)",
        height:     "1px",
        background: "linear-gradient(90deg, transparent, rgba(196,151,58,0.4), transparent)",
      }} />
    </section>
  );
}