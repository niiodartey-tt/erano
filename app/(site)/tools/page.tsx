"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

// ── Ghana PAYE tax bands (GRA 2025) ──────────────────────
function calcPAYE(annual: number): number {
  const bands: [number, number][] = [
    [4380,   0],
    [1320,   0.05],
    [1560,   0.10],
    [36000,  0.175],
    [197340, 0.25],
    [Infinity, 0.30],
  ];
  let tax = 0;
  let remaining = annual;
  for (const [band, rate] of bands) {
    const taxable = Math.min(remaining, band);
    tax += taxable * rate;
    remaining -= taxable;
    if (remaining <= 0) break;
  }
  return tax;
}

function fmt(n: number): string {
  return "GHS " + n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseNum(s: string): number {
  return parseFloat(s.replace(/,/g, "")) || 0;
}

// ── VAT Calculator ───────────────────────────────────────
function VATCalculator() {
  const [amount, setAmount] = useState("10000");
  const [rate,   setRate]   = useState("0.15");

  const base    = parseNum(amount);
  const vatAmt  = base * parseFloat(rate);
  const total   = base + vatAmt;

  return (
    <div className="bg-white border border-brand-cloud rounded-2xl p-7 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-blue-xl rounded-lg flex items-center justify-center text-lg">💰</div>
        <div>
          <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal">VAT Calculator</h3>
          <p className="text-ui-sm text-brand-grey">Standard (15%) or Flat Rate (4%)</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="form-label">Amount (GHS)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
            placeholder="0.00"
            min="0"
          />
        </div>
        <div>
          <label className="form-label">VAT Rate</label>
          <select
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="form-input"
          >
            <option value="0.15">15% — Standard rate</option>
            <option value="0.04">4% — Flat rate scheme</option>
          </select>
        </div>
      </div>

      <div className="bg-brand-cloud/40 rounded-xl p-5 space-y-3">
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Base amount</span>
          <span className="font-medium text-brand-charcoal">{fmt(base)}</span>
        </div>
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">VAT ({parseFloat(rate) * 100}%)</span>
          <span className="font-medium text-brand-charcoal">{fmt(vatAmt)}</span>
        </div>
        <div className="h-px bg-brand-cloud" />
        <div className="flex justify-between">
          <span className="text-ui-sm font-medium text-brand-charcoal">Total payable</span>
          <span className="font-display text-[1.5rem] font-medium text-brand-blue-dark">{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}

// ── PAYE Calculator ──────────────────────────────────────
function PAYECalculator() {
  const [income, setIncome] = useState("60000");

  const annual  = parseNum(income);
  const annualTax = calcPAYE(annual);
  const monthlyTax = annualTax / 12;
  const effective = annual > 0 ? (annualTax / annual) * 100 : 0;

  return (
    <div className="bg-white border border-brand-cloud rounded-2xl p-7 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-blue-xl rounded-lg flex items-center justify-center text-lg">👤</div>
        <div>
          <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal">PAYE Estimator</h3>
          <p className="text-ui-sm text-brand-grey">Personal income tax — GRA 2025 bands</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="form-label">Annual gross income (GHS)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="form-input"
            placeholder="0.00"
            min="0"
          />
        </div>
      </div>

      <div className="bg-brand-cloud/40 rounded-xl p-5 space-y-3">
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Monthly gross</span>
          <span className="font-medium text-brand-charcoal">{fmt(annual / 12)}</span>
        </div>
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Annual PAYE</span>
          <span className="font-medium text-brand-charcoal">{fmt(annualTax)}</span>
        </div>
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Effective tax rate</span>
          <span className="font-medium text-brand-charcoal">{effective.toFixed(1)}%</span>
        </div>
        <div className="h-px bg-brand-cloud" />
        <div className="flex justify-between">
          <span className="text-ui-sm font-medium text-brand-charcoal">Monthly PAYE deduction</span>
          <span className="font-display text-[1.5rem] font-medium text-brand-blue-dark">{fmt(monthlyTax)}</span>
        </div>
      </div>

      {/* Tax bands reference */}
      <details className="mt-4">
        <summary className="text-ui-sm text-brand-blue cursor-pointer hover:text-brand-blue-dark">
          View GRA tax bands
        </summary>
        <div className="mt-3 space-y-1.5">
          {[
            ["First GHS 4,380",   "0%"],
            ["Next GHS 1,320",    "5%"],
            ["Next GHS 1,560",    "10%"],
            ["Next GHS 36,000",   "17.5%"],
            ["Next GHS 197,340",  "25%"],
            ["Above GHS 240,000", "30%"],
          ].map(([band, rate]) => (
            <div key={band} className="flex justify-between text-ui-sm">
              <span className="text-brand-grey">{band}</span>
              <span className="font-medium text-brand-charcoal">{rate}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

// ── Corporate Tax Calculator ─────────────────────────────
function CorporateTaxCalculator() {
  const [profit, setProfit] = useState("80000");
  const [sector, setSector] = useState("0.25");

  const pbt = parseNum(profit);
  const tax = pbt * parseFloat(sector);
  const pat = pbt - tax;

  return (
    <div className="bg-white border border-brand-cloud rounded-2xl p-7 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-blue-xl rounded-lg flex items-center justify-center text-lg">🏢</div>
        <div>
          <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal">Corporate Tax Estimator</h3>
          <p className="text-ui-sm text-brand-grey">Company income tax by sector</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="form-label">Profit before tax (GHS)</label>
          <input
            type="number"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
            className="form-input"
            placeholder="0.00"
            min="0"
          />
        </div>
        <div>
          <label className="form-label">Sector / rate</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="form-input"
          >
            <option value="0.25">25% — Standard rate</option>
            <option value="0.35">35% — Mining companies</option>
            <option value="0.08">8% — Free zones enterprise</option>
            <option value="0.00">0% — Agricultural (1st 5 years)</option>
          </select>
        </div>
      </div>

      <div className="bg-brand-cloud/40 rounded-xl p-5 space-y-3">
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Profit before tax</span>
          <span className="font-medium text-brand-charcoal">{fmt(pbt)}</span>
        </div>
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Corporate tax ({parseFloat(sector) * 100}%)</span>
          <span className="font-medium text-brand-charcoal">{fmt(tax)}</span>
        </div>
        <div className="h-px bg-brand-cloud" />
        <div className="flex justify-between">
          <span className="text-ui-sm font-medium text-brand-charcoal">Profit after tax</span>
          <span className="font-display text-[1.5rem] font-medium text-brand-blue-dark">{fmt(pat)}</span>
        </div>
      </div>
    </div>
  );
}

// ── SSNIT Calculator ─────────────────────────────────────
function SSNITCalculator() {
  const [salary, setSalary] = useState("5000");

  const gross    = parseNum(salary);
  const employee = gross * 0.055;
  const employer = gross * 0.13;
  const total    = employee + employer;
  const net      = gross - employee;

  return (
    <div className="bg-white border border-brand-cloud rounded-2xl p-7 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-blue-xl rounded-lg flex items-center justify-center text-lg">🛡️</div>
        <div>
          <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal">SSNIT Calculator</h3>
          <p className="text-ui-sm text-brand-grey">Employee and employer contributions</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="form-label">Gross monthly salary (GHS)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="form-input"
            placeholder="0.00"
            min="0"
          />
        </div>
      </div>

      <div className="bg-brand-cloud/40 rounded-xl p-5 space-y-3">
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Employee contribution (5.5%)</span>
          <span className="font-medium text-brand-charcoal">{fmt(employee)}</span>
        </div>
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Employer contribution (13%)</span>
          <span className="font-medium text-brand-charcoal">{fmt(employer)}</span>
        </div>
        <div className="flex justify-between text-ui-sm">
          <span className="text-brand-grey">Total SSNIT contribution</span>
          <span className="font-medium text-brand-charcoal">{fmt(total)}</span>
        </div>
        <div className="h-px bg-brand-cloud" />
        <div className="flex justify-between">
          <span className="text-ui-sm font-medium text-brand-charcoal">Employee net salary</span>
          <span className="font-display text-[1.5rem] font-medium text-brand-blue-dark">{fmt(net)}</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────
const tabs = [
  { id: "vat",    label: "VAT"            },
  { id: "paye",   label: "PAYE"           },
  { id: "corp",   label: "Corporate tax"  },
  { id: "ssnit",  label: "SSNIT"          },
];

export default function ToolsPage() {
  const [active, setActive] = useState("vat");
  useScrollReveal();

  return (
    <>
      {/* Header */}
      <section className="bg-hero-gradient pt-16 pb-14">
        <div className="container-erano">
          <div className="max-w-2xl reveal">
            <p className="eyebrow mb-4">Free financial tools</p>
            <h1 className="heading-display mb-5">
              Ghana tax<br />
              <em>calculators</em>
            </h1>
            <p className="text-ui-lg text-brand-grey leading-relaxed">
              Estimate your tax obligations instantly. All calculators use
              current GRA rates and bands. No login required.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section id="calculator-top" className="section-gap bg-white">
        <div className="container-erano">

          {/* Tab switcher */}
          <div className="flex flex-wrap gap-2 mb-10 reveal">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-ui-base font-medium transition-all ${
                  active === tab.id
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-brand-cloud text-brand-charcoal hover:bg-brand-blue-xl"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active calculator */}
          <div className="max-w-lg reveal reveal-delay-1">
            {active === "vat"   && <VATCalculator />}
            {active === "paye"  && <PAYECalculator />}
            {active === "corp"  && <CorporateTaxCalculator />}
            {active === "ssnit" && <SSNITCalculator />}
          </div>

          {/* Disclaimer */}
          <div className="max-w-lg mt-6 reveal reveal-delay-2">
            <div className="bg-brand-cloud/50 border border-brand-cloud rounded-xl p-4 flex gap-3">
              <span className="text-brand-blue flex-shrink-0 mt-0.5">ℹ️</span>
              <p className="text-ui-sm text-brand-grey leading-relaxed">
                All figures are estimates for planning purposes only and
                do not constitute professional tax advice. For official
                computations and filing, consult an Erano professional.{" "}
                <Link
                  href="/contact"
                  className="text-brand-blue hover:text-brand-blue-dark underline underline-offset-2"
                >
                  Talk to us &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All four calculators overview */}
      <section className="section-gap bg-off-white">
        <div className="container-erano">
          <div className="max-w-xl mb-10 reveal">
            <p className="eyebrow mb-3">All calculators</p>
            <h2 className="heading-section">
              Four tools,<br />
              <em className="text-brand-blue">all free</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { id: "vat",   icon: "💰", title: "VAT Calculator",          desc: "Standard 15% and flat rate 4% VAT calculations." },
              { id: "paye",  icon: "👤", title: "PAYE Estimator",           desc: "Personal income tax using current GRA tax bands." },
              { id: "corp",  icon: "🏢", title: "Corporate Tax Estimator",  desc: "Company income tax across sectors and special rates." },
              { id: "ssnit", icon: "🛡️", title: "SSNIT Calculator",        desc: "Employee and employer social security contributions." },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => { setActive(tool.id); const el = document.getElementById("calculator-top"); if (el) el.scrollIntoView({ behavior: "smooth" });; }}
                className={`text-left border rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-card ${
                  active === tool.id
                    ? "border-brand-blue bg-brand-blue-xl"
                    : "border-brand-cloud bg-white hover:border-brand-blue-light"
                }`}
              >
                <div className="text-xl mb-3">{tool.icon}</div>
                <h3 className="font-sans font-medium text-ui-base text-brand-charcoal mb-1">{tool.title}</h3>
                <p className="text-ui-sm text-brand-grey leading-relaxed">{tool.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-hero-gradient">
        <div className="container-erano text-center reveal">
          <p className="eyebrow mb-4">Need exact figures?</p>
          <h2 className="heading-section mb-4 max-w-lg mx-auto">
            Get a professional<br />
            <em className="text-brand-blue">tax computation</em>
          </h2>
          <p className="text-ui-base text-brand-grey max-w-md mx-auto mb-8">
            Our calculators give you a solid estimate. For official figures,
            filing, and tax planning, talk to our team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-7 py-3.5 rounded-lg hover:bg-brand-blue-dark transition-all shadow-blue"
          >
            Talk to a tax expert <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
