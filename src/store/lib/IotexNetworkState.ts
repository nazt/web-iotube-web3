import { NetworkState } from './NetworkState';
import { makeAutoObservable } from 'mobx';
import Antenna from 'iotex-antenna';
import { IotexMulticall } from '../../lib/multicall';
import { MappingState } from '../standard/MappingState';
import { ChainState } from './ChainState';
import { StorageState } from '../standard/StorageState';
import BigNumber from 'bignumber.js';
import { WsSignerPlugin } from 'iotex-antenna/lib/plugin/ws';
import { validateAddress } from 'iotex-antenna/lib/account/utils';
import { TransactionResponse } from '@ethersproject/providers';
import { Contract } from 'iotex-antenna/lib/contract/contract';
import retry from 'promise-retry';
import { GodStore } from '../god';
import { CallParams } from '../../../type';

export enum IotexConnector {
  IopayDesktop = 'iopay-desktop',
  IopayExtension = 'iopay-extension'
}

export class IotexNetworkState implements NetworkState {
  god: GodStore;
  //contract
  chain: MappingState<ChainState>;
  account: string = '';
  antenna?: Antenna;
  multiCall: IotexMulticall;
  allowChains: number[];

  info = {};

  connector = {
    latestProvider: new StorageState({ key: 'latestIotexProvider' }),
    showConnector: false
  };
  walletInfo = {
    visible: false
  };
  get currentChain() {
    return this.chain.current;
  }
  constructor(args: Partial<IotexNetworkState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  init() {
    Object.values(this.chain.map).forEach((chain) => {
      chain.network = this;
      chain.init();
    });
  }

  async loadBalance() {
    const { accountMeta } = await this.antenna!.iotx.getAccount({ address: this.account });
    if (!accountMeta) throw new Error('loadBalance failed');
    this.currentChain.Coin.balance.setValue(new BigNumber(accountMeta.balance.toString()));
  }

  activeConnector(connector?: IotexConnector) {
    if (this.antenna) {
      delete this.antenna;
    }
    this.initAntenna();
  }

  async initAntenna() {
    if (!this.getAntenna().iotx.accounts?.length) {
      return setTimeout(() => {
        this.initAntenna();
      }, 100);
    }
    this.account = this.getAntenna().iotx.accounts[0].address;
  }

  getAntenna() {
    if (this.antenna) {
      return this.antenna;
    }
    let signer;
    if (this.connector.latestProvider.value == IotexConnector.IopayDesktop) {
      signer = new WsSignerPlugin();
      // } else if (GodUtils.isMobile) {
      // signer = new JsBridgeSignerMobile();
    }
    const antenna = signer ? new Antenna(this.currentChain.rpcUrl, { signer }) : new Antenna(this.currentChain.rpcUrl);
    this.antenna = antenna;
    return antenna;
  }

  async execContract({ address, abi, method, params = [], options = {}, read }: CallParams): Promise<Partial<TransactionResponse>> {
    const contract = new Contract(abi, address, { provider: this.antenna.iotx, signer: this.antenna.iotx.signer });
    const { value, ..._options } = options;
    const hash = await contract.methods[method](
      ...params,
      Object.assign({ gasLimit: '2000000', gasPrice: '1000000000000', account: this.account, amount: value || '0' }, _options)
    );
    if (read) {
      return hash;
    }
    const wait = () =>
      new Promise((resolve, reject) => {
        retry(
          //@ts-ignore
          (retry) => {
            return this.antenna.iotx.getReceiptByAction({ actionHash: hash }).catch(retry);
          },
          { minTimeout: 5000, maxTimeout: 5000 }
        ).then(
          (res: any) => {
            res.status = res.receiptInfo.receipt.status;
            resolve(res);
          },
          () => {
            reject();
          }
        );
      });
    //@ts-ignore
    return { hash, wait };
  }
  async multicall(calls: CallParams[]): Promise<any[]> {
    //@ts-ignore
    const res = await this.multiCall.batch(
      calls.map((i) => {
        const { abi, address, method, params } = i;
        return { abi, address, method, params };
      })
    );
    res.forEach((v, i) => {
      const callback = calls[i].handler;
      if (typeof callback == 'function') {
        //@ts-ignore
        callback(v);
      } else {
        if (callback.setValue) {
          callback.setValue(new BigNumber(v.toString()));
        }
      }
    });
    return res;
  }

  isAddressaVailable(address: string): boolean {
    return validateAddress(address);
  }
}
