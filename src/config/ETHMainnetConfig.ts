import { publicConfig } from './public';
import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { ethTokensForIotex, iotexTokensForEth } from '@/constants/token/eth-iotex';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { CashierState } from '@/store/lib/CashierState';
import { TokenListState } from '@/store/lib/TokenListState';
import { ethCCSwapPairs } from '@/constants/ccToken/eth-pairs';
import { CCTokenState } from '@/store/lib/CCTokenState';

export const ETHMainnetConfig = new ChainState({
  name: 'ETH',
  chainId: 1,
  logoUrl: '/images/chain/eth.svg',
  rpcUrl: `https://mainnet.infura.io/v3/${publicConfig.infuraId}`,
  explorerURL: 'https://etherscan.io',
  explorerName: 'EtherScan',
  nativeCurrency: new TokenState({
    id: 'ethereum',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: ''
  }),
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441'
  },
  ccSwapTokensPairs: {},
  crossChain: {}
});

export const ethCrossChain = (network) => {
  return {
    [IotexMainnetConfig.chainId]: {
      chain: IotexMainnetConfig,
      cashier: new CashierState({
        address: ethTokensForIotex.cashier,
        network: network
      }),
      tokenList: new TokenListState({
        mintableAddress: ethTokensForIotex.mintableTokenList,
        standardAddress: ethTokensForIotex.standardTokenList,
        network: network
      }),
      tokens: ethTokensForIotex.tokens.map(i => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  };
};



