import { makeAutoObservable } from 'mobx';

export class ActionState {
  key: string;
  actionHash: string;
  status: string;

  constructor(args: Partial<ActionState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
}
