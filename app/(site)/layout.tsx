import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import PageTransition from "@/components/layout/PageTransition";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px" }}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}