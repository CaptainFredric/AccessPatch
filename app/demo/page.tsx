"use client";

import Link from "next/link";
import { useState } from "react";
import { initDb, listSites, runDemoScan } from "@/lib/storage";

export default function DemoPage() {
  const [siteId] = useState<string>(() => {
    initDb();
    return listSites()[0]?.id ?? "site-harbor-pine";
  });
  const [scanId, setScanId] = useState<string>("scan-harbor-1");

  const handleRunDemo = () => {
    const scan = runDemoScan(siteId);
    if (scan) {
      setScanId(scan.id);
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Demo scan</h1>
      <p className="max-w-3xl text-slate-300">
        AccessPatch demo mode uses local data and simulates likely issue detection. Automated checks are limited and manual review is still required.
      </p>
      <div className="rounded-lg border border-slate-800 bg-[#111827] p-6">
        <p className="text-lg font-semibold">Sample site: Harbor &amp; Pine Bakery</p>
        <p className="text-slate-300">https://harborandpinebakery.com</p>
        <button
          className="focus-ring mt-4 rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-slate-950"
          onClick={handleRunDemo}
          type="button"
        >
          Run simulated demo scan
        </button>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="focus-ring rounded border border-slate-600 px-3 py-2" href={`/sites/${siteId}/issues`}>
            Open issue board
          </Link>
          <Link className="focus-ring rounded border border-slate-600 px-3 py-2" href={`/sites/${siteId}/scans`}>
            View scan history
          </Link>
          <Link className="focus-ring rounded border border-slate-600 px-3 py-2" href={`/sites/${siteId}/report?scanId=${scanId}`}>
            View sample report
          </Link>
        </div>
      </div>
    </section>
  );
}
