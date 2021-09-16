import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { TokenState } from './TokenState';
import { CCSwapTokensPairs, CrossChain } from '../../../type';
import { _ } from '@/lib/lodash';

export class ChainState {
  name: string;
  alias?: string;
  logoUrl: string;
  network: NetworkState;
  chainId: number;
  rpcUrl: string;
  explorerName: string;
  explorerURL: string;
  Coin: TokenState;
  confirmationTimes: number = 12;
  nativeCurrency: TokenState;
  info: {
    blockPerSeconds: number;
    multicallAddr?: string;
  };
  ccSwapRouter?: string;
  ccSwapTokensPairs: Partial<CCSwapTokensPairs>;

  crossChain: {
    [key: number]: Partial<CrossChain>;
  };

  constructor(args: Partial<ChainState>) {
    // this.crossChain.current
    // this.crossChain.setCurrentId()
    Object.assign(this, args);
    makeAutoObservable(this, { network: false });
  }
  init() {
    this.Coin.network = this.network;
    _.each(this.crossChain, (v, k) => {
      _.each(v.tokens, (token) => {
        token.network = this.network;
      });
    });
  }
}
