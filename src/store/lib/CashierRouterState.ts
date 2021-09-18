import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import cashierRouterAbi from '../../constants/abi/ccCashierRouterAbi.json';
import { BigNumberState } from '@/store/standard/BigNumberState';

export class CashierRouterState {
  address: Partial<string>;
  network: NetworkState;
  depositFee: BigNumberState = new BigNumberState({decimals: 18, loading: false});
  abi = cashierRouterAbi;

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

  approveCrosschainToken(args: Partial<CallParams<[string, string, string]>>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'approveCrosschainToken'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'approveCrosschainToken'
    }, args));
  }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
