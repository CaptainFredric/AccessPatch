import Link from "next/link";

const problemCards = [
  "Automated reports are too technical.",
  "Widgets do not fix broken forms.",
  "Clients do not know what to prioritize.",
  "Agencies need readable reports.",
  "Retesting gets forgotten.",
  "Manual review notes get scattered.",
];

const heroMockSnapshot = {
  severity: { critical: 4, serious: 9, moderate: 10, minor: 4 },
} as const;

const heroIssueTotal =
  heroMockSnapshot.severity.critical +
  heroMockSnapshot.severity.serious +
  heroMockSnapshot.severity.moderate +
  heroMockSnapshot.severity.minor;

const categories = [
  "Missing alt text",
  "Low contrast",
  "Missing form labels",
  "Empty links",
  "Empty buttons",
  "Heading structure",
  "Missing page language",
  "Keyboard review checklist",
];

export default function Home() {
  return (
    <div className="space-y-16 pb-12">
      <section className="grid gap-8 rounded-xl border border-slate-800 bg-[#111827] p-6 lg:grid-cols-[1.2fr_1fr] lg:p-10">
        <div className="space-y-6">
          <p className="inline-block rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 px-3 py-1 text-sm font-medium text-[#86efac]">
            Turn accessibility problems into a clear fix list.
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-5xl">
            Turn accessibility problems into a clear fix list.
          </h1>
          <p className="max-w-xl text-lg text-[#cbd5e1]">
            AccessPatch scans common website barriers, explains them in plain English, and helps teams track fixes from first scan to retest.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="focus-ring rounded-md bg-[#22C55E] px-5 py-3 font-semibold text-slate-950 hover:bg-[#16a34a]"
              href="/demo"
            >
              Run a demo scan
            </Link>
            <Link
              className="focus-ring rounded-md border border-[#38BDF8] px-5 py-3 font-semibold text-[#bae6fd] hover:bg-[#38BDF8]/10"
              href="/sites/site-harbor-pine/report"
            >
              View sample report
            </Link>
          </div>
        </div>
        <aside className="report-card rounded-xl border border-slate-200 p-5 shadow-lg">
          <p className="text-sm font-medium text-slate-600">Scan: harborandpinebakery.com</p>
          <h2 className="mt-2 text-xl font-semibold">Accessibility snapshot</h2>
          <p className="mt-1 text-3xl font-bold text-slate-900">{heroIssueTotal} issues found</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded bg-red-100 p-2"><dt>Critical</dt><dd className="font-semibold">{heroMockSnapshot.severity.critical}</dd></div>
            <div className="rounded bg-orange-100 p-2"><dt>Serious</dt><dd className="font-semibold">{heroMockSnapshot.severity.serious}</dd></div>
            <div className="rounded bg-amber-100 p-2"><dt>Moderate</dt><dd className="font-semibold">{heroMockSnapshot.severity.moderate}</dd></div>
            <div className="rounded bg-blue-100 p-2"><dt>Minor</dt><dd className="font-semibold">{heroMockSnapshot.severity.minor}</dd></div>
          </dl>
          <h3 className="mt-4 font-semibold">Top issues</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Contact form fields missing labels</li>
            <li>Low contrast button text</li>
            <li>Product images missing alt text</li>
            <li>Empty social icon links</li>
          </ul>
          <p className="mt-4 text-sm font-medium text-slate-800">
            Fix board: Needs Review | In Progress | Fixed | Retest
          </p>
          <button className="focus-ring mt-4 w-full rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900">
            Export client report
          </button>
        </aside>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Accessibility reports should not become panic spreadsheets.</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card) => (
            <article key={card} className="rounded-lg border border-slate-800 bg-[#111827] p-4 text-slate-200">
              {card}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Scan. Explain. Track. Retest.</h2>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Add a website.",
            "Run a scan.",
            "Review likely barriers.",
            "Assign fix status.",
            "Add manual notes.",
            "Export a report.",
          ].map((step, index) => (
            <li key={step} className="rounded-lg border border-slate-800 bg-[#111827] p-4 text-slate-200">
              <span className="text-[#38BDF8]">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Issue categories</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article key={category} className="rounded-lg border border-slate-800 bg-[#111827] p-4 text-slate-200">
              {category}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Report preview</h2>
        <article className="report-card rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-bold">Executive summary</h3>
          <p className="mt-2">Likely accessibility barriers were detected and organized by severity for prioritized remediation.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold">Severity breakdown</h4>
              <p>Critical: {heroMockSnapshot.severity.critical} • Serious: {heroMockSnapshot.severity.serious} • Moderate: {heroMockSnapshot.severity.moderate} • Minor: {heroMockSnapshot.severity.minor}</p>
            </div>
            <div>
              <h4 className="font-semibold">Included sections</h4>
              <ul className="list-disc pl-5">
                <li>Issue list</li>
                <li>Suggested fixes</li>
                <li>Retest checklist</li>
                <li>Disclaimer</li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-4 rounded-lg border border-[#F59E0B]/40 bg-[#F59E0B]/10 p-6">
        <h2 className="text-3xl font-bold">Helpful checks, not fake guarantees.</h2>
        <p className="text-slate-100">
          AccessPatch helps identify and organize likely accessibility issues. It does not guarantee ADA compliance, WCAG conformance, lawsuit prevention, or full accessibility. Automated checks are limited and manual review is still required.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["Free", "$0", "One demo scan"],
            ["Solo", "$12/mo", "Planned saved scans/reports"],
            ["Agency", "$39/mo", "Planned multi-client dashboard"],
            ["Audit Pack", "$49 one-time", "Planned branded report"],
          ].map(([plan, price, status]) => (
            <article key={plan} className="rounded-lg border border-slate-800 bg-[#111827] p-4">
              <h3 className="text-xl font-semibold">{plan}</h3>
              <p className="mt-2 text-2xl font-bold text-[#22C55E]">{price}</p>
              <p className="mt-2 text-slate-300">{status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold">FAQ</h2>
        <div className="space-y-3">
          <article className="rounded-lg border border-slate-800 bg-[#111827] p-4">
            <h3 className="font-semibold">Does AccessPatch certify WCAG compliance?</h3>
            <p className="mt-1 text-slate-300">No. AccessPatch detects likely issues and tracks remediation work. Manual review is still required.</p>
          </article>
          <article className="rounded-lg border border-slate-800 bg-[#111827] p-4">
            <h3 className="font-semibold">Can I share reports with clients?</h3>
            <p className="mt-1 text-slate-300">Yes. You can export a client-friendly printable report from each scan.</p>
          </article>
        </div>
      </section>

      <section className="rounded-lg border border-slate-800 bg-[#111827] p-6 text-center">
        <h2 className="text-2xl font-bold">Start with one scan and a clear fix board.</h2>
        <Link
          className="focus-ring mt-4 inline-block rounded-md bg-[#22C55E] px-5 py-3 font-semibold text-slate-950 hover:bg-[#16a34a]"
          href="/demo"
        >
          Run a demo scan
        </Link>
      </section>
    </div>
  );
}
