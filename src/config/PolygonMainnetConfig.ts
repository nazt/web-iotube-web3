import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { maitcToIotexTokens, iotexMaticTokens } from '@/constants/token/matic-iotex';
import { CashierState } from '@/store/lib/CashierState';
import { TokenListState } from '@/store/lib/TokenListState';
import { iotexTokensForEth } from '@/constants/token/eth-iotex';

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
        address: iotexMaticTokens.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: maitcToIotexTokens.mintableTokenList,
        standardAddress: maitcToIotexTokens.standardTokenList,
        network: network
      }),
      tokens: maitcToIotexTokens.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  }
};
