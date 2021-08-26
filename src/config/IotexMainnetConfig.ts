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
import { TubeState } from '@/store/lib/TubeState';
import { TubeRouterState } from '@/store/lib/TubeRouterState';
import { IotexTestnetConfig } from './IotexTestnetConfig';

export const IotexMainnetConfig = new ChainState({
  name: 'IoTeX',
  chainId: 4689,
  logoUrl: '/images/chain/iotex.svg',
  rpcUrl: 'https://babel-api.mainnet.iotex.io/',
  explorerURL: 'https://iotexscan.io',
  explorerName: 'IoTeX Scan',
  info: {
    blockPerSeconds: 5,
    multicallAddr: '0xacce294bf7d25fe8c5c64ae45197d3878f68403b'
  },
  nativeCurrency: new TokenState({
    id: 'iotex',
    name: 'IOTX',
    symbol: 'IOTX',
    decimals: 18,
    logoURI: '/images/chain/iotex.svg',
  }),
  router: "0x0F814827f651bCBf4971975F6eb55B2b6C5BCb4F",
  tokensForCC: [new TokenState({
    'address': '0xa00744882684c3e4747faefd68d283ea44099d03',
    'name': 'Wrapped IOTX',
    'decimals': 18,
    'symbol': 'WIOTX',
    'logoURI': 'https://iotexproject.iotex.io/iotex-token-metadata/master/images/io15qr5fzpxsnp7garl4m7k355rafzqn8grrm0grz.png'
  })],
  ccToken: new TokenState({
    name: 'Crosschain IOTX',
    symbol: 'CIOTX',
    address: '0x99B2B0eFb56E62E36960c20cD5ca8eC6ABD5557A',
    decimals: 18,
    logoURI: '/images/tokens/ctoken_logo.jpeg'
  }),
  Coin: new TokenState({
    symbol: 'IOTX',
    address: '0x0000000000000000000000000000000000000000',
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
