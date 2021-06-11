import { NetworkState } from './lib/NetworkState';
import { makeAutoObservable } from 'mobx';
import { MappingStorageState, MappingState } from './standard/MappingState';
import { EthNetworkConfig, IotexNetworkConfig } from '../config/NetworkConfig';
import { ChainState } from './lib/ChainState';
import { EthNetworkState } from './lib/EthNetworkState';
import { IotexNetworkState } from './lib/IotexNetworkState';
import { RootStore } from './root';
import { StorageState } from './standard/StorageState';
import { NumberState } from './standard/base';
import { _ } from '@/lib/lodash';
import { ethCrossChain, ETHMainnetConfig } from '../config/ETHMainnetConfig';
import { iotexMainCrossChain, IotexMainnetConfig } from '../config/IotexMainnetConfig';
import { bscMainCrossChain, BSCMainnetConfig } from '../config/BSCMainnetConfig';
import { ETHKovanConfig, ethKovenCrossChain } from '../config/ETHKovanConfig';
import { IotexTestnetConfig, iotexTestnetCrossChain } from '../config/IotexTestnetConfig';
import { polygonMainCrossChain, PolygonMainnetConfig } from '../config/PolygonMainnetConfig';
import { metamaskUtils } from '@/lib/metaskUtils';

export enum Network {
  eth = 'eth',
  bsc = 'bsc',
  iotex = 'iotex'
}

export class GodStore {
  rootStore: RootStore;
  network: MappingState<NetworkState> = new MappingState({
    currentId: Network.eth,
    map: {
      eth: EthNetworkConfig,
      bsc: EthNetworkConfig,
      iotex: EthNetworkConfig,
      polygon: EthNetworkConfig,
    }
  });

  updateTicker = new NumberState();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
    EthNetworkConfig.god = this;
    EthNetworkConfig.init();
    BSCMainnetConfig.init();
    PolygonMainnetConfig.init();
    IotexMainnetConfig.init();
    // IotexTestnetConfig.init();

    ETHMainnetConfig.crossChain = ethCrossChain(EthNetworkConfig);
    IotexMainnetConfig.crossChain = iotexMainCrossChain(IotexNetworkConfig);
    BSCMainnetConfig.crossChain = bscMainCrossChain(EthNetworkConfig);
    ETHKovanConfig.crossChain = ethKovenCrossChain(EthNetworkConfig);
    PolygonMainnetConfig.crossChain = polygonMainCrossChain(EthNetworkConfig);
    // IotexTestnetConfig.crossChain = iotexTestnetCrossChain(EthNetworkConfig);
  }
  get isIotxNetork() {
    return this.network.currentId.value == Network.iotex;
  }
  get isETHNetwork() {
    //@ts-ignore
    return [Network.eth, Network.bsc].includes(this.network.currentId.value);
  }

  get eth(): EthNetworkState {
    return this.network.map.eth as EthNetworkState;
  }

  get iotex(): IotexNetworkState {
    return this.network.map.iotex as IotexNetworkState;
  }

  get isConnect() {
    return !!this.currentNetwork.account;
  }
  get currentNetwork() {
    return this.network.current;
  }
  get currentChain(): ChainState {
    return this.currentNetwork.currentChain;
  }

  get Coin() {
    return this.currentChain.Coin;
  }

  findChain({ chainId }: { chainId: number }) {
    let foundedChain: ChainState;
    _.each(this.network.map, (network, k) => {
      _.each(network.chain.map, (chain, netowrk) => {
        if ((chainId = chain.chainId)) {
          foundedChain = chain;
        }
      });
    });
    if (!foundedChain) {
      throw new Error(`missing chain with chainID ${chainId}`);
    }
    return foundedChain;
  }

  setNetwork(val: Network) {
    this.network.setCurrentId(val);
  }
  setChain(val: number) {
    this.currentNetwork.chain.setCurrentId(val);
  }
  setShowConnecter(value: boolean) {
    // this.currentNetwork.connector.showConnector = value;
    this.eth.connector.showConnector = value;
  }
}
