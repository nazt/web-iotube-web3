import { RootStore } from '@/store/root';
import { makeAutoObservable } from 'mobx';
import { BooleanState, StringState } from '@/store/standard/base';
import { AddressState } from '@/store/standard/AddressState';
import { BigNumberInputState } from '@/store/standard/BigNumberInputState';
import { TokenState } from '@/store/lib/TokenState';
import { isAddress as isEthAddress } from '@ethersproject/address';
import { TOKENS } from '@/constants/token/tokens-all';
import { StorageState } from '@/store/standard/StorageState';
import { TubeState } from '@/store/lib/TubeState';
import { TubeRouterState } from '@/store/lib/TubeRouterState';

export class DepositStore {
  rootStore: RootStore;
  isOpenCompleteModal: BooleanState = new BooleanState();
  isOpenConfirmModal: BooleanState = new BooleanState();
  isAutoRelay: BooleanState = new BooleanState();
  receiverAddress: AddressState = new AddressState();
  amount: BigNumberInputState = new BigNumberInputState({});
  _curToken: TokenState | null = null;
  tubeState: TubeState | null = null;
  tubeRouterState: TubeRouterState | null = null;
  historyActions:StorageState<Record<string, any>> = new StorageState({key:'localstorage_history_actions'})
  actionState:StringState =  new StringState()
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
  }

  get curToken(): TokenState {
    return this._curToken
  }

  set curToken(token: TokenState) {
    this._curToken = token;
    this.tubeState = new TubeState({
      address: token.address,
      network: token.network
    });
    this.tubeRouterState = new TubeRouterState({
      address: token.address,
      network: token.network
    })
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
      return this.rootStore.lang.t('input.insufficient.depositFee',{fee:this.rootStore.token.currentCrossChain?.cashier.depositFee.format});
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

  saveAction(res) {
    let actions = this.historyActions.value;
    const detail = {
      summary: `Deposit ${this.amount.format} ${this.curToken?.symbol} to ${this.amount.format} ${this.destToken?.symbol} on ${this.rootStore.token.currentCrossChain?.chain.name}`,
      from: res.from,
      addedTime: Date.parse(new Date().toString())
    }
    console.log(actions,res.chainId)
    if (actions && actions[res.chainId]) {
      actions[res.chainId][res.hash] = detail
    } else {
      actions = {
        [res.chainId]: {
          [res.hash]: detail
        }
      }
    }
    this.historyActions.save(actions)
    this.actionState.setValue('saved')
  }

  updateAction(receipt){
    const historyActions = this.historyActions.value
    const current = historyActions&&historyActions[this.rootStore.god.currentChain.chainId]&&historyActions[this.rootStore.god.currentChain.chainId][receipt.transactionHash];
    if (current){
      current.receipt = receipt;
      this.historyActions.save(historyActions)
      this.actionState.setValue('updated')
    }
  }

  get curChainHistoryActions(){
    console.log(this.historyActions.value)
    return (this.historyActions.value&&this.historyActions.value[this.rootStore.god.currentChain.chainId])||{}
  }

  async withdraw(args, opts) {
    return await this.tubeState.withdraw({ params: args, options: opts });
  }

  async depositTo(args, opts) {
    if (this.isAutoRelay.value) {
      return await this.tubeState.depositTo({ params: args, options: opts })
    } else {
      return await this.tubeRouterState.depositTo({ params: args, options: opts })
    }
  }
}
