"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSite, initDb, runDemoScan } from "@/lib/storage";

export default function ScanPage() {
  const router = useRouter();
  const [url, setUrl] = useState("https://");
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    initDb();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const site = createSite({
      name: name.trim() || "Untitled Site",
      url: url.trim(),
      ownerName: ownerName.trim() || "Unknown owner",
    });

    const scan = runDemoScan(site.id, url.trim());

    if (scan) {
      router.push(`/sites/${site.id}/issues?scanId=${scan.id}`);
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Run a new scan</h1>
      <p className="text-slate-300">
        Enter a website URL to generate a likely issue list and remediation board.
      </p>
      <form className="space-y-4 rounded-lg border border-slate-800 bg-[#111827] p-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block font-medium" htmlFor="siteName">
            Site name
          </label>
          <input
            className="focus-ring w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
            id="siteName"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </div>
        <div>
          <label className="mb-1 block font-medium" htmlFor="siteOwner">
            Owner name
          </label>
          <input
            className="focus-ring w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
            id="siteOwner"
            onChange={(event) => setOwnerName(event.target.value)}
            required
            type="text"
            value={ownerName}
          />
        </div>
        <div>
          <label className="mb-1 block font-medium" htmlFor="siteUrl">
            Website URL
          </label>
          <input
            className="focus-ring w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
            id="siteUrl"
            onChange={(event) => setUrl(event.target.value)}
            pattern="https?://.*"
            required
            type="url"
            value={url}
          />
        </div>
        <button className="focus-ring rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-slate-950" type="submit">
          Create site and run demo scan
        </button>
      </form>
    </section>
  );
}
