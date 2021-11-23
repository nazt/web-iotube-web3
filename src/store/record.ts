import { RootStore } from '@/store/root';
import { makeAutoObservable } from 'mobx';
import { ActionListState } from '@/store/lib/ActionListState';
import { publicConfig } from '../config/public';
import { NumberState } from '@/store/standard/base';
import { ETHMainnetConfig } from '../config/ETHMainnetConfig';
import { BSCMainnetConfig } from '../config/BSCMainnetConfig';
import { PolygonMainnetConfig } from '../config/PolygonMainnetConfig';
import { IotexMainnetConfig } from '../config/IotexMainnetConfig';
import { bscToIotexTokens, iotexBscNetTokens } from '@/constants/token/bsc-iotex';
import { ethTokensForIotex, iotexTokensForEth } from '@/constants/token/eth-iotex';
import { iotexPolygonTokens, polygonToIotexTokens } from '@/constants/token/matic-iotex';

const REFRESH_INTERVAL = 3 * 1000 * 60;

class SearchStatusState {
  id: number;
  name: string;
  color: string;
}

export class RecordStore {
  rootStore: RootStore;
  actionLists: ActionListState[];
  activeTab: NumberState = new NumberState({ value: 0 });
  tabHashMap = { '#iotex': 0, '#eth': 1, '#bsc': 2, '#polygon': 3 };
  statusMap: {
    [key: number]: SearchStatusState;
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });

    this.actionLists = [
      new ActionListState({
        name: 'IoTeX',
        key: 'iotex',
        chainId: 4689,
        requestApi: publicConfig.IOTEX_ACTIONS_ENDPOINT,
        networkConfig: IotexMainnetConfig,
        tokensOnNetwork: iotexTokensForEth.tokens.concat(iotexBscNetTokens.tokens).concat(iotexPolygonTokens.tokens)
      }),
      new ActionListState({
        name: 'ETH',
        key: 'eth',
        chainId: 1,
        requestApi: publicConfig.ETH_ACTIONS_ENDPOINT,
        networkConfig: ETHMainnetConfig,
        tokensOnNetwork: ethTokensForIotex.tokens
      }),
      new ActionListState({
        name: 'BSC',
        key: 'bsc',
        chainId: 56,
        requestApi: publicConfig.BSC_ACTIONS_ENDPOINT,
        networkConfig: BSCMainnetConfig,
        tokensOnNetwork: bscToIotexTokens.tokens
      }),
      new ActionListState({
        name: 'Polygon',
        key: 'polygon',
        chainId: 137,
        requestApi: publicConfig.PLOYGON_ACTIONS_ENDPOINT,
        networkConfig: PolygonMainnetConfig,
        tokensOnNetwork: polygonToIotexTokens.tokens
      })
    ];
    this.statusMap = {
      1: { id: 1, name: this.rootStore.lang.t('transaction.status.tips.created'), color: 'lightGreen' },
      2: { id: 2, name: this.rootStore.lang.t('transaction.status.tips.submitted'), color: 'blue' },
      3: { id: 3, name: this.rootStore.lang.t('transaction.status.tips.settled'), color: 'yellow' },
      4: { id: 4, name: this.rootStore.lang.t('transaction.status.tips.failed'), color: 'red' }
    };

    this.autoRefresh();
  }

  updateList(index, first, skip) {
    this.actionLists[index].first.setValue(first);
    this.actionLists[index].skip.setValue(skip);
    this.actionLists[index].initActions();
  }

  updateSearchParam(name, value) {
    this.actionLists[this.activeTab.value][name].setValue(value);
    this.actionLists[this.activeTab.value].first.setValue(10);
    this.actionLists[this.activeTab.value].skip.setValue(0);
    this.actionLists[this.activeTab.value].initActions();
  }


  clearSearchParam(name) {
    const defaultValue = name == 'status'? 100: '';
    this.actionLists[this.activeTab.value][name].setValue(defaultValue);
    this.actionLists[this.activeTab.value].first.setValue(10);
    this.actionLists[this.activeTab.value].skip.setValue(0);
    this.actionLists[this.activeTab.value].initActions();
  }

  autoRefresh() {
    setInterval(() => {
      const activeActionListState = this.actionLists[this.activeTab.value];
      if (activeActionListState.currentPage === 1) {
        activeActionListState.initActions();
      }
    }, REFRESH_INTERVAL);
  }

}
