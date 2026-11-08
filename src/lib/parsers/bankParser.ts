export interface BankTransaction {
  date: string;
  description: string;
  amountCents: number;
  balanceCents?: number;
}

// Parser simples para CSV de extratos bancários
export function parseCSVStatement(csvText: string): BankTransaction[] {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  const transactions: BankTransaction[] = [];

  // Assume formato básico: Data,Descrição,Valor
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    if (cols.length >= 3) {
      const [date, description, amountStr] = cols;
      const amountCents = Math.round(parseFloat(amountStr.replace(',', '.')) * 100);
      
      transactions.push({
        date,
        description,
        amountCents
      });
    }
  }

  return transactions;
}

// Sugestão de cruzamento automático (Conciliação)
export function matchTransactionsWithLedger(
  statements: BankTransaction[], 
  ledgerEntries: { id: string; date: string; amountCents: number; description: string }[]
) {
  return statements.map(statement => {
    // Procura lançamento com mesmo valor e data próxima (tolerância de até 3 dias)
    const match = ledgerEntries.find(entry => {
      const sameAmount = entry.amountCents === Math.abs(statement.amountCents);
      // Aqui entraria a lógica de data ± 3 dias
      return sameAmount;
    });

    return {
      statement,
      matchedEntryId: match ? match.id : null,
      status: match ? 'suggested_match' : 'unmatched'
    };
  });
}
