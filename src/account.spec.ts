import {Account} from "./account";
import createSpyObj = jasmine.createSpyObj;
import {Ledger, Transaction, TransactionType} from "./ledger";

describe('Account', () => {

  describe('deposit', () => {
    let account: Account
    let mockLedger: jasmine.SpyObj<Ledger>

    beforeEach(() => {
      mockLedger = createSpyObj(Ledger, ['recordDeposit'])
      account = new Account(mockLedger)
    })

    it('can deposit a positive amount', () => {
      account.deposit(123)

      expect(mockLedger.recordDeposit).toHaveBeenCalledOnceWith(123)
    })
  })

  describe('printStatement', () => {
    it('printing statement with no transactions, shows header', () => {
      let account = accountWithTransactions([])

      expect(account.printStatement()).toEqual('Date,Amount,Balance\n')
    })

    it('prints statement with one transaction', () => {
      let account = accountWithTransactions(
        [{amount: 1234, type: TransactionType.DEPOSIT, date: "2021-05-29"}])

      expect(account.printStatement()).toEqual('Date,Amount,Balance\n' +
        '2021-05-29,+1234,1234\n')
    })
  })

  function accountWithTransactions(transactions: Transaction[]) {
    let ledger = new Ledger()
    spyOnProperty(ledger, 'transactions').and.returnValue(transactions)
    return new Account(ledger)
  }
})
