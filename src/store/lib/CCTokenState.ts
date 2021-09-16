import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import ccTokenABI from '@/constants/abi/ccTokenAbi.json';
import tokenListAbi from '@/constants/abi/tokenlist.json';
import { BigNumberState } from '@/store/standard/BigNumberState';

export class CCTokenState {
  address: Partial<string>;
  name: string;
  symbol: string;
  decimals: number = 18;
  logoURI: string;
  network: NetworkState;
  abi = ccTokenABI;
  balance: BigNumberState;
  tokenListAbi = tokenListAbi;
  allowanceForSwap: BigNumberState;
  chainId: number;

  constructor(args: Partial<CCTokenState>) {
    Object.assign(this, args);
    this.balance = new BigNumberState({ decimals: this.decimals, loading: true });
    this.allowanceForSwap = new BigNumberState({ decimals: this.decimals, loading: true });
    makeAutoObservable(this);
  }

  approve(args: Partial<CallParams>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'approve' }, args));
  }

  //wiotx -> cc
  deposit(args: Partial<CallParams<[string, string, string]>>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'depositTo'
    }, args));
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'deposit'
    }, args));
  }

  //cc -> wiotx
  withdraw(args: Partial<CallParams<[string, string, string]>>) {
    console.log(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'withdraw'
    }, args));
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
