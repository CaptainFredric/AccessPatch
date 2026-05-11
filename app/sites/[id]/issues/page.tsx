"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getLatestScan,
  getScanIssues,
  initDb,
  statusLabels,
  updateIssue,
} from "@/lib/storage";
import { AccessibilityIssue, IssueStatus } from "@/lib/types";

const statuses: IssueStatus[] = [
  "needs_review",
  "in_progress",
  "fixed",
  "retest_needed",
];

export default function SiteIssuesPage({ params }: { params: Promise<{ id: string }> }) {
  const searchParams = useSearchParams();
  const [siteId, setSiteId] = useState("");
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);

  const selectedScanId = searchParams.get("scanId") ?? undefined;

  const refreshIssues = (id: string, scanId?: string) => {
    setIssues(getScanIssues(id, scanId));
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const resolved = await params;
      initDb();
      if (!mounted) return;
      setSiteId(resolved.id);
      const fallbackScanId = selectedScanId ?? getLatestScan(resolved.id)?.id;
      refreshIssues(resolved.id, fallbackScanId);
    };

    load();

    return () => {
      mounted = false;
    };
  }, [params, selectedScanId]);

  const grouped = useMemo(() => {
    const groups = new Map<IssueStatus, AccessibilityIssue[]>();
    for (const status of statuses) {
      groups.set(status, []);
    }

    for (const issue of issues) {
      groups.get(issue.status)?.push(issue);
    }

    return groups;
  }, [issues]);

  const handleStatusChange = (issueId: string, status: IssueStatus) => {
    const next = updateIssue(issueId, { status });
    if (next && siteId) {
      refreshIssues(siteId, selectedScanId);
    }
  };

  const handleNoteChange = (issueId: string, notes: string) => {
    const next = updateIssue(issueId, { notes });
    if (next && siteId) {
      refreshIssues(siteId, selectedScanId);
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Fix board</h1>
      <p className="text-slate-300">
        Update status and notes as remediation progresses. Retest items after fixes are deployed.
      </p>
      <div className="grid gap-4 lg:grid-cols-4">
        {statuses.map((status) => (
          <article className="space-y-3 rounded-lg border border-slate-800 bg-[#111827] p-4" key={status}>
            <h2 className="font-semibold text-[#38BDF8]">{statusLabels[status]}</h2>
            {(grouped.get(status) ?? []).map((issue) => (
              <div className="rounded border border-slate-700 bg-slate-900/60 p-3" key={issue.id}>
                <p className="font-medium">{issue.title}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{issue.severity} • {issue.category}</p>
                <p className="mt-2 text-sm text-slate-300">{issue.plainEnglishExplanation}</p>
                <label className="mt-3 block text-sm" htmlFor={`${issue.id}-status`}>
                  Status
                </label>
                <select
                  className="focus-ring mt-1 w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-sm"
                  id={`${issue.id}-status`}
                  onChange={(event) => handleStatusChange(issue.id, event.target.value as IssueStatus)}
                  value={issue.status}
                >
                  {statuses.map((option) => (
                    <option key={option} value={option}>
                      {statusLabels[option]}
                    </option>
                  ))}
                </select>
                <label className="mt-2 block text-sm" htmlFor={`${issue.id}-notes`}>
                  Notes
                </label>
                <textarea
                  className="focus-ring mt-1 w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-sm"
                  id={`${issue.id}-notes`}
                  onChange={(event) => handleNoteChange(issue.id, event.target.value)}
                  rows={3}
                  value={issue.notes}
                />
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
