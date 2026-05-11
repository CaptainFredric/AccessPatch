"use client";

import Link from "next/link";
import { useState } from "react";
import { initDb, listSites } from "@/lib/storage";
import { Site } from "@/lib/types";

export default function SitesPage() {
  const [sites] = useState<Site[]>(() => {
    initDb();
    return listSites();
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Sites</h1>
        <Link className="focus-ring rounded-md bg-[#38BDF8] px-4 py-2 font-semibold text-slate-950" href="/sites/new">
          Add site
        </Link>
      </div>
      <div className="grid gap-4">
        {sites.map((site) => (
          <article className="rounded-lg border border-slate-800 bg-[#111827] p-5" key={site.id}>
            <h2 className="text-xl font-semibold">{site.name}</h2>
            <p className="text-slate-300">{site.url}</p>
            <p className="text-sm text-slate-400">Owner: {site.ownerName}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link className="focus-ring rounded border border-slate-600 px-3 py-1" href={`/sites/${site.id}`}>
                Overview
              </Link>
              <Link className="focus-ring rounded border border-slate-600 px-3 py-1" href={`/sites/${site.id}/issues`}>
                Issues
              </Link>
              <Link className="focus-ring rounded border border-slate-600 px-3 py-1" href={`/sites/${site.id}/report`}>
                Report
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
