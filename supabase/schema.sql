-- Run once in the SQL Editor of your new Supabase project.
create table if not exists public.records (id text primary key, data text not null, revision integer not null default 0);
create table if not exists public.members (email text primary key, role text not null check (role in ('manager','editor')));
create table if not exists public.orders (id text primary key, data text not null, created_at text not null);
alter table public.records enable row level security;
alter table public.members enable row level security;
alter table public.orders enable row level security;
revoke all on public.records, public.members, public.orders from anon, authenticated;
grant all on public.records, public.members, public.orders to service_role;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('products','products',false,4194304,array['image/png','image/jpeg','image/webp'])
on conflict (id) do nothing;
-- No public write policies. All reads/writes go through authorized server routes.
