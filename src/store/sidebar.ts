import { ToolConfig } from '../config/ToolConfig';
import { makeAutoObservable } from 'mobx';
import { theme } from '@/lib/theme';
import { RootStore } from '@/store/root';
export class SidebarStore {
  isOpen = true;
  activeMenu='/';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get menus(){
    return ToolConfig.map(config => {
      config.isActive = this.isActiveMenu(config.path, this.activeMenu);
      return config;
    });
  }

  setActiveMenu(path){
    this.activeMenu = path
  }

  isActiveMenu(menu, pathname) {
    return menu === pathname;
  }

  get width() {
    return this.isOpen ? theme.sideBar.width : theme.sideBar.widthWithOutText;
  }

}
