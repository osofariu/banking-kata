import {Ledger, TransactionType} from "./ledger"
import { Settings } from "luxon";

describe('AccountLedger', () => {

  let ledger: Ledger

  beforeEach(() => {
    ledger = new Ledger()
    Settings.now = () => new Date(2018, 4, 25).valueOf();
  })

  it('ledger is empty when no transactions have been deposited', () => {
    let transactions = ledger.transactions

    expect(transactions.length).toEqual(0)
  })

  it('on recordTransaction ledger has a record of that transaction', () => {
    ledger.recordDeposit(12)

    expect(ledger.transactions.length).toEqual(1)

    let transaction = ledger.transactions[0]
    expect(transaction.amount).toEqual(12)
    expect(transaction.type).toEqual(TransactionType.DEPOSIT)
    expect(transaction.date).toEqual("2018-05-25")
  })
})