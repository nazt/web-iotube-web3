import { makeAutoObservable } from 'mobx';
import { RootStore } from './root';
import { NumberState, StringState } from './standard/base';
import { CrossChain } from '../../type';
import { TokenState } from '@/store/lib/TokenState';
import BigNumber from 'bignumber.js';


export class TokenStore {
  rootStore: RootStore;
  toNetwork = new NumberState({ value: 56 });
  actionHash: StringState;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
  }

  get god() {
    return this.rootStore.god;
  }

  get currentCrossChain(): CrossChain {
    console.log(this.currentChain.crossChain[Object.keys(this.currentChain.crossChain)[0]]);
    return this.currentChain.crossChain[this.toNetwork.value] || this.currentChain.crossChain[Object.keys(this.currentChain.crossChain)[0]];
  }

  get currentNetwork() {
    return this.god.currentNetwork;
  }

  get currentChain() {
    return this.god.currentNetwork.currentChain;
  }

  get currentTokens() {
    return this.currentCrossChain.tokens;
  }

  async depositTo(args, opts) {
    if (!this.currentCrossChain.cashier.address) return;
    return await this.currentCrossChain.cashier.depositTo({ params: args, options: opts });
  }

  async approve(amountVal: BigNumber, curToken: TokenState) {
    if (!this.god.currentNetwork.account) return;
    console.log(curToken);
    return await curToken.approve({ params: [this.currentNetwork.account, amountVal.toFixed()] });
  }


  async loadPrivateData() {
    if (!this.god.currentNetwork.account) return;
    console.log(Object.values(this.currentChain.crossChain).map(i => i.cashier));
    await this.currentNetwork.multicall([
      ...this.currentTokens.filter((i) => !i.isEth()).map((i) =>
        i.preMulticall({
          method: 'balanceOf',
          params: [this.currentNetwork.account],
          handler: i.balance
        })
      ),
      ...this.currentTokens.filter((i) => !i.isEth()).map((i) => i.preMulticall({
        method: 'allowance',
        params: [this.currentNetwork.account, this.currentCrossChain.cashier.address],
        handler: i.allowanceForCashier
      })),
      ...this.currentTokens.filter((i) => !i.isEth()).map((i) => this.currentCrossChain.tokenList.preMulticallMintable({
        method: 'minAmount',
        params: [i.address],
        handler: i.minAmountMintable
      })),
      ...this.currentTokens.filter((i) => !i.isEth()).map((i) => this.currentCrossChain.tokenList.preMulticallMintable({
        method: 'maxAmount',
        params: [i.address],
        handler: i.maxAmountMintable
      })),
      ...this.currentTokens.filter((i) => !i.isEth()).map((i) => this.currentCrossChain.tokenList.preMulticallStandard({
        method: 'minAmount',
        params: [i.address],
        handler: i.minAmountStandard
      })),
      ...this.currentTokens.filter((i) => !i.isEth()).map((i) => this.currentCrossChain.tokenList.preMulticallStandard({
        method: 'maxAmount',
        params: [i.address],
        handler: i.maxAmountStandard
      })),

      ...Object.values(this.currentChain.crossChain).map((i) =>
        i.cashier.preMulticall({
          method: 'depositFee',
          handler: i.cashier.depositFee
        })
      ),
    ]);

    this.currentTokens.filter((i) => i.isEth()).map((i) => {
      i.balance = this.god.currentNetwork.chain.current.Coin.balance;
    });
  }

  async loadDepositFee() {
    if (!this.god.isIotxNetork) return;
    if (!this.god.currentNetwork.account) return;
    await this.currentNetwork.multicall([
      ...Object.values(this.currentChain.crossChain).map((i) =>
        i.cashier.preMulticall({ method: 'depositFee', params: [this.currentNetwork.account], handler: i, read: true })
      )
    ]);
  }
}
