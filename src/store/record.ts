import { RootStore } from '@/store/root';
import { makeAutoObservable } from 'mobx';
import { ActionListState } from '@/store/lib/ActionListState';
import { publicConfig } from '../config/public';
import { NumberState } from '@/store/standard/base';
import { ETHMainnetConfig } from '../config/ETHMainnetConfig';
import { BSCMainnetConfig } from '../config/BSCMainnetConfig';
import { PolygonMainnetConfig } from '../config/PolygonMainnetConfig';
import { IotexMainnetConfig } from '../config/IotexMainnetConfig';

export class RecordStore {
  rootStore: RootStore;
  actionLists: ActionListState[];
  activeTab: NumberState = new NumberState({value :0});
  tabHashMap =  {'#iotex': 0, '#eth': 1, '#bsc': 2, '#polygon': 3};

  cashierMap = {
    '0x797f1465796fd89ea7135e76dbc7cdb136bba1ca': BSCMainnetConfig,
    '0xa0fd7430852361931b23a31f84374ba3314e1682': ETHMainnetConfig,
    '0xf72cfb704d49ac7bb7ffa420ae5f084c671a29be': PolygonMainnetConfig
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });

    this.actionLists = [
      new ActionListState({ name: 'IoTeX',
        key: 'iotex',
        chainId: 4689,
        requestApi: publicConfig.IOTEX_ACTIONS_ENDPOINT }),
      new ActionListState({
        name: 'ETH',
        key: 'eth',
        chainId: 1,
        requestApi: publicConfig.ETH_ACTIONS_ENDPOINT
      }),
      new ActionListState({ name: 'BSC',
        key: 'bsc',
        chainId: 56,
        requestApi: publicConfig.BSC_ACTIONS_ENDPOINT
      }),
      new ActionListState({
        name: 'Polygon',
        key: 'polygon',
        chainId: 137,
        requestApi: publicConfig.PLOYGON_ACTIONS_ENDPOINT
      })
    ];
  }

  updateList(first, skip) {

    const index = this.activeTab.value;

    this.actionLists[index].first.setValue(first);
    this.actionLists[index].skip.setValue(skip);
    this.actionLists[index].initActions();
  }

  get activeTabRecords() {
    const actionListState = this.actionLists[this.activeTab.value];

    const actions = this.actionLists[this.activeTab.value].actions.map(action => {

      if (actionListState.key === 'iotex') {
        return {
          fromNetwork: this.cashierMap[action.cashier.toLowerCase()],
          toNetwork: IotexMainnetConfig,
          action: action
        }
      }

      return {
        fromNetwork: IotexMainnetConfig,
        toNetwork: this.rootStore.god.network.map[actionListState.key].chain.map[actionListState.chainId],
        action: action
      }
    });

    return {
      ...actionListState,
      actions: actions
    }
  }

  get currentPage() {
    const index = this.activeTab.value;
    return this.actionLists[index].skip.value / this.actionLists[index].first.value + 1
  }

  get currentPageSize() {
    const index = this.activeTab.value;
    return this.actionLists[index].first.value
  }

}
