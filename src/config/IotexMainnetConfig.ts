import { TokenState } from '@/store/lib/TokenState';
import { ChainState } from '../store/lib/ChainState';
import { iotexBscNetTokens } from '@/constants/token/bsc-iotex';
import { iotexTokensForEth } from '@/constants/token/eth-iotex';
import { MappingState } from '@/store/standard/MappingState';
import { ETHMainnetConfig } from './ETHMainnetConfig';
import { ETHKovanConfig } from './ETHKovanConfig';
import { CashierState } from '@/store/lib/CashierState';
import { BSCMainnetConfig } from './BSCMainnetConfig';
import { Network } from '@/store/god';
import { TokenListState } from '@/store/lib/TokenListState';
import { ethTokensForKovenBsc } from '@/constants/token/eth-bsc-koven';
import { PolygonMainnetConfig } from './PolygonMainnetConfig';
import { iotexMaticTokens } from '@/constants/token/matic-iotex';

export const IotexMainnetConfig = new ChainState({
  name: 'Iotex',
  chainId: 4689,
  logoUrl: '/images/iotex.svg',
  rpcUrl: 'https://api.iotex.one:443',
  explorerURL: 'https://iotexscan.com',
  explorerName: 'IotexScan',
  info: {
    blockPerSeconds: 5,
    multicallAddr: 'io14n8zjjlh6f0733wxftj9r97ns78ksspmjgzh7e'
  },
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  }),
  crossChain: {}
});

export const iotexMainCrossChain = (network) => {
  return {
    [BSCMainnetConfig.chainId]: {
      chain: BSCMainnetConfig,
      // cashier: iotexBscNetTokens.cashier,
      cashier: new CashierState({
        address: iotexBscNetTokens.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: iotexBscNetTokens.mintableTokenList,
        standardAddress: iotexBscNetTokens.standardTokenList,
        network: network
      }),
      tokens: iotexBscNetTokens.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    },
    [ETHMainnetConfig.chainId]: {
      chain: ETHMainnetConfig,
      // cashier: iotexTokensForEth.cashier,
      cashier: new CashierState({
        address: iotexTokensForEth.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: iotexTokensForEth.mintableTokenList,
        standardAddress: iotexTokensForEth.standardTokenList,
        network: network
      }),
      tokens: iotexTokensForEth.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    },
    [PolygonMainnetConfig.chainId]: {
      chain: PolygonMainnetConfig,
      // cashier: iotexTokensForEth.cashier,
      cashier: new CashierState({
        address: iotexMaticTokens.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: iotexMaticTokens.mintableTokenList,
        standardAddress: iotexMaticTokens.standardTokenList,
        network: network
      }),
      tokens: iotexMaticTokens.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  };
};
