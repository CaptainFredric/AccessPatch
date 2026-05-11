import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AccessPatch",
  description:
    "Accessibility scanner and fix tracker for small business websites, with plain-English reports and remediation boards.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/sites", label: "Sites" },
  { href: "/scan", label: "Scan" },
  { href: "/pricing", label: "Pricing" },
  { href: "/settings", label: "Settings" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#0F172A] text-[#F8FAFC]">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <header className="border-b border-slate-800/80 bg-[#111827]/90">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link className="text-lg font-semibold text-[#F8FAFC]" href="/">
              AccessPatch
            </Link>
            <nav aria-label="Primary">
              <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="focus-ring rounded px-2 py-1 text-sm font-medium text-slate-300 hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
