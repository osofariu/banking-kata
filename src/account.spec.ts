import {Account} from "./account";
import createSpyObj = jasmine.createSpyObj;
import {Ledger} from "./ledger";

describe('Account', () => {

  let account: Account
  let mockLedger: jasmine.SpyObj<Ledger>

  beforeEach(() => {
    mockLedger = createSpyObj(Ledger, ['recordDeposit'])
    account = new Account(mockLedger)
  })

  it('printing statement with no transactions, shows header', () => {
    expect(account.printStatement()).toEqual('Date,Amount,Balance\n')
  })

  it('can deposit a positive amount', () => {
    account.deposit(123)

    expect(mockLedger.recordDeposit).toHaveBeenCalledOnceWith(123)
  })
})
