export default function SettingsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-slate-300">
        MVP settings are local-only. Supabase and Stripe keys can be added later without changing the current demo workflow.
      </p>
      <article className="rounded-lg border border-slate-800 bg-[#111827] p-5">
        <h2 className="text-lg font-semibold">Environment placeholders</h2>
        <ul className="mt-2 list-disc pl-5 text-slate-300">
          <li>SUPABASE_URL</li>
          <li>SUPABASE_ANON_KEY</li>
          <li>STRIPE_PUBLISHABLE_KEY</li>
          <li>STRIPE_SECRET_KEY</li>
        </ul>
      </article>
    </section>
  );
}
