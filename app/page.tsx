export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-hero-gradient">
      <div className="text-center px-6">
        <p className="eyebrow mb-4">Design system active</p>
        <h1 className="heading-display mb-4">
          Erano Consulting<br />
          <em>coming soon</em>
        </h1>
        <p className="text-ui-base text-gray-500 max-w-md mx-auto">
          Project scaffolding complete. Sprint 1 done.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-ui-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            ✓ Next.js 14
          </span>
          <span className="inline-flex items-center gap-1.5 text-ui-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            ✓ Tailwind configured
          </span>
          <span className="inline-flex items-center gap-1.5 text-ui-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            ✓ Brand tokens
          </span>
          <span className="inline-flex items-center gap-1.5 text-ui-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            ✓ UI components
          </span>
          <span className="inline-flex items-center gap-1.5 text-ui-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            ✓ Supabase client
          </span>
          <span className="inline-flex items-center gap-1.5 text-ui-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            ✓ Cloudinary utility
          </span>
          <span className="inline-flex items-center gap-1.5 text-ui-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
            ⏳ M365 SMTP — pending deposit
          </span>
        </div>
      </div>
    </main>
  );
}
