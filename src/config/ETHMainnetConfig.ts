import { publicCOnfig } from './public';
import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { ethTokensForIotex, iotexTokensForEth } from '@/constants/token/eth-iotex';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { CashierState } from '@/store/lib/CashierState';
import { TokenListState } from '@/store/lib/TokenListState';

export const ETHMainnetConfig = new ChainState({
  name: 'ETH',
  chainId: 1,
  logoUrl: '/images/chain/eth.svg',
  rpcUrl: `https://mainnet.infura.io/v3/${publicCOnfig.infuraId}`,
  explorerURL: 'https://etherscan.io',
  explorerName: 'EtherScan',
  nativeCurrency: new TokenState({
    id: 'ethereum',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: 'https://exchange.pancakeswap.finance/images/coins/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png',
  }),
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441'
  },
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
      tokens: ethTokensForIotex.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
  }
};



