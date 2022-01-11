import {Account} from "./account";
import createSpyObj = jasmine.createSpyObj;
import {Ledger, Transaction, TransactionType} from "./ledger";
const logger = require('npmlog')

describe('Account', () => {

  describe('deposit', () => {
    let account: Account
    let mockLedger: jasmine.SpyObj<Ledger>
    let mockLogger:  any

    beforeEach(() => {
      mockLedger = createSpyObj(Ledger, ['recordDeposit'])
      account = new Account(mockLedger)
    })

    it('can deposit a positive amount', () => {
      mockLedger.recordDeposit.and.returnValue({success: true})
      account.deposit(123)

      expect(mockLedger.recordDeposit).toHaveBeenCalledOnceWith(123)
    })

    it('logs an error if the deposit could not be recorded in the ledger', () => {
      mockLedger.recordDeposit.and.returnValue({success: false, message: "something went wrong"})
      mockLogger = spyOn(logger, 'error')

      account.deposit(0)
      expect(mockLogger).toHaveBeenCalledOnceWith("something went wrong")
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

    it('prints statement with multiple transactions shows correct balance', () => {
      let account = accountWithTransactions(
        [{amount: 1234, type: TransactionType.DEPOSIT, date: "2021-05-29"},
          {amount: 66, type: TransactionType.DEPOSIT, date: "2021-05-30"}])

      expect(account.printStatement()).toEqual('Date,Amount,Balance\n' +
        '2021-05-29,+1234,1234\n' +
        '2021-05-30,+66,1300\n')
    })
  })

  function accountWithTransactions(transactions: Transaction[]) {
    let ledger = new Ledger()
    spyOnProperty(ledger, 'transactions').and.returnValue(transactions)
    return new Account(ledger)
  }
})
