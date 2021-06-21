import { makeAutoObservable } from 'mobx';
import { BigNumberState } from '@/store/standard/BigNumberState';

export class ActionState {
  key: string;
  txHash: string;
  status: string;
  recipient: string;
  sender: string;
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

  decodeBase64toHexAddress(content: string): string {
    return '0x' + this.decodeBase64toHex(content);
  }

  decodeBase64toHex(content: string):string {
    return Buffer.from(String(content), 'base64').toString('hex');
  }

  constructor(args: Partial<ActionState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

}
