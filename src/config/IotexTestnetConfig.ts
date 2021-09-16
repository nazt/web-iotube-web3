import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { iotexTokensForKovenWeb3 } from '@/constants/token/eth-iotex-koven';
import { CashierState } from '@/store/lib/CashierState';
import { TokenListState } from '@/store/lib/TokenListState';
import { ETHKovanConfig } from './ETHKovanConfig';

export const IotexTestnetConfig = new ChainState({
  name: 'IoTeX Test',
  chainId: 4690,
  logoUrl: '/images/chain/iotex.svg',
  rpcUrl: `https://babel-api.testnet.iotex.io`,
  explorerURL: 'https://testnest.iotexscan.io',
  explorerName: 'IotexScan',
  Coin: new TokenState({
    symbol: 'IOTX',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoURI: '/images/chain/iotex.svg',
  }),
  nativeCurrency: new TokenState({
    id: 'iotex',
    name: 'IOTX',
    symbol: 'IOTX',
    decimals: 18,
    logoURI: '/images/chain/iotex.svg',
  }),
  info: {
    blockPerSeconds: 5,
    multicallAddr: '0xe980c6BC4ff99e3E8431b680a58344B8e0170bE0'
  },
  confirmationTimes: 1,
  crossChain: {},
  ccSwapRouter: '',
  ccSwapTokensPairs: {}
});

// IotexTestnetConfig.crossChain[42].tokens = iotexTokensForKoven.tokens.map(i => new TokenState(i))
export const iotexTestnetCrossChain = (network) => {
  return {
    [ETHKovanConfig.chainId]: {
      chain: ETHKovanConfig,
      cashier: new CashierState({
        address: iotexTokensForKovenWeb3.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: iotexTokensForKovenWeb3.mintableTokenList,
        standardAddress: iotexTokensForKovenWeb3.standardTokenList,
        network: network
      }),
      tokens: iotexTokensForKovenWeb3.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  };
};
