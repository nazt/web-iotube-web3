import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import {
  ethTokensForKovenIotex,
  iotexTokensForKoven,
  iotexTokensForKovenWeb3
} from '@/constants/token/eth-iotex-koven';
import { BSCTestnetConfig } from './BSCTestnetConfig';
import { CashierState } from '@/store/lib/CashierState';
import { ethTokensForKovenBsc } from '@/constants/token/eth-bsc-koven';
import { TokenListState } from '@/store/lib/TokenListState';
import { ETHKovanConfig } from './ETHKovanConfig';

export const IotexTestnetConfig = new ChainState({
  name: 'IoTex',
  chainId: 4690,
  logoUrl: '/images/iotex.svg',
  rpcUrl: `https://babel-api.testnet.iotex.io`,
  explorerURL: 'https://testnest.iotexscan.io',
  explorerName: 'IotexScan',
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 5,
    multicallAddr: '0xe980c6BC4ff99e3E8431b680a58344B8e0170bE0'
  },
  crossChain: {}
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
