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
  // {
  //   name: 'Home',
  //   path: '/',
  //   component: Home,
  //   icon:'home.svg',
  //   iconActive:'home_active.svg'
  // },
  {
    name: 'Deposit',
    path: '/',
    component: Home,
    icon:'swap.svg',
    iconActive:'swap_active.svg'
  },
  {
    name: 'Transactions',
    path: '/transactions',
    component: Vault,
    icon: 'Governance.svg',
    iconActive:'Governance_active.svg'
  }
];
