import { ChainState } from './ChainState';
import { MappingState } from '../standard/MappingState';
import { StorageState } from '../standard/StorageState';
import { TransactionResponse } from '@ethersproject/providers';
import { GodStore } from '../god';
import { CallParams } from '../../../type';

export interface NetworkState {
  god: GodStore;
  chain: MappingState<ChainState>;
  allowChains: number[];
  account: string;
  connector: { latestProvider: StorageState<string>; showConnector: boolean };
  walletInfo: { visible: boolean };
  currentChain: ChainState;
  info: {
    [key: string]: any;
  };

  init: Function;
  multicall(calls: Partial<CallParams>[]): Promise<any[]>;
  loadBalance: () => Promise<void>;
  execContract(call: { address: string; abi: any; method: string; params?: any[]; options?: any, read?: boolean}): Promise<Partial<TransactionResponse>>;
  isAddressaVailable(address: string): boolean;
}
