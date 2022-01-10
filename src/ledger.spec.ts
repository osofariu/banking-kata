import { Ledger } from "./ledger"

describe('AccountLedger', () => {

  let ledger: Ledger

  beforeEach(() => {
    ledger = new Ledger()
  })

  it('ledger is empty when no transactions have been deposited', () => {
    let transactions = ledger.transactions

    expect(transactions.length).toEqual(0)
  })
})