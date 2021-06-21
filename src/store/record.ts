import { RootStore } from '@/store/root';
import { makeAutoObservable } from 'mobx';
import { ActionListState } from '@/store/lib/ActionListState';
import { publicConfig } from '../config/public';
import { NumberState } from '@/store/standard/base';

export class RecordStore {
  rootStore: RootStore;
  actionLists: ActionListState[];
  activeTab: NumberState;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });

    this.actionLists = [
      new ActionListState({
        name: 'IoTeX -> Eth',
        key: 'eth',
        requestApi: publicConfig.ETH_ACTIONS_ENDPOINT
      }),
      new ActionListState({ name: 'IoTeX -> BSC',
        key: 'bsc',
        requestApi: publicConfig.IOTEX_ACTIONS_ENDPOINT
      }),
      new ActionListState({
        name: 'IoTeX -> Polygon',
        key: 'polygon',
        requestApi: publicConfig.PLOYGON_ACTIONS_ENDPOINT
      }),
      new ActionListState({ name: 'IoTex',
        key: 'iotex',
        requestApi: publicConfig.BSC_ACTIONS_ENDPOINT })
    ];
  }

  updateList(first, skip) {
    this.actionLists[this.activeTab.value].first.setValue(first);
    this.actionLists[this.activeTab.value].skip.setValue(skip);
    this.actionLists[this.activeTab.value].initActions();
  }
}
