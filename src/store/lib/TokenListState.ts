import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import tokenListAbi from '@/constants/abi/tokenlist.json';

export class TokenListState {
  mintableAddress: Partial<string>;
  standardAddress: Partial<string>;
  network: NetworkState;
  abi = tokenListAbi;

  constructor(args: Partial<TokenListState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  preMulticallMintable(args: Partial<CallParams>) {
    return Object.assign({ address: this.mintableAddress, abi: this.abi }, args);
  }
  preMulticallStandard(args: Partial<CallParams>) {
    return Object.assign({ address: this.standardAddress, abi: this.abi }, args);
  }
}
