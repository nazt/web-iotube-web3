import { ToolConfig } from '../config/ToolConfig';
import { makeAutoObservable } from 'mobx';
import { theme } from '@/lib/theme';
import { RootStore } from '@/store/root';

export class SidebarStore {
  isOpen = true;
  activeMenu = '/deposit';
  activeChildMenu = '';
  NAV_SHOW_HEADER = ['/', '/faq'];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get menus() {
    return ToolConfig.map(config => {
      config.isActive = this.isActiveMenu(config.path, this.activeMenu);
      return config;
    });
  }

  get headMenus(){
    return this.menus.filter(menu=>this.NAV_SHOW_HEADER.includes(menu.path))
  }

  setActiveMenu(path) {
    this.activeMenu = path;
  }

  setActiveChildMenu(path){
    this.activeChildMenu = path
  }

  isActiveMenu(menu, pathname) {
    return menu === pathname;
  }

  get isHome() {
    return this.activeMenu == '/';
  }

  get isShowHeadNav(){
    return this.NAV_SHOW_HEADER.includes(this.activeMenu)
  }

  get isShow() {
    return !this.NAV_SHOW_HEADER.includes(this.activeMenu);
  }

  get width() {
    if (!this.isShow) return theme.sideBar.none;
    return this.isOpen ? theme.sideBar.width : theme.sideBar.widthWithOutText;
  }

}
