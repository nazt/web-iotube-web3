import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { StorageState } from './StorageState';

export class MappingState<T> {
  currentId: any;
  map: {
    [key: string]: T;
  };
  constructor(args: Partial<MappingState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  get current(): T {
    return this.map[this.currentId];
  }
  setCurrentId(val: any) {
    this.currentId = val;
  }
}

export class MappingStorageState<T> {
  currentId: StorageState<any>;
  map: {
    [key: string]: T;
  };
  constructor(args: Partial<MappingState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  get current(): T {
    return this.map[this.currentId.value];
  }
}
