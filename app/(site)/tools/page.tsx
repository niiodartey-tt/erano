"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Ghana PAYE tax bands 2025 ─────────────────────
function calcPAYE(annual: number): number {
  const bands: [number, number][] = [
    [4380,     0    ],
    [1320,     0.05 ],
    [1560,     0.10 ],
    [36000,    0.175],
    [197340,   0.25 ],
    [Infinity, 0.30 ],
  ];
  let tax = 0;
  let rem = annual;
  for (const [band, rate] of bands) {
    const taxable = Math.min(rem, band);
    tax += taxable * rate;
    rem -= taxable;
    if (rem <= 0) break;
  }
  return tax;
}

function fmt(n: number): string {
  return "GHS " + n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parse(s: string): number {
  return parseFloat(s.replace(/,/g, "")) || 0;
}

// ── Calculator components ─────────────────────────

function ResultRow({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div style={{
      display:        "flex",
      justifyContent: "space-between",
      alignItems:     "baseline",
      paddingBlock:   "0.75rem",
      borderBottom:   "1px solid #e8eaed",
    }}>
      <span style={{
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        fontSize:   "0.875rem",
        color:      "#6b7280",
      }}>{label}</span>
      <span style={{
        fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
        fontSize:      large ? "1.5rem" : "0.9375rem",
        fontWeight:    large ? 800 : 600,
        color:         large ? "#c4973a" : "#0d1b2e",
        letterSpacing: large ? "-0.02em" : "0",
      }}>{value}</span>
    </div>
  );
}

function InputField({ label, value, onChange, type = "number", children }: {
  label: string; value: string;
  onChange: (v: string) => void;
  type?: string; children?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{
        display:      "block",
        fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
        fontSize:     "0.8125rem",
        fontWeight:   600,
        color:        "#0d1b2e",
        marginBottom: "0.5rem",
      }}>{label}</label>
      {children || (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width:        "100%",
            height:       "48px",
            border:       "1.5px solid #e8eaed",
            borderRadius: "4px",
            padding:      "0 1rem",
            fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:     "0.9375rem",
            color:        "#0d1b2e",
            background:   "#ffffff",
            outline:      "none",
          }}
          onFocus={e => { (e.target as HTMLElement).style.borderColor = "#c4973a"; }}
          onBlur={e  => { (e.target as HTMLElement).style.borderColor = "#e8eaed"; }}
        />
      )}
    </div>
  );
}

function VATCalc() {
  const [amount, setAmount] = useState("10000");
  const [rate,   setRate]   = useState("0.15");
  const base   = parse(amount);
  const vatAmt = base * parseFloat(rate);
  const total  = base + vatAmt;
  return (
    <div>
      <InputField label="Amount (GHS)" value={amount} onChange={setAmount} />
      <InputField label="VAT Rate" value={rate} onChange={setRate}>
        <select
          value={rate}
          onChange={e => setRate(e.target.value)}
          style={{
            width: "100%", height: "48px",
            border: "1.5px solid #e8eaed", borderRadius: "4px",
            padding: "0 1rem",
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "0.9375rem", color: "#0d1b2e",
            background: "#ffffff", outline: "none", appearance: "none" as const,
          }}
        >
          <option value="0.15">15% — Standard rate</option>
          <option value="0.04">4% — Flat rate scheme</option>
        </select>
      </InputField>
      <div style={{ marginTop: "1.5rem" }}>
        <ResultRow label="Base amount"  value={fmt(base)} />
        <ResultRow label={`VAT (${parseFloat(rate) * 100}%)`} value={fmt(vatAmt)} />
        <ResultRow label="Total payable" value={fmt(total)} large />
      </div>
    </div>
  );
}

