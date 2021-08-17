import { BSCMainnetConfig } from './BSCMainnetConfig';
import { MappingState } from '@/store/standard/MappingState';
import { EthNetworkState } from '../store/lib/EthNetworkState';
import { ETHKovanConfig } from './ETHKovanConfig';
import { ETHMainnetConfig } from './ETHMainnetConfig';
import { BSCTestnetConfig } from './BSCTestnetConfig';
import { IotexNetworkState } from '../store/lib/IotexNetworkState';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { PolygonMainnetConfig } from './PolygonMainnetConfig';
import { IotexTestnetConfig } from './IotexTestnetConfig';

export const EthNetworkConfig = new EthNetworkState({
  allowChains: [BSCMainnetConfig.chainId, ETHMainnetConfig.chainId, IotexMainnetConfig.chainId, PolygonMainnetConfig.chainId],
  info: {
    token: {
      tokenExample: '0x0000000000000000000000000000000000000000'
    }
  },
  chain: new MappingState({
    currentId: ETHKovanConfig.chainId,
    map: {
      [ETHMainnetConfig.chainId]: ETHMainnetConfig,
      [ETHKovanConfig.chainId]: ETHKovanConfig,
      [BSCMainnetConfig.chainId]: BSCMainnetConfig,
      [BSCTestnetConfig.chainId]: BSCTestnetConfig,
      [IotexMainnetConfig.chainId]: IotexMainnetConfig,
      [IotexTestnetConfig.chainId]: IotexTestnetConfig,
      [PolygonMainnetConfig.chainId]: PolygonMainnetConfig,
    }
  })
});

export const IotexNetworkConfig = new IotexNetworkState({
  allowChains: [IotexMainnetConfig.chainId],
  info: {
    token: {
      tokenExample: 'io000000000000000000000000000000000000000'
    }
  },
  chain: new MappingState({
    currentId: IotexMainnetConfig.chainId,
    map: {
      [IotexMainnetConfig.chainId]: IotexMainnetConfig
    }
  })
});
