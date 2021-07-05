import { makeAutoObservable, values } from 'mobx';
import { ActionState } from '@/store/lib/ActionState';
import axios from 'axios';
import { BigNumberState } from '@/store/standard/BigNumberState';
import { NETWORK, TOKENS } from '@/constants/token/tokens-all';
import BigNumber from 'bignumber.js';
import { NumberState } from '@/store/standard/base';

export class ActionListState {
  requestApi: string;
  key: string;
  chainId: number;
  name: string;
  first: NumberState = new NumberState({value:10});
  skip: NumberState = new NumberState({value:0});
  actions: ActionState[] = [];
  count: number = 0;
  allTokens = {};

  constructor(args: Partial<ActionListState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.initActions();
    Object.keys(TOKENS).map((item, i) => {
      const itemLowerCase = item.toLowerCase();
      this.allTokens[itemLowerCase] = Object.values(TOKENS)[i];
    });
  }

  decodeBase64toHexAddress(content: string): string {
    return '0x' + this.decodeToHex(content);
  }

  decodeToHex(content: string): string {
    return Buffer.from(String(content), 'base64').toString('hex');
  }

  async initActions() {
    console.log('ActionStore::initAction');
    const { status, data } = await axios.post(
      this.requestApi,
      {
        first: this.first.value,
        skip: this.skip.value
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
        let network = NETWORK[this.decodeToHex(item.cashier)];
        if (tokenAddress == '0x0000000000000000000000000000000000000000') {
          tokenAddress = `${tokenAddress}-${network?network:item.key}`
        }
        const token = this.allTokens[tokenAddress.toLowerCase()];
        return {
          ...item,
          ...data.statuses[i],
          cashier: this.decodeToHex(item.cashier),
          sender: this.decodeBase64toHexAddress(item.sender),
          recipient: this.decodeBase64toHexAddress(item.recipient),
          txHash: this.decodeToHex(item.txHash),
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
            loading: false,
            decimals: token?.decimals
          })
        } as unknown as ActionState;
      });
      this.count = data.count ? data.count : 0;
      console.log(`${this.name} actions===>`, this.actions);
    }
  }
}
