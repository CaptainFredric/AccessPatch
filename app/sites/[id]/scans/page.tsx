"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteScans, initDb, runDemoScan } from "@/lib/storage";
import { Scan } from "@/lib/types";

export default function SiteScansPage({ params }: { params: Promise<{ id: string }> }) {
  const [siteId, setSiteId] = useState("");
  const [scans, setScans] = useState<Scan[]>([]);

  const refreshScans = (id: string) => {
    setScans(getSiteScans(id));
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const resolved = await params;
      initDb();
      if (!mounted) return;
      setSiteId(resolved.id);
      refreshScans(resolved.id);
    };

    load();

    return () => {
      mounted = false;
    };
  }, [params]);

  const handleScan = () => {
    if (!siteId) return;
    runDemoScan(siteId);
    refreshScans(siteId);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Scan history</h1>
        <button className="focus-ring rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-slate-950" onClick={handleScan} type="button">
          Run demo scan
        </button>
      </div>
      <div className="grid gap-3">
        {scans.map((scan) => (
          <article className="rounded-lg border border-slate-800 bg-[#111827] p-4" key={scan.id}>
            <p className="font-semibold">{new Date(scan.createdAt).toLocaleString()}</p>
            <p className="text-slate-300">{scan.summary}</p>
            <p className="text-slate-200">{scan.totalIssues} issues • {scan.criticalIssues} critical • {scan.seriousIssues} serious</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link className="focus-ring rounded border border-slate-600 px-2 py-1 text-sm" href={`/sites/${scan.siteId}/issues?scanId=${scan.id}`}>
                Open issue board
              </Link>
              <Link className="focus-ring rounded border border-slate-600 px-2 py-1 text-sm" href={`/sites/${scan.siteId}/report?scanId=${scan.id}`}>
                Open report
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
