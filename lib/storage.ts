import {
  AccessibilityIssue,
  AccessPatchDb,
  IssueSeverity,
  IssueStatus,
  Scan,
  Site,
} from "@/lib/types";

const STORAGE_KEY = "accesspatch-db-v1";
let fallbackIdCounter = 0;

const demoIssues = [
  {
    category: "Missing alt text",
    severity: "serious",
    title: "Product images missing alt text",
    plainEnglishExplanation:
      "Screen reader users cannot tell what product photos show without alternative text.",
    affectedElement: "img.product-photo",
    suggestedFix:
      "Add short, descriptive alt text for each product image, such as 'Blueberry muffin on wood tray'.",
    status: "needs_review",
  },
  {
    category: "Missing form labels",
    severity: "critical",
    title: "Contact form inputs missing labels",
    plainEnglishExplanation:
      "People using assistive technology may not know what each form field is for.",
    affectedElement: "#contact-form input",
    suggestedFix:
      "Connect each input to a visible <label> element using matching id/for attributes.",
    status: "in_progress",
  },
  {
    category: "Low contrast",
    severity: "serious",
    title: "Low contrast button text",
    plainEnglishExplanation:
      "Light gray text on pale buttons is hard to read for users with low vision.",
    affectedElement: ".cta-button",
    suggestedFix:
      "Increase contrast by using darker text or darker button backgrounds that pass WCAG contrast checks.",
    status: "needs_review",
  },
  {
    category: "Empty links",
    severity: "critical",
    title: "Empty link text in social icons",
    plainEnglishExplanation:
      "Icon-only links without accessible text are announced as blank links by screen readers.",
    affectedElement: "footer .social a",
    suggestedFix:
      "Add clear accessible names via visible text, aria-label, or sr-only text for each icon link.",
    status: "fixed",
  },
  {
    category: "Heading structure",
    severity: "moderate",
    title: "Heading levels skipped",
    plainEnglishExplanation:
      "Skipping heading levels can make page structure harder to navigate.",
    affectedElement: "main h1 + h3",
    suggestedFix:
      "Use heading levels in order (h1, h2, h3) to reflect the real content hierarchy.",
    status: "retest_needed",
  },
  {
    category: "Keyboard review checklist",
    severity: "moderate",
    title: "Modal needs keyboard review",
    plainEnglishExplanation:
      "Automated scanning cannot confirm reliable keyboard focus handling in the modal.",
    affectedElement: "#daily-special-modal",
    suggestedFix:
      "Manually verify focus trap, escape-to-close, and keyboard reachability for all modal controls.",
    status: "needs_review",
  },
] as const satisfies Array<{
  category: string;
  severity: IssueSeverity;
  title: string;
  plainEnglishExplanation: string;
  affectedElement: string;
  suggestedFix: string;
  status: IssueStatus;
}>;

const now = new Date().toISOString();

const seededSite: Site = {
  id: "site-harbor-pine",
  name: "Harbor & Pine Bakery",
  url: "https://harborandpinebakery.com",
  ownerName: "Harbor & Pine",
  createdAt: now,
  updatedAt: now,
};

const seededScanId = "scan-harbor-1";

function summaryFromIssues(issues: AccessibilityIssue[]) {
  const summary = {
    totalIssues: issues.length,
    criticalIssues: 0,
    seriousIssues: 0,
    moderateIssues: 0,
    minorIssues: 0,
  };

  for (const issue of issues) {
    if (issue.severity === "critical") summary.criticalIssues += 1;
    if (issue.severity === "serious") summary.seriousIssues += 1;
    if (issue.severity === "moderate") summary.moderateIssues += 1;
    if (issue.severity === "minor") summary.minorIssues += 1;
  }

  return summary;
}

function makeDemoIssues(siteId: string, scanId: string): AccessibilityIssue[] {
  const stamp = new Date().toISOString();
  return demoIssues.map((issue, index) => ({
    id: `${scanId}-issue-${index + 1}`,
    scanId,
    siteId,
    category: issue.category,
    severity: issue.severity,
    title: issue.title,
    plainEnglishExplanation: issue.plainEnglishExplanation,
    affectedElement: issue.affectedElement,
    suggestedFix: issue.suggestedFix,
    status: issue.status,
    notes: "",
    createdAt: stamp,
    updatedAt: stamp,
  }));
}

