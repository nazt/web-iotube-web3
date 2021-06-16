import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { polygonToIotexTokens } from '@/constants/token/matic-iotex';
import { CashierState } from '@/store/lib/CashierState';
import { TokenListState } from '@/store/lib/TokenListState';

export const PolygonMainnetConfig = new ChainState({
  name: 'Polygon',
  chainId: 137,
  logoUrl: '/images/polygon_logo.png',
  rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  explorerURL: 'https://polygon-explorer-mainnet.chainstacklabs.com',
  explorerName: 'Polygon Explorer',
  Coin: new TokenState({
    symbol: 'MATIC',
    decimals: 18
  }),
  nativeCurrency: new TokenState({
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/4713/large/matic___polygon.jpg?1612939050',
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0xa0FD7430852361931b23a31F84374BA3314e1682'
  },
  crossChain: {}
});


export const polygonMainCrossChain = (network) => {
  return {
    [IotexMainnetConfig.chainId]: {
      chain: IotexMainnetConfig,
      cashier: new CashierState({
        address: polygonToIotexTokens.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: polygonToIotexTokens.mintableTokenList,
        standardAddress: polygonToIotexTokens.standardTokenList,
        network: network
      }),
      tokens: polygonToIotexTokens.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  }
};
