const {DateTime} = require("luxon");

export class Ledger {
  private _transaction: Transaction[] = []

  public recordDeposit(amount: number): Status {
    const status = Ledger.validateDeposit(amount)
    if (status.success) {
      const dateNow = DateTime.now().toFormat('yyyy-MM-dd')
      this._transaction.push({amount: amount, type: TransactionType.DEPOSIT, date: dateNow})
    }
    return status
  }

  public get transactions(): Transaction[] {
    return this._transaction
  }

  private static validateDeposit(amount: number) {
    if (amount > 0) {
      return {success: true}
    } else {
      return  {success: false, message: "Amount must be positive"}
    }
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

export type Status = {
  success: boolean,
  message?: string
}