const seededIssues = makeDemoIssues(seededSite.id, seededScanId);

const seededSummary = summaryFromIssues(seededIssues);

const seededScan: Scan = {
  id: seededScanId,
  siteId: seededSite.id,
  scannedUrl: seededSite.url,
  createdAt: now,
  summary: "Likely barriers detected. Manual review is still required.",
  ...seededSummary,
};

const seededDb: AccessPatchDb = {
  sites: [seededSite],
  scans: [seededScan],
  issues: seededIssues,
  reports: [],
};

function createId(prefix: string) {
  const webCrypto = globalThis.crypto;

  if (webCrypto?.randomUUID) {
    return `${prefix}-${webCrypto.randomUUID()}`;
  }

  if (webCrypto) {
    const bytes = new Uint8Array(8);
    webCrypto.getRandomValues(bytes);
    const token = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${prefix}-${token}`;
  }

  fallbackIdCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${fallbackIdCounter.toString(36)}`;
}

function cloneSeededDb(): AccessPatchDb {
  return JSON.parse(JSON.stringify(seededDb)) as AccessPatchDb;
}

function readDb(): AccessPatchDb {
  if (typeof window === "undefined") {
    return cloneSeededDb();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const fresh = cloneSeededDb();
    writeDb(fresh);
    return fresh;
  }

  try {
    return JSON.parse(stored) as AccessPatchDb;
  } catch {
    const fresh = cloneSeededDb();
    writeDb(fresh);
    return fresh;
  }
}

function writeDb(db: AccessPatchDb) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function initDb() {
  return readDb();
}

export function listSites() {
  return readDb().sites;
}

export function getSite(siteId: string) {
  return readDb().sites.find((site) => site.id === siteId) ?? null;
}

export function createSite(input: Pick<Site, "name" | "url" | "ownerName">) {
  const db = readDb();
  const stamp = new Date().toISOString();

  const site: Site = {
    id: createId("site"),
    name: input.name,
    url: input.url,
    ownerName: input.ownerName,
    createdAt: stamp,
    updatedAt: stamp,
  };

  db.sites.unshift(site);
  writeDb(db);
  return site;
}

export function getSiteScans(siteId: string) {
  return readDb().scans
    .filter((scan) => scan.siteId === siteId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getLatestScan(siteId: string) {
  return getSiteScans(siteId)[0] ?? null;
}

export function runDemoScan(siteId: string, scannedUrl?: string) {
  const db = readDb();
  const site = db.sites.find((item) => item.id === siteId);

  if (!site) {
    return null;
  }

  const scanId = createId("scan");
  const issues = makeDemoIssues(siteId, scanId);
  const summary = summaryFromIssues(issues);
  const stamp = new Date().toISOString();

  const scan: Scan = {
    id: scanId,
    siteId,
    scannedUrl: scannedUrl ?? site.url,
    createdAt: stamp,
    summary: "Likely barriers detected. Automated checks are limited and manual review is required.",
    ...summary,
  };

  site.updatedAt = stamp;

  db.scans.unshift(scan);
  db.issues.push(...issues);
  writeDb(db);
  return scan;
}

export function getScanIssues(siteId: string, scanId?: string) {
  const db = readDb();

  const selectedScanId = scanId ?? getLatestScan(siteId)?.id;
  if (!selectedScanId) {
    return [];
  }

  return db.issues.filter((issue) => issue.scanId === selectedScanId);
}

export function updateIssue(
  issueId: string,
  updates: Partial<Pick<AccessibilityIssue, "status" | "notes">>,
) {
  const db = readDb();
  const issue = db.issues.find((item) => item.id === issueId);

  if (!issue) {
    return null;
  }

  if (updates.status) {
    issue.status = updates.status;
  }

  if (typeof updates.notes === "string") {
    issue.notes = updates.notes;
  }

  issue.updatedAt = new Date().toISOString();
  writeDb(db);
  return issue;
}

export function generateReport(siteId: string, scanId: string) {
  const db = readDb();
  const report = {
    id: createId("report"),
    siteId,
    scanId,
    generatedAt: new Date().toISOString(),
    reportType: "html" as const,
  };

  db.reports.unshift(report);
  writeDb(db);
  return report;
}

export const statusLabels: Record<IssueStatus, string> = {
  needs_review: "Needs Review",
  in_progress: "In Progress",
  fixed: "Fixed",
  retest_needed: "Retest",
};
