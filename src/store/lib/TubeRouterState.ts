import tubeAbi from '@/constants/abi/tube.json';
import { NetworkState } from '@/store/lib/NetworkState';
import { CallParams } from '../../../type';

export class TubeRouterState {
  abi = tubeAbi;
  network: NetworkState;
  address: string;

  constructor(args: Partial<TubeRouterState>) {
    Object.assign(this, args);
  }

  depositTo(args: Partial<CallParams>) {
    return this.network.execContract(Object.assign({
      address: this.address,
      abi: this.abi,
      method: 'depositTo'
    }, args))
  }


}
