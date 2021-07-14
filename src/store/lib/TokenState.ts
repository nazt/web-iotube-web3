import { makeObservable, observable } from 'mobx';
import { NetworkState } from './NetworkState';
import { BigNumberState } from '../standard/BigNumberState';
import { CallParams } from '../../../type';
import erc20Abi from '@/constants/abi/erc20.json';
import tokenListAbi from '@/constants/abi/tokenlist.json';

export class TokenState {
  abi = erc20Abi;
  id = "";
  tokenListAbi = tokenListAbi;
  name: string;
  symbol: string;
  address: string;
  destAddress: string;
  logoURI: string;
  chainId: number;
  decimals: number = 18;
  network: NetworkState;
  balance: BigNumberState;
  allowanceForCashier: BigNumberState;
  minAmountMintable: BigNumberState;
  maxAmountMintable: BigNumberState;
  minAmountStandard: BigNumberState;
  maxAmountStandard: BigNumberState;
  metas: {
    isApprovingAllowance?: boolean;
    [key: string]: any;
  } = {};
  constructor(args: Partial<TokenState>) {
    Object.assign(this, args);
    this.balance = new BigNumberState({ decimals: this.decimals, loading: true });
    this.allowanceForCashier = new BigNumberState({decimals: this.decimals, loading: false});
    this.minAmountMintable = new BigNumberState({decimals: this.decimals, loading: false});
    this.maxAmountMintable = new BigNumberState({decimals: this.decimals, loading: false});
    this.minAmountStandard = new BigNumberState({decimals: this.decimals, loading: false});
    this.maxAmountStandard = new BigNumberState({decimals: this.decimals, loading: false});
    makeObservable(this, {
      metas: observable
    });
  }

  get amountRange() {
    return {
      minAmount: this.minAmountStandard.format === "0" ? this.minAmountMintable : this.minAmountStandard,
      maxAmount: this.maxAmountStandard.format === "0" ? this.maxAmountMintable : this.maxAmountStandard
    }
  }

  isEth() {
    return this.network.info.token.tokenExample === this.address;
  }

  transfer(args: Partial<CallParams>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'transfer' }, args));
  }
  approve(args: Partial<CallParams>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'approve' }, args));
  }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }

  preMulticallTokenListAbi(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.tokenListAbi }, args);
  }
}
