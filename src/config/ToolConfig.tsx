import { Home } from '../pages/Home/index';
import { Deposit } from '../pages/Deposit/index';
import { Faq } from '../pages/Faq/index';
import { FaqIcon, HomeIcon, SwapIcon, TransactionsIcon } from '@/components/Icon';
import { Transaction } from '../pages/Transaction/index';
import { AiFillGithub } from 'react-icons/all';
import React from 'react';
import { Icon } from '@chakra-ui/react';

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
    component: Transaction,
    icon: TransactionsIcon,
    isActive: false,
    children: [
      {
        name: 'IoTeX',
        path: '#iotex',
        component: Transaction,
        icon: '/images/chain/iotex.svg',
        iconInactivatedLight:'/images/chain/iotex_inactivated_light.svg',
        iconInactivatedDark:'/images/chain/iotex_inactivated_dark.svg',
      },
      {
        name: 'ETH',
        path: '#eth',
        component: Transaction,
        icon: '/images/chain/eth.svg',
        iconInactivatedLight:'/images/chain/eth_inactivated_light.svg',
        iconInactivatedDark:'/images/chain/eth_inactivated_dark.svg',
      },
      {
        name: 'BSC',
        path: '#bsc',
        component: Transaction,
        icon: '/images/chain/bsc.svg',
        iconInactivatedLight:'/images/chain/bsc_inactivated_light.svg',
        iconInactivatedDark:'/images/chain/bsc_inactivated_dark.svg',
      },
      {
        name: 'Polygon',
        path: '#polygon',
        component: Transaction,
        icon: '/images/chain/polygon.svg',
        iconInactivatedLight:'/images/chain/polygon_inactivated_light.svg',
        iconInactivatedDark:'/images/chain/polygon_inactivated_dark.svg',
      }
    ]
  },
  {
    name: 'FAQ',
    path: '/faq',
    component: Faq,
    icon: FaqIcon,
    isActive:false
  },
  {
    name:'IoTube v4',
    path:'https://tube.iotex.io/',
    _blank:true,
    icon:()=>{
      return <></>
    }
  },
  {
    name:'Github',
    path: 'https://github.com/iotexproject/web-iotube-web3',
    icon:()=>{
      return (
        <Icon as={AiFillGithub} w={6} h={6}/>
      )
    },
    _blank:true
  }
];