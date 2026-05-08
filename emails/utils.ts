export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://erano.vercel.app";

export const styles = {
  body:       { backgroundColor: "#f5f6f8", fontFamily: "Arial, sans-serif", margin: "0", padding: "0" },
  container:  { maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" },
  header:     { backgroundColor: "#0d1b2e", padding: "24px 32px", borderBottom: "3px solid #c4973a" },
  headerText: { color: "#ffffff", fontSize: "20px", fontWeight: 700, margin: "0" },
  section:    { padding: "32px" },
  h1:         { color: "#0d1b2e", fontSize: "22px", fontWeight: 700, margin: "0 0 16px 0" },
  text:       { color: "#4a5568", fontSize: "15px", lineHeight: "1.7", margin: "0 0 16px 0" },
  small:      { color: "#9ca3af", fontSize: "13px", lineHeight: "1.6", margin: "0 0 8px 0" },
  button:     { backgroundColor: "#c4973a", color: "#ffffff", padding: "12px 28px", borderRadius: "6px", fontWeight: 600, fontSize: "15px", textDecoration: "none" as const, display: "inline-block" as const, margin: "8px 0 20px" },
  table:      { width: "100%", borderCollapse: "collapse" as const, margin: "0 0 20px 0" },
  tdLabel:    { color: "#9ca3af", fontSize: "13px", padding: "8px 16px 8px 0", width: "38%", verticalAlign: "top" as const },
  tdValue:    { color: "#0d1b2e", fontSize: "14px", fontWeight: 500, padding: "8px 0", verticalAlign: "top" as const },
  footer:     { backgroundColor: "#f5f6f8", padding: "20px 32px", borderTop: "1px solid #e2e5ea" },
  footerText: { color: "#9ca3af", fontSize: "12px", margin: "0 0 4px 0", textAlign: "center" as const },
  footerLink: { color: "#c4973a", textDecoration: "underline" as const },
};
