import { makeAutoObservable } from 'mobx';
import { RootStore } from './root';
import { NumberState, StringState } from './standard/base';
import { CrossChain } from '../../type';
import { TokenState } from '@/store/lib/TokenState';
import { IotexMainnetConfig } from '../config/IotexMainnetConfig';
import { Contract } from 'ethers';
import erc20Abi from '@/constants/abi/erc20.json';
import { ETHMainnetConfig } from '../config/ETHMainnetConfig';
import BigNumber from 'bignumber.js';
import { SafeAddressConfig } from '../config/SafeAddressConfig';
import { IotexTestnetConfig } from '../config/IotexTestnetConfig';
import { CashierRouterState } from '@/store/lib/CashierRouterState';
import { polygonToIotexTokens } from '@/constants/token/matic-iotex';


export class TokenStore {
  rootStore: RootStore;
  toNetwork = new NumberState({ value: 56 });
  actionHash: StringState = new StringState();
  curToken: TokenState;

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
    return this.currentChain.crossChain[this.toNetwork.value] || this.currentChain.crossChain[Object.keys(this.currentChain.crossChain)[0]];
  }

  get currentNetwork() {
    return this.god.currentNetwork;
  }

  get currentChain() {
    return this.god.currentNetwork.currentChain;
  }

  get currentTokens() {
    return this.currentCrossChain?.tokens;
  }

  async depositTo(args, opts) {
    if (this.curToken.router) {
      const cashierRouter = new CashierRouterState({
        address: polygonToIotexTokens.cashier,
        network: this.curToken.network
      });
      return await cashierRouter.depositTo({ params: args, options: opts });
    }
    if (!this.currentCrossChain.cashier.address) return;
    return await this.currentCrossChain.cashier.depositTo({ params: args, options: opts });
  }

  async approve(amountVal: BigNumber, curToken: TokenState) {
    if (!this.god.currentNetwork.account) return;
    if (this.curToken.router) {
      return await curToken.approve({ params: [this.curToken.router, amountVal] })
    }
    return await curToken.approve({ params: [this.currentCrossChain.cashier.address, amountVal] });
  }


  async loadPrivateData() {
    if (!this.god.currentNetwork.account) return;
    await this.currentNetwork.multicall([
      ...this.currentTokens.filter((i) => !i.isEth()).map((i) =>
        i.preMulticall({
          method: 'balanceOf',
          params: [this.currentNetwork.account],
          handler: i.balance
        })
      ),
      ...this.currentTokens.filter((i) => !i.isEth() || !i.router).map((i) => i.preMulticall({
        method: 'allowance',
        params: [this.currentNetwork.account, this.currentCrossChain.cashier.address],
        handler: i.allowanceForCashier
      })),
      ...this.currentTokens.filter((i) => i.router).map((i) => i.preMulticall({
        method: 'allowance',
        params: [this.currentNetwork.account, i.router],
        handler: i.allowanceForCashier
      })),
      ...this.currentTokens.filter((i) => !i.isEth() || !i.router).map((i) => this.currentCrossChain.tokenList.preMulticallMintable({
        method: 'minAmount',
        params: [i.address],
        handler: i.minAmountMintable
      })),
      ...this.currentTokens.filter((i) => !i.isEth() || !i.router).map((i) => this.currentCrossChain.tokenList.preMulticallMintable({
        method: 'maxAmount',
        params: [i.address],
        handler: i.maxAmountMintable
      })),
      ...this.currentTokens.filter((i) => !i.isEth() || !i.router).map((i) => this.currentCrossChain.tokenList.preMulticallStandard({
        method: 'minAmount',
        params: [i.address],
        handler: i.minAmountStandard
      })),
      ...this.currentTokens.filter((i) => !i.isEth() || !i.router).map((i) => this.currentCrossChain.tokenList.preMulticallStandard({
        method: 'maxAmount',
        params: [i.address],
        handler: i.maxAmountStandard
      })),
      ...this.currentTokens.filter((i) => i.router).map((i) => this.currentCrossChain.tokenList.preMulticallMintable({
        method: 'minAmount',
        params: [i.cTokenAddress],
        handler: i.minAmountMintable
      })),
      ...this.currentTokens.filter((i) => i.router).map((i) => this.currentCrossChain.tokenList.preMulticallMintable({
        method: 'maxAmount',
        params: [i.cTokenAddress],
        handler: i.maxAmountMintable
      })),
      ...this.currentTokens.filter((i) => i.router).map((i) => this.currentCrossChain.tokenList.preMulticallStandard({
        method: 'minAmount',
        params: [i.cTokenAddress],
        handler: i.minAmountStandard
      })),
      ...this.currentTokens.filter((i) => i.router).map((i) => this.currentCrossChain.tokenList.preMulticallStandard({
        method: 'maxAmount',
        params: [i.cTokenAddress],
        handler: i.maxAmountStandard
      }))
    ]);
    const wrappedToken = this.currentTokens.filter(i => i.isWrapped);
    this.currentTokens.filter((i) => i.isEth()).map((i) => {
      i.balance = this.god.currentNetwork.chain.current.Coin.balance;
      if (wrappedToken.length == 1) {
        i.minAmountMintable = wrappedToken[0].minAmountMintable;
        i.maxAmountMintable = wrappedToken[0].maxAmountMintable;
        i.minAmountStandard = wrappedToken[0].minAmountStandard;
        i.maxAmountStandard = wrappedToken[0].maxAmountStandard;
      }
    });
    this.loadIotexDepositFee();
    this.loadERC20SafeBalanceForCoinRange();
  }

  async loadIotexDepositFee() {
    if (this.currentChain.name !== IotexMainnetConfig.name) return false;
    await this.currentNetwork.multicall([
      ...Object.values(this.currentChain.crossChain).map((i) =>
        i.cashier.preMulticall({
          method: 'depositFee',
          handler: i.cashier.depositFee
        })
      )
    ]);
  }


  async loadCCSourceToken() {
    if (!this.currentChain.ccSwapTokensPairs) return false;
    await this.currentNetwork.multicall([
      ...this.currentChain.ccSwapTokensPairs.ccTokens.map((i) =>
        i.preMulticall({
          method: 'balanceOf',
          params: [this.currentNetwork.account],
          handler: i.balance
        }),
      ),
      ...this.currentChain.ccSwapTokensPairs.wTokens.map((i) =>
        i.preMulticall({
          method: 'balanceOf',
          params: [this.currentNetwork.account],
          handler: i.balance
        }),
      ),
      ...this.currentChain.ccSwapTokensPairs.wTokens.map((item, i) =>
        item.preMulticall({
          method: 'allowance',
          params: [this.currentNetwork.account, this.currentChain.ccSwapTokensPairs.ccTokens[i].address],
          handler: item.allowanceForSwap
        }),
      )
    ]);

    if ([IotexTestnetConfig.chainId, IotexMainnetConfig.chainId].includes(this.currentChain.chainId)) {
      await this.currentNetwork.multicall([
        ...this.currentChain.ccSwapTokensPairs.ccTokens.map((item, i) =>
          item.preMulticall({
            method: 'allowance',
            params: [this.currentNetwork.account, this.currentChain.ccSwapRouter],
            handler: item.allowanceForSwap
          }),
        ),
      ]);
    }
  }

  async loadERC20SafeBalanceForCoinRange() {

    if (this.currentChain.name == IotexMainnetConfig.name && this.currentCrossChain?.chain.name == ETHMainnetConfig.name) {
      new Contract(SafeAddressConfig.IOTXETokenAddress, erc20Abi, this.rootStore.god.etherMap.eth).balanceOf(SafeAddressConfig.IOTXESafeAddress).then((balance: any) => {
        this.currentTokens.filter(i => i.address == '0x0000000000000000000000000000000000000000').map(i => i.maxAmountMintable.setValue(new BigNumber(balance.toString())));
      });
    }

    if (this.currentChain.name == ETHMainnetConfig.name && this.currentCrossChain?.chain.name == IotexMainnetConfig.name) {
      new Contract(SafeAddressConfig.WIOTXAddress, erc20Abi, this.rootStore.god.etherMap.iotex).balanceOf(SafeAddressConfig.IOTXSafeAddress).then((balance: any) => {
        this.currentTokens.filter(i => i.address == SafeAddressConfig.IOTXETokenAddress).map(i => i.maxAmountMintable.setValue(new BigNumber(balance.toString())));
      });
    }
  }
}
