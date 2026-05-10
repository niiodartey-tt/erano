// SERVER SIDE ONLY — never import in client components
import fs   from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export interface InvoiceData {
  invoiceNumber:    string;
  generatedAt:      string; // ISO date string
  clientLegalName:  string;
  clientAddress:    string;
  packageName:      string;
  packageDescription: string;
  finalPriceGhs:    number;
  bankDetails?: {
    bank:          string;
    accountName:   string;
    accountNumber: string;
    branch:        string;
  };
}

const W      = 595.28;
const H      = 841.89;
const MARGIN = 50;
const COL_W  = (W - MARGIN * 2) / 2;

const NAVY  = rgb(13 / 255,  27 / 255,  46 / 255);
const GOLD  = rgb(196 / 255, 151 / 255, 58 / 255);
const WHITE = rgb(1, 1, 1);
const GREY  = rgb(74 / 255,  85 / 255,  104 / 255);
const LIGHT = rgb(229 / 255, 231 / 255, 234 / 255);

function clip(text: string, maxWidth: number, font: Awaited<ReturnType<PDFDocument["embedFont"]>>, size: number): string {
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return text;
  let t = text;
  while (t.length > 0 && font.widthOfTextAtSize(t + "...", size) > maxWidth) {
    t = t.slice(0, -1);
  }
  return t + "...";
}

function fmtCurrency(n: number): string {
  return "GH₵ " + n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString("en-GH", { day: "2-digit", month: "long", year: "numeric" });
}

export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const doc    = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const page   = doc.addPage([W, H]);
  const regularBytes = fs.readFileSync(path.join(process.cwd(), "public/fonts/PlusJakartaSans-Regular.ttf"));
  const boldBytes    = fs.readFileSync(path.join(process.cwd(), "public/fonts/PlusJakartaSans-Bold.ttf"));
  const font   = await doc.embedFont(regularBytes);
  const fontB  = await doc.embedFont(boldBytes);

  let y = H;

  // ── Header bar ──────────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: H - 80, width: W, height: 80, color: NAVY });
  page.drawText("ERANO CONSULTING", {
    x: MARGIN, y: H - 46, size: 16, font: fontB, color: WHITE,
  });
  page.drawText("INVOICE", {
    x: W - MARGIN - fontB.widthOfTextAtSize("INVOICE", 16),
    y: H - 46, size: 16, font: fontB, color: GOLD,
  });
  page.drawText("Professional Business Advisory", {
    x: MARGIN, y: H - 64, size: 9, font, color: rgb(0.75, 0.78, 0.84),
  });

  y = H - 80 - 28;

  // ── Invoice number + date ────────────────────────────────────────────────────
  page.drawText(`Invoice No: ${data.invoiceNumber}`, {
    x: MARGIN, y, size: 10, font: fontB, color: NAVY,
  });
  const dateStr = `Date: ${fmtDate(data.generatedAt)}`;
  page.drawText(dateStr, {
    x: W - MARGIN - font.widthOfTextAtSize(dateStr, 10),
    y, size: 10, font, color: GREY,
  });

  y -= 24;

  // ── 2-col info block ─────────────────────────────────────────────────────────
  const infoRows: [string, string][] = [
    ["Billed To:", data.clientLegalName],
    ["Address:",   data.clientAddress],
  ];
  const fromRows: [string, string][] = [
    ["From:",    "Erano Consulting Limited"],
    ["Address:", "Accra, Ghana"],
  ];

  const infoStartY = y;
  for (const [label, value] of infoRows) {
    page.drawText(label, { x: MARGIN, y, size: 8, font: fontB, color: GREY });
    y -= 13;
    page.drawText(clip(value, COL_W - 10, font, 9), { x: MARGIN, y, size: 9, font, color: NAVY });
    y -= 16;
  }

  y = infoStartY;
  for (const [label, value] of fromRows) {
    page.drawText(label, { x: MARGIN + COL_W, y, size: 8, font: fontB, color: GREY });
    y -= 13;
    page.drawText(clip(value, COL_W - 10, font, 9), { x: MARGIN + COL_W, y, size: 9, font, color: NAVY });
    y -= 16;
  }

  y -= 8;

  // ── Gold separator ────────────────────────────────────────────────────────────
  page.drawRectangle({ x: MARGIN, y, width: W - MARGIN * 2, height: 2, color: GOLD });
  y -= 20;

  // ── Service table header ──────────────────────────────────────────────────────
  const DESC_X  = MARGIN;
  const PRICE_X = W - MARGIN - 90;
  const TABLE_W = W - MARGIN * 2;

  page.drawRectangle({ x: MARGIN, y: y - 4, width: TABLE_W, height: 20, color: NAVY });
  page.drawText("Description", { x: DESC_X + 6,  y: y + 1,  size: 9, font: fontB, color: WHITE });
  page.drawText("Amount",      { x: PRICE_X + 6, y: y + 1,  size: 9, font: fontB, color: WHITE });
  y -= 24;

  // ── Service row ───────────────────────────────────────────────────────────────
  const MAX_DESC = PRICE_X - DESC_X - 12;
  const pkgLine  = clip(`${data.packageName} — ${data.packageDescription}`, MAX_DESC, font, 9);
  page.drawText(pkgLine, { x: DESC_X + 6, y, size: 9, font, color: NAVY });
  page.drawText(fmtCurrency(data.finalPriceGhs), { x: PRICE_X + 6, y, size: 9, font, color: NAVY });

  // Row separator
  y -= 4;
  page.drawRectangle({ x: MARGIN, y, width: TABLE_W, height: 1, color: LIGHT });
  y -= 22;

  // ── Total row ─────────────────────────────────────────────────────────────────
  page.drawRectangle({ x: MARGIN, y: y - 6, width: TABLE_W, height: 28, color: rgb(0.961, 0.965, 0.973) });
  page.drawText("Total Due:", { x: DESC_X + 6, y, size: 10, font: fontB, color: NAVY });
  const totalStr = fmtCurrency(data.finalPriceGhs);
  page.drawText(totalStr, {
    x: W - MARGIN - fontB.widthOfTextAtSize(totalStr, 12) - 6,
    y: y - 1, size: 12, font: fontB, color: NAVY,
  });
  y -= 36;

  // ── Bank details (conditional) ────────────────────────────────────────────────
  if (data.bankDetails) {
    y -= 10;
    page.drawText("Payment Instructions", { x: MARGIN, y, size: 10, font: fontB, color: NAVY });
    y -= 16;

    const bankRows: [string, string][] = [
      ["Bank",           data.bankDetails.bank],
      ["Account Name",   data.bankDetails.accountName],
      ["Account Number", data.bankDetails.accountNumber],
      ["Branch",         data.bankDetails.branch],
      ["Reference",      `Invoice ${data.invoiceNumber}`],
    ];

    for (const [label, value] of bankRows) {
      page.drawText(`${label}:`, { x: MARGIN,          y, size: 9, font: fontB, color: GREY });
      page.drawText(value,       { x: MARGIN + 110,    y, size: 9, font,  color: NAVY });
      y -= 15;
    }
  }

  // ── Footer ────────────────────────────────────────────────────────────────────
  const footerY = 40;
  page.drawRectangle({ x: 0, y: footerY - 10, width: W, height: 1, color: LIGHT });
  const footerText = "Erano Consulting Limited  |  Accra, Ghana  |  www.erano.com";
  page.drawText(footerText, {
    x: (W - font.widthOfTextAtSize(footerText, 8)) / 2,
    y: footerY - 22, size: 8, font, color: GREY,
  });

  return doc.save();
}
