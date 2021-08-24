import tubeAbi from '@/constants/abi/tube.json';
import { NetworkState } from '@/store/lib/NetworkState';
import { CallParams } from '../../../type';

export class TubeState {
  abi = tubeAbi;
  network: NetworkState;
  address: string;

  constructor(args: Partial<TubeState>) {
    Object.assign(this, args);
  }

  withdraw(args: Partial<CallParams>) {
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'withdraw'
    }, args))
  }

}
