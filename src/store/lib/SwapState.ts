import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import swapAbi from '@/constants/abi/ccTokenAbi.json';

export class SwapState {
  address: Partial<string>;
  network: NetworkState;
  abi = swapAbi;

  constructor(args: Partial<SwapState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  deposit(args: Partial<CallParams<[string, string, string]>>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'deposit'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'deposit'
    }, args));
  }

  withdraw(args: Partial<CallParams<[string, string, string]>>) {
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'withdraw'
    }, args));
  }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
