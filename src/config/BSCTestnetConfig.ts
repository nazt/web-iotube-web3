import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';

export const BSCTestnetConfig = new ChainState({
  name: 'BSC',
  logoUrl: '/images/bsc_logo.svg',
  chainId: 97,
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  explorerURL: 'https://testnet.bscscan.com',
  explorerName: 'BscScan',
  Coin: new TokenState({
    symbol: 'BNB',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0xe348b292e8eA5FAB54340656f3D374b259D658b8'
  },
  crossChain: {}
});
