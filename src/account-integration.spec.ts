import { Ledger } from "./ledger";
import { Account } from "./account";

const { DateTime } = require("luxon");

describe('Bank Account integration', () => {
  it('uses correct date when recording a deposit', () => {
    let ledger = new Ledger()
    let account = new Account(ledger)
    account.deposit(321)

    const statement = account.printStatement()
    const dateNow = DateTime.now().toFormat('yyyy-MM-dd')
    const expectedStatementRegexp = new RegExp('^Date,Amount,Balance\n' + dateNow + ',\\+321,321\n' ,'gm')

    expect(statement).toMatch(expectedStatementRegexp)
  })
})