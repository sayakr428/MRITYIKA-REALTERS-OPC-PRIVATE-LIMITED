create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  mobile text not null,
  email text,
  plot_type text not null,
  message text
);

alter table contact_submissions enable row level security;

-- Anyone (the anon/publishable key used by the browser) can submit the
-- form, but cannot read, edit, or delete rows — that keeps other visitors'
-- contact details private while still letting the public site write to it.
create policy "Anyone can submit the contact form"
  on contact_submissions
  for insert
  to anon
  with check (true);
