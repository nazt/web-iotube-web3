import { RootStore } from '@/store/root';
import { makeAutoObservable } from 'mobx';
import { BooleanState } from '@/store/standard/base';
import { AddressState } from '@/store/standard/AddressState';
import { BigNumberInputState } from '@/store/standard/BigNumberInputState';
import { TokenState } from '@/store/lib/TokenState';
import { isAddress as isEthAddress } from '@ethersproject/address';
import { TOKENS } from '@/constants/token/tokens-all';

export class DepositStore {
  rootStore: RootStore;
  isOpenCompleteModal: BooleanState = new BooleanState();
  isOpenConfirmModal: BooleanState = new BooleanState();
  receiverAddress: AddressState = new AddressState();
  amount: BigNumberInputState = new BigNumberInputState({});
  curToken: TokenState | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
  }

  get destToken() {
    if (this.curToken && this.curToken.destAddress) return TOKENS[this.curToken.destAddress]
  }

  get state() {
    if (!this.rootStore.god.currentNetwork.account) {
      return this.rootStore.lang.t('input.wallet.not_connected');
    }

    if (!this.curToken) {
      return this.rootStore.lang.t('input.token.unselected');
    }

    if (!this.rootStore.token.currentCrossChain?.cashier.address) {
      return this.rootStore.lang.t('input.cashier.invalid');
    }

    if (this.rootStore.token.currentCrossChain?.cashier.depositFee.value.comparedTo(this.rootStore.god.currentNetwork.chain.current.Coin.balance.value) > 0) {
      return this.rootStore.lang.t('input.insufficient.depositFee');
    }

    if(isNaN(Number(this.amount.value)) || this.amount.format == null) {
      return this.rootStore.lang.t('input.amount.enter_value');
    }

    if (this.amount.format < 0 || this.amount.value.comparedTo(this.curToken.balance.value) > 0) {
      return this.rootStore.lang.t('input.amount.invalid');
    }

    if (this.amount.value.gt(this.curToken.amountRange.maxAmount.value)) {
      return `Amount must <= ${this.curToken.amountRange.maxAmount.format}`;
    }

    if (this.amount.value.lt(this.curToken.amountRange.minAmount.value)) {
      return `Amount must >= ${this.curToken.amountRange.minAmount.format}`;
    }

    if (!isEthAddress(this.receiverAddress.ethAddress)) {
      return this.rootStore.lang.t('input.crossschainaddress.invalid', { chain: this.rootStore.token.currentCrossChain.chain.name });
    }
    return '';
  }

  get shouldApprove() {
    if (!this.curToken || this.curToken.isEth()) return false;
    console.log('allowance ForCashier ---->', this.curToken.allowanceForCashier.format);
    return this.amount.value.comparedTo(this.curToken.allowanceForCashier.value) > 0;
  }

  cleanAddress() {
    this.receiverAddress.setValue('');
  }
}
