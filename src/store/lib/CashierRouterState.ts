import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import cashierAbi from '../../constants/abi/cashierAbi.json';
import { BigNumberState } from '@/store/standard/BigNumberState';

export class CashierRouterState {
  address: Partial<string>;
  network: NetworkState;
  depositFee: BigNumberState = new BigNumberState({decimals: 18, loading: false});
  // abi = cashierRouterAbi;

  constructor(args: Partial<CashierRouterState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  depositTo(args: Partial<CallParams<[string, string, string]>>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'depositTo'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'depositTo'
    }, args));
  }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
