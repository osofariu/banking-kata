import {Account} from "./account";
import createSpyObj = jasmine.createSpyObj;
import {Ledger, TransactionType} from "./ledger";

describe('Account', () => {


  describe('printStatement', () => {
    it('printing statement with no transactions, shows header', () => {
      let ledger = new Ledger()
      spyOnProperty(ledger, 'transactions').and.returnValue([])
      let account = new Account(ledger)

      expect(account.printStatement()).toEqual('Date,Amount,Balance\n')
    })

    it('prints statement with one transaction', () => {
      let ledger = new Ledger()
      spyOnProperty(ledger, 'transactions').and.returnValue(
        [{amount: 1234, type: TransactionType.DEPOSIT, date: "2021-05-29"}])
      let account = new Account(ledger)

      expect(account.printStatement()).toEqual('Date,Amount,Balance\n' +
        '2021-05-29,+1234,1234\n')
    })
  })

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

})
