import {Ledger} from "./ledger";

export class Account {

  public constructor(private _ledger: Ledger) {
  }

  public printStatement(): string {
    const headerStr = 'Date,Amount,Balance\n'
    let transactionsStr = ''
    let currentBalance = 0
    this._ledger.transactions.forEach(transaction => {
      currentBalance += transaction.amount
      transactionsStr += transaction.date + ',' + '+' + transaction.amount + ',' + currentBalance + '\n'
    })
    return headerStr + transactionsStr
  }

  public deposit(amount: number) {
    this._ledger.recordDeposit(amount)
  }

}