import { BaseStore } from './base';
import { LangStore } from './lang';
import { GodStore } from './god';
import { TokenStore } from './token';
import { RecordStore } from '@/store/record';
import { SidebarStore } from '@/store/sidebar';

export class RootStore {
  base = new BaseStore();
  lang = new LangStore();
  god = new GodStore(this);
  token = new TokenStore(this);
  record = new RecordStore(this);
  sideBar = new SidebarStore(this);
}
