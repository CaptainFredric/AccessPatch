"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLatestScan, getSite, initDb } from "@/lib/storage";
import { Scan, Site } from "@/lib/types";

export default function SiteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [site, setSite] = useState<Site | null>(null);
  const [scan, setScan] = useState<Scan | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const resolved = await params;
      initDb();
      if (!mounted) return;
      setSite(getSite(resolved.id));
      setScan(getLatestScan(resolved.id));
    };

    load();

    return () => {
      mounted = false;
    };
  }, [params]);

  if (!site) {
    return <p className="text-slate-300">Site not found.</p>;
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{site.name}</h1>
      <p className="text-slate-300">{site.url}</p>
      <p className="text-slate-400">Owner: {site.ownerName}</p>
      {scan ? (
        <article className="rounded-lg border border-slate-800 bg-[#111827] p-5">
          <h2 className="text-xl font-semibold">Latest scan snapshot</h2>
          <p className="mt-2">Total issues: {scan.totalIssues}</p>
          <p className="text-red-300">Critical: {scan.criticalIssues}</p>
          <p className="text-orange-300">Serious: {scan.seriousIssues}</p>
          <p className="text-amber-300">Moderate: {scan.moderateIssues}</p>
          <p className="text-blue-300">Minor: {scan.minorIssues}</p>
        </article>
      ) : (
        <p className="text-slate-300">No scans yet. Run one from the scan history page.</p>
      )}
      <div className="flex flex-wrap gap-3">
        <Link className="focus-ring rounded border border-slate-600 px-3 py-2" href={`/sites/${site.id}/scans`}>
          Scan history
        </Link>
        <Link className="focus-ring rounded border border-slate-600 px-3 py-2" href={`/sites/${site.id}/issues`}>
          Issue board
        </Link>
        <Link className="focus-ring rounded border border-slate-600 px-3 py-2" href={`/sites/${site.id}/report`}>
          Report
        </Link>
      </div>
    </section>
  );
}
