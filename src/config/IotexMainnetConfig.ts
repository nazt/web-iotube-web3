import { TokenState } from '@/store/lib/TokenState';
import { ChainState } from '../store/lib/ChainState';
import { iotexBscNetTokens } from '@/constants/token/bsc-iotex';
import { iotexTokensForEth } from '@/constants/token/eth-iotex';
import { ETHMainnetConfig } from './ETHMainnetConfig';
import { CashierState } from '@/store/lib/CashierState';
import { BSCMainnetConfig } from './BSCMainnetConfig';
import { TokenListState } from '@/store/lib/TokenListState';
import { PolygonMainnetConfig } from './PolygonMainnetConfig';
import { iotexPolygonTokens } from '@/constants/token/matic-iotex';

export const IotexMainnetConfig = new ChainState({
  name: 'Iotex',
  chainId: 4689,
  logoUrl: '/images/iotex.svg',
  rpcUrl: 'https://api.iotex.one:443',
  explorerURL: 'https://iotexscan.com',
  explorerName: 'IotexScan',
  info: {
    blockPerSeconds: 5,
    multicallAddr: '0xacce294bf7d25fe8c5c64ae45197d3878f68403b'
  },
  nativeCurrency: new TokenState({
    id: 'iotex',
    name: 'IOTX',
    symbol: 'IOTX',
    decimals: 18,
    logoURI: 'https://githubproxy.b-cdn.net/iotexproject/iotex-token-metadata/master/images/io15qr5fzpxsnp7garl4m7k355rafzqn8grrm0grz.png',
  }),
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
      cashier: new CashierState({
        address: iotexPolygonTokens.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: iotexPolygonTokens.mintableTokenList,
        standardAddress: iotexPolygonTokens.standardTokenList,
        network: network
      }),
      tokens: iotexPolygonTokens.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  };
};
