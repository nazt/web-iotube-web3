import { Home } from '../pages/Home/index';
import { Vault } from '../pages/Vault/index';
class Tool {
  name: string;
  path: string;
  component: any;
  tags: string[];

  constructor(args: Partial<Tool>) {
    Object.assign(this, args);
  }
}

export const ToolConfig = [
  {
    name: 'Home',
    path: '/',
    component: Home
  }, {
    name: 'Swap',
    path: '/swap',
    component: Home
  }, {
    name: 'Vault',
    path: '/vault',
    component: Vault
  }
];
