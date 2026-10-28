-- Run this migration in the Supabase SQL Editor before enabling the admin panel.
create table if not exists public.site_settings (
  id integer primary key check (id = 1),
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
alter table public.site_admins enable row level security;
drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings" on public.site_settings for all to authenticated
using (exists (select 1 from public.site_admins where public.site_admins.user_id = (select auth.uid())))
with check (exists (select 1 from public.site_admins where public.site_admins.user_id = (select auth.uid())));
drop policy if exists "Admins can read their own admin record" on public.site_admins;
create policy "Admins can read their own admin record" on public.site_admins for select to authenticated using (user_id = (select auth.uid()));
insert into public.site_settings (id, settings) values (1, '{}'::jsonb) on conflict (id) do nothing;
-- After creating an administrator in Supabase Authentication, run:
-- insert into public.site_admins (user_id) values ('AUTH_USER_UUID_HERE');
