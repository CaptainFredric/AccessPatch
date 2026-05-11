const plans = [
  { name: "Free", price: "$0", status: "One demo scan" },
  { name: "Solo", price: "$12/mo", status: "Planned saved scans/reports" },
  { name: "Agency", price: "$39/mo", status: "Planned multi-client dashboard" },
  { name: "Audit Pack", price: "$49 one-time", status: "Planned branded report" },
];

export default function PricingPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Pricing (Stripe-ready stub)</h1>
      <p className="text-slate-300">
        Payment flows are stubbed for MVP while AccessPatch focuses on scan workflow quality.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <article className="rounded-lg border border-slate-800 bg-[#111827] p-5" key={plan.name}>
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-2xl font-bold text-[#22C55E]">{plan.price}</p>
            <p className="mt-2 text-slate-300">{plan.status}</p>
            <button className="focus-ring mt-4 w-full rounded border border-slate-600 px-3 py-2 font-semibold">
              Coming soon
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
