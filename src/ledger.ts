const {DateTime} = require("luxon");

export class Ledger {
  private _transaction: Transaction[] = []

  public recordDeposit(amount: number) {
    const dateNow = DateTime.now().toFormat('yyyy-MM-dd')
    this._transaction.push({amount: amount, type: TransactionType.DEPOSIT, date: dateNow})
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
  date: string
}
