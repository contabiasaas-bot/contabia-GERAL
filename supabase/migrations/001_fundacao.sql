-- Habilitar extensão de UUID
create extension if not exists "uuid-ossp";

-- Enums de papéis e status
create type user_role as enum ('super_admin', 'office_admin', 'accountant', 'client');
create type subscription_status as enum ('active', 'trialing', 'past_due', 'canceled', 'blocked');

-- Escritórios de Contabilidade (Tenants)
create table offices (
    id uuid primary key default uuid_generate_v4(),
    corporate_name text not null,
    trade_name text,
    cnpj varchar(14) unique not null,
    plan_id uuid,
    status subscription_status default 'trialing',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);

-- Planos do SaaS
create table plans (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    max_clients int not null,
    price_cents int not null,
    created_at timestamptz default now()
);

-- Perfis dos Usuários
create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    office_id uuid references offices(id) on delete cascade,
    role user_role not null default 'accountant',
    full_name text not null,
    email text unique not null,
    blocked boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Habilitar RLS
alter table offices enable row level security;
alter table plans enable row level security;
alter table profiles enable row level security;

-- Função auxilIar para checar se é Super Admin
create or replace function fn_is_super_admin()
returns boolean as $$
begin
    return exists (
        select 1 from profiles
        where id = auth.uid() and role = 'super_admin'
    );
end;
$$ language plpgsql security definer;

-- Políticas de RLS
create policy "Super admins can manage offices"
    on offices for all using ( public.fn_is_super_admin() );

create policy "Office users can view their own office"
    on offices for select using ( id in (select office_id from profiles where id = auth.uid()) );

create policy "Plans are viewable by everyone authenticated"
    on plans for select to authenticated using (true);

create policy "Super admins manage plans"
    on plans for all using ( public.fn_is_super_admin() );

create policy "Users can view profiles in their office or super admins"
    on profiles for select using (
        public.fn_is_super_admin() or 
        office_id in (select office_id from profiles where id = auth.uid())
    );

create policy "Super admins and office admins can manage profiles"
    on profiles for all using (
        public.fn_is_super_admin() or 
        exists (
            select 1 from profiles p 
            where p.id = auth.uid() and p.office_id = profiles.office_id and p.role = 'office_admin'
        )
    );
