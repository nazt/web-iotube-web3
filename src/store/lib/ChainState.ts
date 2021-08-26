import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { TokenState } from './TokenState';
import { CrossChain } from '../../../type';
import { _ } from '@/lib/lodash';
import { MappingState } from '../standard/MappingState';
import { TubeState } from '@/store/lib/TubeState';
import { TubeRouterState } from '@/store/lib/TubeRouterState';

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
  tokensForCC?: TokenState[];
  ccToken?: TokenState;
  router?: string;
  tubeRouterAddress?: string;
  tubeAddress?: string;

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
