import { makeAutoObservable, values } from 'mobx';
import { ActionState } from '@/store/lib/ActionState';
import axios from 'axios';
import { BigNumberState } from '@/store/standard/BigNumberState';
import { TOKENS } from '@/constants/token/tokens-all';
import BigNumber from 'bignumber.js';
import { NumberState } from '@/store/standard/base';

export class ActionListState {
  requestApi: string;
  name: string;
  first: NumberState = new NumberState({value:10});
  skip: NumberState = new NumberState({value:0});
  actions: ActionState[] = [];

  constructor(args: Partial<ActionListState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.initActions();
  }

  decodeBase64toHexAddress(content: string): string {
    return '0x' + Buffer.from(String(content), 'base64').toString('hex');
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
      // const data = {
      //   'transfers': [
      //     {
      //       'cashier': 'eX8UZXlv2J6nE15228fNsTa7oco=',
      //       'token': 'TXuIQDqi9QK/KJWEFg2wHKRCQmw=',
      //       'index': '1609',
      //       'sender': 'B5X+WEA+Q9JR0f/L98txa0zZea8=',
      //       'recipient': 'XvquCQE2BZVN1nUvmjs66Nk8yyE=',
      //       'amount': '3000000000000000000'
      //     }
      //   ],
      //   'statuses': [
      //     {
      //       'key': 'ryp/r30fz7Au5CktTZpqP8kgCPOsJu925UeNPtpijoY=',
      //       'witnesses': [
      //         'Hq8u8XSSaB4ZPi4v2pl8fdjePgE=',
      //         'e03qacEB8u8zk6P8welC8yzO7QE=',
      //         '0yC4qX2fI6+TAcvRJ4vLoJb553Q='
      //       ],
      //       'txHash': 'X2anPy6n4iM+6mGI8AR070n6TV/wHy5OrwJk5ES57C8=',
      //       'status': 'SETTLED'
      //     }
      //   ]
      // };
      this.actions = data.transfers.map((item, i) => {
        return {
          ...item,
          ...data.statuses[i],
          token: {
            ...TOKENS[this.decodeBase64toHexAddress(item.token)],
            address: this.decodeBase64toHexAddress(item.token)
          },
          amount: new BigNumberState({
            value: new BigNumber(item.amount),
            loading: false,
            decimals: TOKENS[this.decodeBase64toHexAddress(item.token)].decimals
          })
        } as unknown as ActionState;
      });
      console.log(`${this.name} actions===>`, this.actions);
    }
  }
}
