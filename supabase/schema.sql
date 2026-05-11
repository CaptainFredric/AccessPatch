create table if not exists sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  owner_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists scans (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references sites(id) on delete cascade,
  scanned_url text not null,
  created_at timestamptz not null default now(),
  summary text not null,
  total_issues integer not null default 0,
  critical_issues integer not null default 0,
  serious_issues integer not null default 0,
  moderate_issues integer not null default 0,
  minor_issues integer not null default 0
);

create table if not exists accessibility_issues (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid not null references scans(id) on delete cascade,
  site_id uuid not null references sites(id) on delete cascade,
  category text not null,
  severity text not null,
  title text not null,
  plain_english_explanation text not null,
  affected_element text not null,
  suggested_fix text not null,
  status text not null,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references sites(id) on delete cascade,
  scan_id uuid not null references scans(id) on delete cascade,
  generated_at timestamptz not null default now(),
  report_type text not null default 'html'
);
