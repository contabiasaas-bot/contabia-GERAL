-- Documentos enviados
create table documents (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    file_name text not null,
    file_path text not null,
    file_type varchar(50) not null,
    file_size int not null,
    file_hash varchar(64) not null,
    status varchar(30) not null default 'pending',
    created_by uuid references profiles(id),
    created_at timestamptz default now()
);

-- Transações do Extrato Bancário
create table bank_statements (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    document_id uuid references documents(id) on delete set null,
    transaction_date date not null,
    description text not null,
    amount_cents bigint not null,
    balance_cents bigint,
    reconciled boolean default false,
    created_at timestamptz default now()
);

-- Notas Fiscais
create table invoices (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    document_id uuid references documents(id) on delete set null,
    invoice_number varchar(50) not null,
    issue_date date not null,
    invoice_type varchar(20) not null,
    counterpart_name text not null,
    counterpart_cnpj varchar(14),
    total_amount_cents bigint not null,
    tax_amount_cents bigint default 0,
    created_at timestamptz default now()
);

-- Conciliações Bancárias
create table reconciliations (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    bank_statement_id uuid references bank_statements(id) on delete cascade not null,
    journal_entry_id uuid references journal_entries(id) on delete set null,
    invoice_id uuid references invoices(id) on delete set null,
    status varchar(30) not null default 'pending',
    divergence_reason text,
    confirmed_by uuid references profiles(id),
    confirmed_at timestamptz,
    created_at timestamptz default now()
);

-- RLS
alter table documents enable row level security;
alter table bank_statements enable row level security;
alter table invoices enable row level security;
alter table reconciliations enable row level security;

create policy "Access documents via client office"
    on documents for all using (
        public.fn_is_super_admin() or 
        client_id in (select id from clients where office_id in (select office_id from profiles where id = auth.uid()))
    );

create policy "Access bank statements via client office"
    on bank_statements for all using (
        public.fn_is_super_admin() or 
        client_id in (select id from clients where office_id in (select office_id from profiles where id = auth.uid()))
    );

create policy "Access invoices via client office"
    on invoices for all using (
        public.fn_is_super_admin() or 
        client_id in (select id from clients where office_id in (select office_id from profiles where id = auth.uid()))
    );

create policy "Access reconciliations via client office"
    on reconciliations for all using (
        public.fn_is_super_admin() or 
        client_id in (select id from clients where office_id in (select office_id from profiles where id = auth.uid()))
    );
