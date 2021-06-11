import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { TokenState } from './TokenState';
import { CrossChain } from '../../../type';
import { _ } from '@/lib/lodash';
import { MappingState } from '../standard/MappingState';

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
  nativeCurrency: TokenState;
  info: {
    blockPerSeconds: number;
    multicallAddr?: string;
  };

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

    //TO-DO this.crossChain here is not init yet. Please refer to god.ts line:47
    _.each(this.crossChain, (v, k) => {
      console.log(v);
      _.each(v.tokens, (token) => {
        console.log(token);
        token.network = this.network;
      });
    });
  }
}
