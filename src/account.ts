import {Ledger} from "./ledger";

export class Account {

  public constructor(private _ledger: Ledger) {
  }

  public printStatement(): string {
    const headerStr = 'Date,Amount,Balance\n'
    let transactionsStr = ''
    this._ledger.transactions.forEach(transaction => {
      transactionsStr += transaction.date + ',' + '+' + transaction.amount + ',' + transaction.amount + '\n'
    })
    return headerStr + transactionsStr
  }

  public deposit(amount: number) {
    this._ledger.recordDeposit(amount)
  }

}