import { makeAutoObservable } from 'mobx';
import { StringState } from '@/store/standard/base';
import { isAddress as isEthAddress } from "@ethersproject/address";
import { fromBytes, fromString } from 'iotex-antenna/lib/crypto/address';
import { validateAddress } from 'iotex-antenna/lib/account/utils';

export class AddressState {
  value: string = '';
  loading: boolean;
  constructor(args: Partial<AddressState> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  getIoAddress() {
    if (this.loading) return '...';
    if (isEthAddress(this.value)) {
      return fromBytes(Buffer.from(String(this.value).replace(/^0x/, ""), "hex")).string();
    }
  }

  get ethAddress() {
    if (validateAddress(this.value)) {
      return fromString(this.value).stringEth();
    }
    if (isEthAddress(this.value)) {
      return this.value;
    }
  }

  get anotherAddress() {
    if (validateAddress(this.value)) {
      return fromString(this.value).stringEth();
    }
    if (isEthAddress(this.value)) {
      return fromBytes(Buffer.from(String(this.value).replace(/^0x/, ""), "hex")).string();
    }
  }

  setValue(value: string) {
    this.value = value;
    this.setLoading(false);
  }
  setLoading(val) {
    this.loading = val;
  }
}
