import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/store/root';
import iotexAllToken from '../../public/tokenlist/tube-iotex-tokens.json';
import { TokenState } from '@/store/lib/TokenState';
import { Contract, ethers } from 'ethers';
import erc20Abi from '@/constants/abi/erc20.json';
import BigNumber from 'bignumber.js';

export class WalletsStore {
  rootStore: RootStore;
  // iotexBabelProvider = new ethers.providers.JsonRpcProvider("https://babel-api.mainnet.iotex.io/");
  iotexBabelProvider = new ethers.providers.JsonRpcProvider("https://babel-151-read.onrender.com");
  iotexBabelSigner = this.iotexBabelProvider.getSigner()

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
  }

  get iotexAllToken() {
    const tokens = iotexAllToken.tokens.map((i) => {
      const token = new TokenState(i);
      token.network = this.rootStore.god.currentNetwork
      return token;
    });
    return tokens;
  }

  async loadTokensBalance(account: string) {
    this.iotexAllToken.filter((i) => !i.isEth()).map((i) => {
      new Contract(i.address, erc20Abi, this.iotexBabelProvider).balanceOf(account).then((balance: any) => {
        i.balance.setValue(new BigNumber(balance.toString()));
      });
    });
  }

}
