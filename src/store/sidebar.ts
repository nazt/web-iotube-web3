import { ToolConfig } from '../config/ToolConfig';
import { makeAutoObservable, override } from 'mobx';
import { theme } from '@/lib/theme';
import { RootStore } from '@/store/root';

export class SidebarStore {
  isOpen = true;
  activeMenu = '/tube';
  activeChildMenu = '';
  NAV_SHOW_HEADER = ['/', '/faq'];
  SIDEBAR_NOT_SHOW=['/']
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get menus() {
    return ToolConfig.filter(config=>!this.SIDEBAR_NOT_SHOW.includes(config.path)).map(config => {
      config.isActive = this.isActiveMenu(config.path, this.activeMenu);
      return config;
    });
  }

  get headMenus(){
    return ToolConfig.filter(menu=>this.NAV_SHOW_HEADER.includes(menu.path)).map(config=>{
      config.isActive = this.isActiveMenu(config.path, this.activeMenu);
      return config;
    })
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
