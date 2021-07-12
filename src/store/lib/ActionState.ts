import { makeAutoObservable } from 'mobx';
import { BigNumberState } from '@/store/standard/BigNumberState';
import { ChainState } from '@/store/lib/ChainState';

export class ActionState {
  key: string;
  txHash: string;
  status: string;
  recipient: string;
  sender: string;
  timestamp: string;
  fromNetwork: ChainState;
  toNetwork: ChainState;
  token: {
    address: string;
    decimals: number;
    symbol: string;
    name: string;
    logoURI: string;
  };
  cashier: string;
  amount: BigNumberState;
  witnesses: string[];
  fee: BigNumberState;

  constructor(args: Partial<ActionState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
}
