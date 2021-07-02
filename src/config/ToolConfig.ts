import { Home } from '../pages/Home';
import { Vault } from '../pages/Vault';
import { Deposit } from '../pages/Deposit';
import { Faq } from '../pages/Faq';
import { FaqIcon, HomeIcon, SwapIcon, TransactionsIcon } from '@/components/Icon';
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
    component: Home,
    icon:HomeIcon,
    isActive:false
  },
  {
    name: 'Deposit',
    path: '/deposit',
    component: Deposit,
    icon:SwapIcon,
    isActive:false
  },
  {
    name: 'Transactions',
    path: '/transactions',
    component: Vault,
    icon: TransactionsIcon,
    isActive:false
  },
  {
    name: 'FAQ',
    path: '/faq',
    component: Faq,
    icon: FaqIcon,
    isActive:false
  }
];
