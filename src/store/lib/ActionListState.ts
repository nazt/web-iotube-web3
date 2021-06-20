import { makeAutoObservable } from 'mobx';
import { ActionState } from '@/store/lib/ActionState';
import axios from 'axios';

export class ActionListState {
  requestApi: string;
  name: string;
  first: number = 10;
  skip: number = 0;
  actions: ActionState[] = [];

  constructor(args: Partial<ActionListState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.initActions();
    this.initTest();
  }

  async initActions() {
    console.log('ActionStore::initAction');
    axios.post(
      this.requestApi,
      {
        first: this.first,
        skip: this.skip
      },

      {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        }
      }
    ).then(res => {
      console.log("----->", res);
      // this.actions = data.statuses.map(i => {
      //   return { status: data.transfers[i].status } as ActionState;
      // });
    });

  }

  initTest(){
    var url = this.requestApi;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }};

    var data = '{"first":"10","skip":"0"}';

    xhr.send(data);
  }
}
