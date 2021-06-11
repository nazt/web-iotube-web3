import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { bscToIotexTokens, iotexBscNetTokens } from '@/constants/token/bsc-iotex';
import { ethTokensForIotex, iotexTokensForEth } from '@/constants/token/eth-iotex';
import { CashierState } from '@/store/lib/CashierState';

export const BSCMainnetConfig = new ChainState({
  name: 'BSC',
  chainId: 56,
  logoUrl: '/images/bsc_logo.svg',
  rpcUrl: 'https://bsc-dataseed.binance.org',
  explorerURL: 'https://bscscan.com',
  explorerName: 'BscScan',
  nativeCurrency: new TokenState({
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
    logoURI: 'https://exchange.pancakeswap.finance/images/coins/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png',
  }),
  Coin: new TokenState({
    symbol: 'BNB',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb'
  },
  crossChain: {}
});


export const bscMainCrossChain = (network) => {
  return {
    [IotexMainnetConfig.chainId]: {
      chain: IotexMainnetConfig,
      // cashier: iotexBscNetTokens.cashier,
      cashier: new CashierState({
        address: iotexBscNetTokens.cashier,
        network: network
      }),
      tokens: bscToIotexTokens.tokens.map((i) => {
        const token = new TokenState(i);
        token.network = network;
        return token;
      })
    }
    // [BSCMainnetConfig.chainId]: {
    //   chain: BSCMainnetConfig,
    //   cashier: iotexBscNetTokens.cashier,
    //   tokens: iotexBscNetTokens.tokens.map((i) => new TokenState(i))
    // }
  }
};
