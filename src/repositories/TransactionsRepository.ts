import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = incomeTransactions.reduce((prevTotal, currentValue) => {
      return prevTotal + currentValue.value;
    }, 0);

    const outcome = outcomeTransactions.reduce((prevTotal, currentValue) => {
      return prevTotal + currentValue.value;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
