import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/store/root';

export class SignatureStore {

  constructor(root: RootStore) {
    makeAutoObservable(root);
  }

}
