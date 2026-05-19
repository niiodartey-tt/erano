import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#080c14" }}
    >
      {/* 404 number */}
      <p
        className="font-black leading-none tracking-tight text-gold"
        style={{
          fontFamily:  "var(--font-nunito)",
          fontSize:    "clamp(6rem, 20vw, 12rem)",
          fontWeight:  900,
          color:       "#c4973a",
          lineHeight:  1,
        }}
      >
        404
      </p>

      {/* Heading */}
      <p
        className="mt-4 text-white text-2xl font-bold"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        Page not found
      </p>

      {/* Sub-text */}
      <p
        className="mt-3 text-white/60 text-base max-w-sm leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Gold rule */}
      <div
        className="my-6"
        style={{ width: "40px", height: "2px", backgroundColor: "#c4973a" }}
        aria-hidden="true"
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="min-w-[140px] px-7 py-3 rounded-lg text-sm font-semibold text-navy bg-gold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="min-w-[140px] px-7 py-3 rounded-lg text-sm font-semibold text-white border border-gold bg-navy hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}
