import { publicCOnfig } from './public';
import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { BSCTestnetConfig } from './BSCTestnetConfig';
import {ethTokensForKovenBsc} from '@/constants/token/eth-bsc-koven';
import { ethTokensForKovenIotex, iotexTokensForKovenWeb3 } from '@/constants/token/eth-iotex-koven';
import { CashierState } from '@/store/lib/CashierState';
import { IotexTestnetConfig } from './IotexTestnetConfig';
import { TokenListState } from '@/store/lib/TokenListState';

export const ETHKovanConfig = new ChainState({
  name: 'ETH',
  alias: 'Kovan',
  logoUrl: '/images/eth_logo.svg',
  chainId: 42,
  rpcUrl: `https://kovan.infura.io/v3/${publicCOnfig.infuraId}`,
  explorerURL: 'https://kovan.etherscan.io',
  explorerName: 'EtherScan',
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a'
  },
  crossChain: {}
});

export const ethKovenCrossChain = (network) => {
  return {
    [BSCTestnetConfig.chainId]: {
      chain: BSCTestnetConfig,
      cashier: new CashierState({
        address: ethTokensForKovenBsc.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: ethTokensForKovenBsc.mintableTokenList,
        standardAddress: ethTokensForKovenBsc.standardTokenList,
        network: network
      }),
      tokens: ethTokensForKovenBsc.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    },
    [IotexTestnetConfig.chainId]: {
      chain: IotexTestnetConfig,
      cashier: new CashierState({
        address: ethTokensForKovenIotex.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: ethTokensForKovenIotex.mintableTokenList,
        standardAddress: ethTokensForKovenIotex.standardTokenList,
        network: network
      }),
      tokens: ethTokensForKovenIotex.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  }
};