function PAYECalc() {
  const [income, setIncome] = useState("60000");
  const annual     = parse(income);
  const annualTax  = calcPAYE(annual);
  const monthlyTax = annualTax / 12;
  const effective  = annual > 0 ? (annualTax / annual) * 100 : 0;
  return (
    <div>
      <InputField label="Annual gross income (GHS)" value={income} onChange={setIncome} />
      <div style={{ marginTop: "1.5rem" }}>
        <ResultRow label="Monthly gross"       value={fmt(annual / 12)} />
        <ResultRow label="Annual PAYE"         value={fmt(annualTax)} />
        <ResultRow label="Effective rate"      value={`${effective.toFixed(1)}%`} />
        <ResultRow label="Monthly PAYE deduction" value={fmt(monthlyTax)} large />
      </div>
      <details style={{ marginTop: "1.25rem" }}>
        <summary style={{
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize: "0.8125rem", fontWeight: 600, color: "#c4973a", cursor: "pointer",
        }}>View GRA tax bands 2025</summary>
        <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column" as const, gap: "0.375rem" }}>
          {[["First GHS 4,380","0%"],["Next GHS 1,320","5%"],["Next GHS 1,560","10%"],["Next GHS 36,000","17.5%"],["Next GHS 197,340","25%"],["Above GHS 240,000","30%"]].map(([band, rate]) => (
            <div key={band} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
              <span style={{ color: "#6b7280" }}>{band}</span>
              <span style={{ fontWeight: 600, color: "#0d1b2e" }}>{rate}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function CorporateCalc() {
  const [profit, setProfit] = useState("80000");
  const [sector, setSector] = useState("0.25");
  const pbt = parse(profit);
  const tax = pbt * parseFloat(sector);
  const pat = pbt - tax;
  return (
    <div>
      <InputField label="Profit before tax (GHS)" value={profit} onChange={setProfit} />
      <InputField label="Sector / rate" value={sector} onChange={setSector}>
        <select
          value={sector}
          onChange={e => setSector(e.target.value)}
          style={{
            width: "100%", height: "48px",
            border: "1.5px solid #e8eaed", borderRadius: "4px",
            padding: "0 1rem",
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "0.9375rem", color: "#0d1b2e",
            background: "#ffffff", outline: "none", appearance: "none" as const,
          }}
        >
          <option value="0.25">25% — Standard rate</option>
          <option value="0.35">35% — Mining companies</option>
          <option value="0.08">8% — Free zones enterprise</option>
          <option value="0.00">0% — Agricultural (1st 5 years)</option>
        </select>
      </InputField>
      <div style={{ marginTop: "1.5rem" }}>
        <ResultRow label="Profit before tax"         value={fmt(pbt)} />
        <ResultRow label={`Corporate tax (${parseFloat(sector) * 100}%)`} value={fmt(tax)} />
        <ResultRow label="Profit after tax"          value={fmt(pat)} large />
      </div>
    </div>
  );
}

function SSNITCalc() {
  const [salary, setSalary] = useState("5000");
  const gross    = parse(salary);
  const employee = gross * 0.055;
  const employer = gross * 0.13;
  const total    = employee + employer;
  const net      = gross - employee;
  return (
    <div>
      <InputField label="Gross monthly salary (GHS)" value={salary} onChange={setSalary} />
      <div style={{ marginTop: "1.5rem" }}>
        <ResultRow label="Employee contribution (5.5%)" value={fmt(employee)} />
        <ResultRow label="Employer contribution (13%)"  value={fmt(employer)} />
        <ResultRow label="Total SSNIT contribution"     value={fmt(total)} />
        <ResultRow label="Employee net salary"          value={fmt(net)} large />
      </div>
    </div>
  );
}

const tabs = [
  { id: "vat",   label: "VAT Calculator",         component: <VATCalc />      },
  { id: "paye",  label: "PAYE Estimator",          component: <PAYECalc />     },
  { id: "corp",  label: "Corporate Tax",           component: <CorporateCalc /> },
  { id: "ssnit", label: "SSNIT Calculator",        component: <SSNITCalc />    },
];

export default function ToolsPage() {
  const [active, setActive] = useState("vat");

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background:   "#080c14",
        paddingBlock: "clamp(6rem, 12vw, 10rem) clamp(4rem, 8vw, 7rem)",
        position:     "relative",
        overflow:     "hidden",
      }}>
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse at 60% 50%, rgba(196,151,58,0.06) 0%, transparent 70%)",
        }} />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 1, maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}
        >
          <motion.span variants={fadeUp} style={{
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase" as const, color: "#c4973a", marginBottom: "1.5rem",
          }}>
            <span style={{ width: "32px", height: "1px", background: "#c4973a", flexShrink: 0 }} />
            Free financial tools
          </motion.span>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.03em", color: "#ffffff",
            marginBottom: "1.25rem", maxWidth: "600px",
          }}>
            Ghana tax<br />
            <span style={{ color: "#c4973a" }}>calculators.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "1.125rem", lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)", maxWidth: "480px",
          }}>
            Estimate your tax obligations instantly using current GRA rates and bands.
            No login required.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Calculators ── */}
      <section id="calculator-top" style={{ background: "#ffffff", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>

          {/* Tab switcher */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem", marginBottom: "3rem" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "0.875rem",
                  fontWeight:   600,
                  padding:      "0.625rem 1.375rem",
                  borderRadius: "4px",
                  border:       "none",
                  cursor:       "pointer",
                  transition:   "all 0.2s ease",
                  background:   active === tab.id ? "#c4973a" : "#f5f6f8",
                  color:        active === tab.id ? "#ffffff" : "#6b7280",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active calculator */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <h2 style={{
                fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:      "1.5rem",
                fontWeight:    700,
                letterSpacing: "-0.02em",
                color:         "#0d1b2e",
                marginBottom:  "2rem",
              }}>
                {tabs.find(t => t.id === active)?.label}
              </h2>
              {tabs.find(t => t.id === active)?.component}
            </motion.div>

            {/* Info panel */}
            <div style={{ paddingTop: "3.5rem" }}>
              <div style={{
                background:   "#f5f6f8",
                borderLeft:   "2px solid #c4973a",
                borderRadius: "0 4px 4px 0",
                padding:      "1.5rem",
                marginBottom: "2rem",
              }}>
                <div style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "0.875rem",
                  fontWeight:   600,
                  color:        "#0d1b2e",
                  marginBottom: "0.5rem",
                }}>Disclaimer</div>
                <p style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:   "0.875rem",
                  lineHeight: 1.7,
                  color:      "#6b7280",
                  margin:     0,
                }}>
                  All figures are estimates for planning purposes only and do not
                  constitute professional tax advice. For official computations
                  and filing, consult an Erano professional.
                </p>
              </div>

              <div style={{
                fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:     "0.9375rem",
                lineHeight:   1.7,
                color:        "#4a5568",
                marginBottom: "1.5rem",
              }}>
                Need exact figures for your business? Our tax team provides
                official computations, strategic planning, and full GRA filing support.
              </div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "#c4973a", color: "#ffffff",
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "0.9375rem", fontWeight: 600,
                  padding: "0.875rem 1.75rem", borderRadius: "4px", textDecoration: "none",
                }}>
                  Talk to a tax expert <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}