"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSite, initDb } from "@/lib/storage";

export default function NewSitePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [url, setUrl] = useState("https://");

  useEffect(() => {
    initDb();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const site = createSite({
      name: name.trim(),
      ownerName: ownerName.trim(),
      url: url.trim(),
    });

    router.push(`/sites/${site.id}`);
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Add a site</h1>
      <form className="space-y-4 rounded-lg border border-slate-800 bg-[#111827] p-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block font-medium" htmlFor="name">
            Site name
          </label>
          <input
            className="focus-ring w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
            id="name"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </div>
        <div>
          <label className="mb-1 block font-medium" htmlFor="ownerName">
            Owner name
          </label>
          <input
            className="focus-ring w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
            id="ownerName"
            onChange={(event) => setOwnerName(event.target.value)}
            required
            type="text"
            value={ownerName}
          />
        </div>
        <div>
          <label className="mb-1 block font-medium" htmlFor="url">
            Website URL
          </label>
          <input
            className="focus-ring w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
            id="url"
            onChange={(event) => setUrl(event.target.value)}
            pattern="https?://.*"
            required
            type="url"
            value={url}
          />
        </div>
        <button className="focus-ring rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-slate-950" type="submit">
          Save site
        </button>
      </form>
    </section>
  );
}
