"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateReport, getLatestScan, getScanIssues, getSite, initDb } from "@/lib/storage";
import { AccessibilityIssue } from "@/lib/types";

export default function SiteReportPage({ params }: { params: Promise<{ id: string }> }) {
  const searchParams = useSearchParams();
  const [siteId, setSiteId] = useState("");
  const [siteName, setSiteName] = useState("Report");
  const [scanDate, setScanDate] = useState("");
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const resolved = await params;
      initDb();
      if (!mounted) return;

      setSiteId(resolved.id);
      const site = getSite(resolved.id);
      if (site) {
        setSiteName(site.name);
      }

      const selectedScanId =
        searchParams.get("scanId") ?? getLatestScan(resolved.id)?.id;

      if (!selectedScanId) {
        setIssues([]);
        return;
      }

      const latest = getLatestScan(resolved.id);
      if (latest) {
        setScanDate(new Date(latest.createdAt).toLocaleString());
      }

      setIssues(getScanIssues(resolved.id, selectedScanId));
      generateReport(resolved.id, selectedScanId);
    };

    load();

    return () => {
      mounted = false;
    };
  }, [params, searchParams]);

  const summary = {
    total: issues.length,
    critical: issues.filter((issue) => issue.severity === "critical").length,
    serious: issues.filter((issue) => issue.severity === "serious").length,
    moderate: issues.filter((issue) => issue.severity === "moderate").length,
    minor: issues.filter((issue) => issue.severity === "minor").length,
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Client report</h1>
        <button className="focus-ring rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-slate-950" onClick={() => window.print()} type="button">
          Export printable report
        </button>
      </div>

      <article className="report-card space-y-6 rounded-xl p-8 shadow-lg">
        <header>
          <h2 className="text-3xl font-bold">Accessibility Remediation Report</h2>
          <p className="mt-2">Site: {siteName}</p>
          <p>Generated: {new Date().toLocaleString()}</p>
          <p>Scan date: {scanDate || "N/A"}</p>
        </header>

        <section>
          <h3 className="text-xl font-semibold">Executive summary</h3>
          <p className="mt-2">
            AccessPatch identified likely accessibility barriers and organized them by severity to support remediation planning and retesting.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Severity breakdown</h3>
          <ul className="mt-2 list-disc pl-5">
            <li>Total issues: {summary.total}</li>
            <li>Critical: {summary.critical}</li>
            <li>Serious: {summary.serious}</li>
            <li>Moderate: {summary.moderate}</li>
            <li>Minor: {summary.minor}</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Issue table</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-2 pr-2">Severity</th>
                  <th className="py-2 pr-2">Issue</th>
                  <th className="py-2 pr-2">Description</th>
                  <th className="py-2 pr-2">Suggested fix</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr className="border-b border-slate-200 align-top" key={issue.id}>
                    <td className="py-2 pr-2 font-semibold">{issue.severity}</td>
                    <td className="py-2 pr-2">{issue.title}</td>
                    <td className="py-2 pr-2">{issue.plainEnglishExplanation}</td>
                    <td className="py-2 pr-2">{issue.suggestedFix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Retest checklist</h3>
          <ul className="mt-2 list-disc pl-5">
            <li>Verify fixed issues in production pages.</li>
            <li>Run keyboard navigation pass for interactive elements.</li>
            <li>Re-scan and compare severity changes.</li>
            <li>Record remaining manual-review findings.</li>
          </ul>
        </section>

        <section className="rounded border border-amber-300 bg-amber-50 p-4">
          <h3 className="text-xl font-semibold">Manual-review disclaimer</h3>
          <p className="mt-2">
            AccessPatch helps identify and organize likely accessibility issues. It does not guarantee ADA compliance, WCAG conformance, lawsuit prevention, or full accessibility. Automated checks are limited and manual review is still required.
          </p>
        </section>
      </article>

      {siteId ? (
        <p className="text-sm text-slate-400">
          Report records are saved to localStorage demo mode for site <span className="font-mono">{siteId}</span>.
        </p>
      ) : null}
    </section>
  );
}
