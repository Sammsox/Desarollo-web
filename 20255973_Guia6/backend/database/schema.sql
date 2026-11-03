-- Ejecuta este script en Supabase > SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.tasks (
    id          uuid primary key default gen_random_uuid(),
    title       text not null check (char_length(title) between 1 and 120),
    description text not null default '',
    status      text not null default 'pending'
                check (status in ('pending', 'in_progress', 'done')),
    priority    text not null default 'medium'
                check (priority in ('low', 'medium', 'high')),
    due_date    date,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

create index if not exists tasks_status_idx on public.tasks (status);
create index if not exists tasks_created_at_idx on public.tasks (created_at desc);

-- Mantiene updated_at sincronizado en cada UPDATE
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

-- RLS activado sin políticas públicas: solo el backend (service_role) puede acceder.
alter table public.tasks enable row level security;
