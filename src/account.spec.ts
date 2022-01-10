describe('Account', () => {

  let account: Account

  beforeEach(() => {
    account = new Account()
  })

  it('printing statement with no transactions, shows header', () => {
    expect(account.printStatement()).toEqual('Date,Amount,Balance\n')
  })
})