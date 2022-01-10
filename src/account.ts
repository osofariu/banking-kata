import {Ledger} from "./ledger";

export class Account {

  public constructor(private _ledger: Ledger) {}

  public printStatement(): string {
    return('Date,Amount,Balance\n')
  }

  public deposit(amount: number) {}

}