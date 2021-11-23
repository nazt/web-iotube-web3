import { makeAutoObservable } from 'mobx';
import { ActionState } from '@/store/lib/ActionState';
import axios from 'axios';
import { BigNumberState } from '@/store/standard/BigNumberState';
import { TOKENS } from '@/constants/token/tokens-all';
import BigNumber from 'bignumber.js';
import { NumberState, StringState } from '@/store/standard/base';
import { ChainState } from '@/store/lib/ChainState';
import { CashierConfig } from '../../config/CashierConfig';
import { TokenState } from '@/store/lib/TokenState';

export class ActionListState {
  requestApi: string;
  key: string;
  chainId: number;
  name: string;
  tokensOnNetwork: any;
  first: NumberState = new NumberState({value:10});
  skip: NumberState = new NumberState({value:0});
  actions: ActionState[] = [];
  count: number = 0;
  networkConfig: ChainState;
  allTokens = {};re
  sender: StringState = new StringState();
  recipient: StringState = new StringState();
  token: StringState = new StringState();
  status: NumberState = new NumberState({value: 100});

  constructor(args: Partial<ActionListState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.initActions();
    Object.keys(TOKENS).map((item, i) => {
      const itemLowerCase = item.toLowerCase();
      this.allTokens[itemLowerCase] = Object.values(TOKENS)[i];
    });
  }

  get currentPage() {
    return this.skip.value / this.first.value + 1
  }

  get currentPageSize() {
    return this.first.value
  }

  decodeBase64toHexAddress(content: string): string {
    return '0x' + this.decodeToHex(content);
  }

  decodeToHex(content: string): string {
    return Buffer.from(String(content), 'base64').toString('hex');
  }

  encodeHexAddresstoBase64(content: string): string {
    return Buffer.from(String(content.split('0x')[1]), 'hex').toString('base64');
  }

  async initActions() {
    console.log('ActionStore::initAction');
    const { status, data } = await axios.post(
      this.requestApi,
      {
        sender: this.encodeHexAddresstoBase64(this.sender.value),
        recipient: this.encodeHexAddresstoBase64(this.recipient.value),
        token: this.encodeHexAddresstoBase64(this.token.value),
        first: this.first.value,
        skip: this.skip.value,
        status: this.status.value != 100? this.status.value: null
      },

      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

    if (status && data && data.transfers) {
      this.actions = data.transfers.map((item, i) => {
        let tokenAddress = this.decodeBase64toHexAddress(item.token);
        let cashier = this.decodeBase64toHexAddress(item.cashier).toLowerCase();
        const fromNetwork = CashierConfig[this.key][cashier];
        const toNetwork = this.networkConfig;
        if (tokenAddress == '0x0000000000000000000000000000000000000000') {
          tokenAddress = `${tokenAddress}-${fromNetwork.name.toLowerCase()}`
        }
        const token = this.allTokens[tokenAddress.toLowerCase()];
        return {
          ...item,
          ...data.statuses[i],
          cashier: cashier,
          sender: this.decodeBase64toHexAddress(item.sender),
          recipient: this.decodeBase64toHexAddress(item.recipient),
          txHash: this.decodeBase64toHexAddress(data.statuses[i].txHash),
          fromNetwork: fromNetwork,
          toNetwork: toNetwork,
          status: data.statuses[i].status,
          token: {
            ...token,
            address: tokenAddress
          },
          amount: new BigNumberState({
            value: new BigNumber(item.amount),
            loading: false,
            decimals: token?.decimals
          }),
          fee: new BigNumberState({
            value: new BigNumber(item.fee),
            loading: false
          })
        } as unknown as ActionState;
      });
      this.count = data.count ? data.count : 0;
      console.log(`${this.name} actions===>`, this.actions);
    }
  }
}
