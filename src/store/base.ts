import { makeAutoObservable } from 'mobx';
import { BooleanState } from '@/store/standard/base';

export class BaseStore {
  historyActionsModal = new BooleanState({})
  constructor() {
    makeAutoObservable(this);
  }
}
