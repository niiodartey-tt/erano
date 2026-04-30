"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IMAGES } from "@/lib/images";

const articles: Record<string, {
  category: string; title: string; author: string;
  date: string; readTime: string; image: string; body: string;
}> = {
  "understanding-ghana-vat-2025": {
    category: "Tax",
    title:    "Understanding Ghana's VAT System in 2025",
    author:   "Nana Afua Sarpong",
    date:     "April 2025",
    readTime: "8 min read",
    image:    IMAGES.RESOURCES_ARTICLE_1,
    body: `
Ghana's Value Added Tax (VAT) system is administered by the Ghana Revenue Authority (GRA) and applies to the supply of goods and services in Ghana, as well as imports. Understanding your VAT obligations is critical to maintaining compliance and avoiding penalties.

**Who must register for VAT?**

Any business with an annual taxable turnover exceeding GHS 500,000 is required to register for VAT under the standard rate scheme. Businesses below this threshold may register voluntarily or opt for the VAT Flat Rate Scheme (VFRS).

**Standard Rate vs Flat Rate Scheme**

The standard VAT rate is 15%, applied on the value of taxable supply. Additionally, businesses must account for the Ghana Education Trust Fund Levy (GETFund) of 2.5% and the National Health Insurance Levy (NHIL) of 2.5%, bringing the effective rate to 21.9% inclusive of all levies.

The VAT Flat Rate Scheme (VFRS) allows eligible retailers with turnover below GHS 500,000 to charge a flat 4% on taxable supplies. This scheme simplifies compliance for smaller businesses but does not allow input tax credits.

**Filing obligations**

VAT-registered businesses must file monthly VAT returns by the last working day of the month following the tax period. Late filing attracts penalties of GHS 500 per month for individuals and GHS 1,000 per month for companies.

**Input tax credits**

Under the standard rate scheme, businesses can claim input tax credits for VAT paid on business purchases. Proper documentation — including original VAT invoices — is essential for claiming these credits.

**Practical compliance tips**

Maintain a VAT account in your accounting records separating input and output VAT. Issue proper VAT invoices for all taxable supplies. File returns on time even if no VAT is payable. Keep supporting documents for at least six years.

If you are unsure about your VAT obligations or need assistance with registration and filing, the Erano Consulting tax team is available for a free initial consultation.
    `,
  },
  "gra-audit-preparation-guide": {
    category: "Audit",
    title:    "How to Prepare Your Business for a GRA Audit",
    author:   "Kwame Asante",
    date:     "March 2025",
    readTime: "6 min read",
    image:    IMAGES.RESOURCES_ARTICLE_2,
    body: `
A GRA audit can be triggered by several factors — inconsistencies in tax returns, industry risk profiling, or random selection. Whatever the trigger, the businesses that navigate audits successfully are those that maintain clean records and engage professional support early.

**What triggers a GRA audit?**

The GRA uses a risk-based audit selection system. Common triggers include significant discrepancies between VAT returns and income tax returns, unexplained year-on-year revenue declines, unusually high expense ratios relative to industry peers, and failure to file returns on time.

**The audit process**

A GRA audit typically begins with a notification letter requesting specific records for a defined period — usually three to six years. You will be given a deadline to produce the requested documents, typically 14 to 30 days.

The auditor will then review your accounting records, tax returns, bank statements, invoices, and contracts. They may request clarification on specific transactions.

**Documents you must have ready**

Audited financial statements for the relevant periods. All tax returns filed — VAT, PAYE, corporate income tax, withholding tax. Bank statements reconciled to your accounting records. Sales invoices and purchase invoices. Payroll records and evidence of SSNIT contributions. Contracts with major customers and suppliers.

**Common audit findings and how to avoid them**

The most common issues found in GRA audits include unremitted withholding taxes on payments to suppliers, PAYE deductions not remitted or incorrectly computed, input VAT claims without proper documentation, and personal expenses claimed as business expenses.

**Engaging professional support**

Having a professional tax advisor represent you in a GRA audit significantly improves outcomes. Auditors respond differently to a represented taxpayer — communications are more structured, and your advisor can negotiate on technical grounds that may not be apparent to a non-specialist.

Erano Consulting provides full GRA audit representation. Contact us before your audit begins — early engagement gives us time to review your records and identify any issues before the auditor does.
    `,
  },
  "registering-business-ghana-2025": {
    category: "Business",
    title:    "The Complete Guide to Registering a Business in Ghana",
    author:   "Abena Boateng",
    date:     "February 2025",
    readTime: "10 min read",
    image:    IMAGES.RESOURCES_ARTICLE_3,
    body: `
Starting a business in Ghana requires navigating registrations across multiple government agencies. This guide covers every step in the correct sequence — from RGD registration to your first tax filing.

**Step 1 — Register with the Registrar General's Department (RGD)**

The RGD is the starting point for all business registrations in Ghana. You can register as a sole proprietorship, partnership, or limited liability company. The process is now largely online through the RGD's Business Registration System.

For a private limited company, you will need a company name, the details of at least one director and one shareholder, a registered office address in Ghana, and a statement of the company's objects. Registration takes approximately 3 to 5 working days and costs GHS 450 for a local company.

**Step 2 — Obtain your Tax Identification Number (TIN)**

Once incorporated, you must register with the Ghana Revenue Authority to obtain a TIN. This is required for all subsequent registrations and for opening a business bank account. TIN registration is free and can be done online or at any GRA office.

**Step 3 — Register for VAT (if applicable)**

If your expected annual turnover exceeds GHS 500,000, VAT registration is mandatory. Below this threshold, you may register voluntarily or under the VAT Flat Rate Scheme. Apply at your nearest GRA office with your certificate of incorporation, TIN, and proof of business address.

**Step 4 — Register for PAYE (if you have employees)**

Businesses with employees must register for Pay As You Earn (PAYE) with the GRA. You will withhold income tax from employee salaries and remit it to the GRA monthly.

**Step 5 — Register with SSNIT**

Every employer must register with the Social Security and National Insurance Trust within 30 days of hiring their first employee. You will need your certificate of incorporation, TIN, and the national IDs of all directors.

**Step 6 — Open a business bank account**

Most banks in Ghana require your certificate of incorporation, a resolution authorising the account opening, TIN, and the national IDs and passport photographs of all signatories.

**Step 7 — PPA registration (optional)**

If you intend to bid for government contracts, register with the Public Procurement Authority. Local company registration costs GHS 500 and must be renewed annually for GHS 300.

Erano Consulting handles all of these registrations on behalf of clients. Our business registration service completes the entire process — from RGD to SSNIT — typically within three to four weeks.
    `,
  },
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    return (
      <div style={{ maxWidth: "720px", margin: "10rem auto", padding: "0 2rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "2rem", fontWeight: 700, color: "#0d1b2e", marginBottom: "1rem" }}>
          Article not found
        </h1>
        <Link href="/resources" style={{ color: "#c4973a", fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
          Back to resources
        </Link>
      </div>
    );
  }

  const paragraphs = article.body.trim().split("\n\n");

  return (
    <>
      {/* Hero */}
      <section style={{ background: "#080c14", paddingBlock: "clamp(6rem, 12vw, 10rem) clamp(3rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>
          <Link href="/resources" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.5)",
            textDecoration: "none", marginBottom: "2rem", transition: "color 0.15s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c4973a"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
          >
            <ArrowLeft size={15} /> Back to resources
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase" as const, color: "#c4973a",
              border: "1px solid rgba(196,151,58,0.3)", borderRadius: "2px", padding: "0.25rem 0.625rem",
            }}>{article.category}</span>
            <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>
              {article.readTime}
            </span>
          </div>

          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.025em", color: "#ffffff",
            maxWidth: "720px", marginBottom: "1.5rem",
          }}>{article.title}</h1>

          <div style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "0.875rem", color: "rgba(255,255,255,0.45)",
          }}>
            By {article.author} · {article.date}
          </div>
        </div>
      </section>

      {/* Article image */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>
        <div style={{ height: "420px", overflow: "hidden", borderRadius: "0 0 8px 8px" }}>
          <img
            src={article.image}
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* Article body */}
      <section style={{ background: "#ffffff", paddingBlock: "clamp(4rem, 7vw, 6rem)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>
          {paragraphs.map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <h2 key={i} style={{
                  fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:      "1.375rem",
                  fontWeight:    700,
                  letterSpacing: "-0.015em",
                  color:         "#0d1b2e",
                  marginTop:     "2.5rem",
                  marginBottom:  "1rem",
                }}>
                  {para.replace(/\*\*/g, "")}
                </h2>
              );
            }
            return (
              <p key={i} style={{
                fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:     "1.0625rem",
                lineHeight:   1.85,
                color:        "#374151",
                marginBottom: "1.5rem",
              }}>{para}</p>
            );
          })}

          {/* CTA */}
          <div style={{
            marginTop:    "4rem",
            padding:      "2rem",
            background:   "#f5f6f8",
            borderLeft:   "2px solid #c4973a",
            borderRadius: "0 8px 8px 0",
          }}>
            <div style={{
              fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:     "1rem",
              fontWeight:   700,
              color:        "#0d1b2e",
              marginBottom: "0.5rem",
            }}>Need professional advice?</div>
            <p style={{
              fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:     "0.9375rem",
              lineHeight:   1.7,
              color:        "#4a5568",
              marginBottom: "1.25rem",
            }}>
              The Erano Consulting team provides professional tax advisory, audit,
              and business consultancy services across Ghana. Book a free initial consultation.
            </p>
            <Link href="/contact" style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.5rem",
              background:     "#c4973a",
              color:          "#ffffff",
              fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:       "0.875rem",
              fontWeight:     600,
              padding:        "0.75rem 1.5rem",
              borderRadius:   "4px",
              textDecoration: "none",
            }}>
              Book a free consultation <ArrowLeft size={15} style={{ transform: "rotate(180deg)" }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}