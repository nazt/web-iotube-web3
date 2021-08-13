import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import routerAbi from '@/constants/abi/ccRouterAbi.json';

export class CCRouterState {
  address: Partial<string>;
  network: NetworkState;
  abi = routerAbi;

  constructor(args: Partial<CCRouterState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  //chain coin ->  cc
  swapCoinForCrosschainCoin(args: Partial<CallParams>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapCoinForCrosschainCoin'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapCoinForCrosschainCoin'
    }, args));
  }

  //cc -> chain coin
  swapCrosschainCoinForCoin(args: Partial<CallParams>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapCrosschainCoinForCoin'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapCrosschainCoinForCoin'
    }, args));
  }

  //wiotx -> cc
  swapWrappedCoinForCrosschainCoin(args: Partial<CallParams>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapWrappedCoinForCrosschainCoin'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapWrappedCoinForCrosschainCoin'
    }, args));
  }

  //cc ->  wiotx
  swapCrosschainCoinForWrappedCoin(args: Partial<CallParams>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapCrosschainCoinForWrappedCoin'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'swapCrosschainCoinForWrappedCoin'
    }, args));
  }
  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
