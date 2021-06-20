import { RootStore } from '@/store/root';
import { makeAutoObservable } from 'mobx';
import { ActionListState } from '@/store/lib/ActionListState';
import { publicConfig } from '../config/public';

export class RecordStore {
  rootStore: RootStore;
  ethList = new ActionListState({ name: "IoTeX -> Eth", requestApi: publicConfig.ETH_ACTIONS_ENDPOINT});
  iotexList = new ActionListState({ name: "IoTeX -> BSC", requestApi: publicConfig.IOTEX_ACTIONS_ENDPOINT});
  polygonList = new ActionListState( { name: "IoTeX -> Polygon", requestApi: publicConfig.PLOYGON_ACTIONS_ENDPOINT});
  bscList = new ActionListState( { name: "IoTex", requestApi: publicConfig.BSC_ACTIONS_ENDPOINT});

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
    console.log(this.ethList.actions);
  }



}
