import { Home } from '../pages/Home/index';
import { Deposit } from '../pages/Deposit/index';
import { Faq } from '../pages/Faq/index';
import { FaqIcon, HomeIcon, DiscordIcon, IotubeIconV4, SwapIcon, TransactionsIcon, AssetIcon } from '@/components/Icon';
import { Transaction } from '../pages/Transaction/index';
import { AiFillGithub } from 'react-icons/all';
import React from 'react';
import { Icon } from '@chakra-ui/react';
import { TokenList } from '../pages/Asset';

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
    isActive:false,
  },
  {
    name: 'Tube',
    path: '/tube',
    component: Deposit,
    icon:SwapIcon,
    isActive:false
  },
  {
    name: 'Explorer',
    path: '/explorer',
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
    name:'Assets',
    path:'/assets',
    _blank:false,
    component:TokenList,
    icon:()=>{
      return <Icon as={AssetIcon} w={6} h={6}/>
    }
  },
  {
    name: 'FAQ',
    path: '/faq',
    component: Faq,
    icon: FaqIcon,
    isActive:false
  },
  {
    name:'Github',
    path: 'https://github.com/iotexproject/iotube',
    icon:()=>{
      return (
        <Icon as={AiFillGithub} w={6} h={6}/>
      )
    },
    _blank:true
  },
  {
    name:'Tube v4',
    path:'https://v4.iotube.org',
    _blank:true,
    icon:()=>{
      return <Icon as={IotubeIconV4} w={6} h={6}/>
    }
  },
  {
    name:'Discord',
    path:'https://discord.gg/jRqqSyGfUD',
    _blank:true,
    icon:()=>{
      return <Icon as={DiscordIcon} w={6} h={6}/>
    }
  },
];
