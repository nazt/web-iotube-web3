import { ChainState } from './src/store/lib/ChainState';
import { CashierState } from './src/store/lib/CashierState';
import { TokenState } from './src/store/lib/TokenState';
import { TokenListState } from '@/store/lib/TokenListState';
import { CCTokenState } from '@/store/lib/CCTokenState';
export interface CallParams<P = any[]> {
  address: string;
  abi: any;
  method: string;
  params?: P;
  options?: Partial<{
    value: string;
    gasLimit: string;
    gasPrice: string;
  }>;
  handler?: any;
  read?: boolean;
}

export interface CrossChain {
  chain: ChainState;
  cashier: CashierState;
  tokenList: TokenListState;
  tokens: TokenState[];
}

export interface CCSwapTokensPairs {
  wTokens: TokenState[];
  ccTokens: CCTokenState[];
}
