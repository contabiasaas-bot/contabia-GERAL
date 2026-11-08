-- Clientes (Empresas atendidas)
create table clients (
    id uuid primary key default uuid_generate_v4(),
    office_id uuid references offices(id) on delete cascade not null,
    corporate_name text not null,
    trade_name text,
    cnpj varchar(14) unique not null,
    tax_regime text not null default 'Simples Nacional',
    email text,
    phone text,
    address jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);

-- Plano de Contas
create table accounts (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    code varchar(50) not null,
    name text not null,
    type varchar(20) not null, -- asset, liability, equity, revenue, expense
    nature varchar(10) not null, -- D (Devedora) ou C (Credora)
    parent_id uuid references accounts(id),
    created_at timestamptz default now()
);

-- Cabeçalho de Lançamentos Contábeis
create table journal_entries (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    entry_date date not null,
    description text not null,
    document_reference text,
    created_by uuid references profiles(id),
    created_at timestamptz default now()
);

-- Linhas das Partidas Dobradas (Débito/Crédito)
create table journal_lines (
    id uuid primary key default uuid_generate_v4(),
    entry_id uuid references journal_entries(id) on delete cascade not null,
    account_id uuid references accounts(id) not null,
    debit_cents bigint not null default 0,
    credit_cents bigint not null default 0,
    constraint positive_amounts check (debit_cents >= 0 and credit_cents >= 0 and (debit_cents + credit_cents) > 0)
);

-- RLS
alter table clients enable row level security;
alter table accounts enable row level security;
alter table journal_entries enable row level security;
alter table journal_lines enable row level security;

create policy "Users can view clients of their office"
    on clients for select using (
        public.fn_is_super_admin() or 
        office_id in (select office_id from profiles where id = auth.uid())
    );

create policy "Office admins and accountants can manage clients"
    on clients for all using (
        public.fn_is_super_admin() or 
        office_id in (select office_id from profiles where id = auth.uid())
    );

create policy "Access accounts via client office"
    on accounts for all using (
        public.fn_is_super_admin() or 
        client_id in (select id from clients where office_id in (select office_id from profiles where id = auth.uid()))
    );

create policy "Access journal entries via client office"
    on journal_entries for all using (
        public.fn_is_super_admin() or 
        client_id in (select id from clients where office_id in (select office_id from profiles where id = auth.uid()))
    );

create policy "Access journal lines via entry client office"
    on journal_lines for all using (
        public.fn_is_super_admin() or 
        entry_id in (
            select je.id from journal_entries je 
            join clients c on je.client_id = c.id 
            where c.office_id in (select office_id from profiles where id = auth.uid())
        )
    );

-- Funções para validação de débitos e créditos
create or replace function fn_check_entry_balance(p_entry_id uuid)
returns boolean as $$
declare
    v_debit bigint;
    v_credit bigint;
begin
    select sum(debit_cents), sum(credit_cents)
    into v_debit, v_credit
    from journal_lines
    where entry_id = p_entry_id;

    return v_debit = v_credit;
end;
$$ language plpgsql;
