import { NetworkState } from './lib/NetworkState';
import { makeAutoObservable } from 'mobx';
import { MappingState } from './standard/MappingState';
import { EthNetworkConfig } from '../config/NetworkConfig';
import { ChainState } from './lib/ChainState';
import { EthNetworkState } from './lib/EthNetworkState';
import { IotexNetworkState } from './lib/IotexNetworkState';
import { RootStore } from './root';
import { BooleanState, NumberState } from './standard/base';
import { _ } from '@/lib/lodash';
import { ethCrossChain, ETHMainnetConfig } from '../config/ETHMainnetConfig';
import { iotexMainCrossChain, IotexMainnetConfig } from '../config/IotexMainnetConfig';
import { bscMainCrossChain, BSCMainnetConfig } from '../config/BSCMainnetConfig';
import { polygonMainCrossChain, PolygonMainnetConfig } from '../config/PolygonMainnetConfig';
import { IotexTestnetConfig, iotexTestnetCrossChain } from '../config/IotexTestnetConfig';
import { metamaskUtils } from '@/lib/metaskUtils';
import { ethers } from 'ethers';

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

  etherMap: { [key: string]: ethers.providers.JsonRpcProvider } = {
    eth: new ethers.providers.InfuraProvider("mainnet"),
    iotex: new ethers.providers.JsonRpcProvider(IotexMainnetConfig.rpcUrl),
  };

  updateTicker = new NumberState();

  confirmDialogOpen = new BooleanState({});
  destChain = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
    // EthNetworkConfig.god = this;
    EthNetworkConfig.init();
    BSCMainnetConfig.init();
    PolygonMainnetConfig.init();
    IotexMainnetConfig.init();
    // IotexTestnetConfig.init();

    ETHMainnetConfig.crossChain = ethCrossChain(EthNetworkConfig);
    IotexMainnetConfig.crossChain = iotexMainCrossChain(EthNetworkConfig);
    BSCMainnetConfig.crossChain = bscMainCrossChain(EthNetworkConfig);
    // ETHKovanConfig.crossChain = ethKovenCrossChain(EthNetworkConfig);
    // IotexTestnetConfig.crossChain = iotexTestnetCrossChain(EthNetworkConfig);
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

  get networks() {
    return [BSCMainnetConfig, ETHMainnetConfig, IotexMainnetConfig, PolygonMainnetConfig];
  }

  setDestChain(val) {
    this.destChain = this.currentNetwork.chain.map[val];
    this.confirmDialogOpen.setValue(true);
  }

  confirmDialogClose() {
    this.confirmDialogOpen.setValue(false);
  }
  async onConfirm() {
    await metamaskUtils.setupNetwork({
      chainId: this.destChain.chainId,
      blockExplorerUrls: [this.destChain.explorerURL],
      chainName: this.destChain.name,
      nativeCurrency: {
        decimals: this.destChain.Coin.decimals || 18,
        name: this.destChain.Coin.symbol,
        symbol: this.destChain.Coin.symbol
      },
      rpcUrls: [this.destChain.rpcUrl]
    });
    this.confirmDialogClose();
  }
}
