export class Ledger {

  private _transaction: Transaction[] = []

  public recordDeposit(amount: number) {
    this._transaction.push({amount: amount, type: TransactionType.DEPOSIT})
  }

  public get transactions(): Transaction[] {
    return this._transaction
  }
}

export enum TransactionType {
  DEPOSIT
}

export type Transaction = {
  amount: number,
  type: TransactionType,
  date?: string
}
