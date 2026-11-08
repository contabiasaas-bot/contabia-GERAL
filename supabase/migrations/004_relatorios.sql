-- Função para gerar o Balancete de um cliente em um determinado período
create or replace function fn_get_trial_balance(p_client_id uuid, p_start_date date, p_end_date date)
returns table (
    account_id uuid,
    account_code varchar(50),
    account_name text,
    account_type varchar(20),
    account_nature varchar(10),
    total_debit bigint,
    total_credit bigint,
    balance bigint
) as $$
begin
    return query
    select 
        a.id as account_id,
        a.code as account_code,
        a.name as account_name,
        a.type as account_type,
        a.nature as account_nature,
        coalesce(sum(jl.debit_cents), 0) as total_debit,
        coalesce(sum(jl.credit_cents), 0) as total_credit,
        case 
            when a.nature = 'D' then coalesce(sum(jl.debit_cents), 0) - coalesce(sum(jl.credit_cents), 0)
            else coalesce(sum(jl.credit_cents), 0) - coalesce(sum(jl.debit_cents), 0)
        end as balance
    from accounts a
    left join journal_lines jl on jl.account_id = a.id
    left join journal_entries je on jl.entry_id = je.id and je.entry_date between p_start_date and p_end_date
    where a.client_id = p_client_id
    group by a.id, a.code, a.name, a.type, a.nature
    order by a.code;
end;
$$ language plpgsql;
