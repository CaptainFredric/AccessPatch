export type IssueSeverity = "critical" | "serious" | "moderate" | "minor";

export type IssueStatus =
  | "needs_review"
  | "in_progress"
  | "fixed"
  | "retest_needed";

export interface Site {
  id: string;
  name: string;
  url: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Scan {
  id: string;
  siteId: string;
  scannedUrl: string;
  createdAt: string;
  summary: string;
  totalIssues: number;
  criticalIssues: number;
  seriousIssues: number;
  moderateIssues: number;
  minorIssues: number;
}

export interface AccessibilityIssue {
  id: string;
  scanId: string;
  siteId: string;
  category: string;
  severity: IssueSeverity;
  title: string;
  plainEnglishExplanation: string;
  affectedElement: string;
  suggestedFix: string;
  status: IssueStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  siteId: string;
  scanId: string;
  generatedAt: string;
  reportType: "html" | "pdf";
}

export interface AccessPatchDb {
  sites: Site[];
  scans: Scan[];
  issues: AccessibilityIssue[];
  reports: Report[];
}
