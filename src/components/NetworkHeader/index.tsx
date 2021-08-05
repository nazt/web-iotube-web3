import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '@/store/index';
import { TokenState } from '@/store/lib/TokenState';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  Box,
  useColorModeValue,
  Center,
  Image,
  Text,
  Spacer, Avatar
} from '@chakra-ui/react';
import { ChainState } from '@/store/lib/ChainState';
import { metamaskUtils } from '@/lib/metaskUtils';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';
import { PolygonMainnetConfig } from '../../config/PolygonMainnetConfig';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { injected } from '@/lib/web3-react';
import { useWeb3React } from '@web3-react/core';
import { Network } from '@/store/god';
import { toast } from 'react-hot-toast';
import { theme } from '@/lib/theme';
import { BooleanState } from '@/store/standard/base';
import { SwitchNetworkDialog } from '@/components/SwitchNetworkDialog';

interface ISwitchProps {
  tokens?: Array<TokenState>;
}

const NetworkHeader = observer((props: ISwitchProps) => {
  const { god, token, lang } = useStore();
  const { activate } = useWeb3React();
  const home = useColorModeValue('white', theme.colors.bg.bg1);
  const iconBg = useColorModeValue(theme.colors.gray[7], 'white');
  const headerColor = useColorModeValue(theme.colors.gray[4], theme.colors.gray[3]);
  const store = useLocalObservable(() => ({
    tipsVisible: false,
    confirmDialogOpen: new BooleanState({}),
    confirmDialogClose() {
      store.confirmDialogOpen.setValue(false);
    },
    destChain: null,
    async onConfirm() {
      await metamaskUtils.setupNetwork({
        chainId: store.destChain.chainId,
        blockExplorerUrls: [store.destChain.explorerURL],
        chainName: store.destChain.name,
        nativeCurrency: {
          decimals: store.destChain.Coin.decimals || 18,
          name: store.destChain.Coin.symbol,
          symbol: store.destChain.Coin.symbol
        },
        rpcUrls: [store.destChain.rpcUrl]
      });
      store.confirmDialogClose();
    },
    toggle() {
      store.setChain(token.currentCrossChain.chain.chainId);
    },
    get networks() {
      return [BSCMainnetConfig, ETHMainnetConfig, IotexMainnetConfig, PolygonMainnetConfig];
    },
    setChain(val) {
      store.destChain = god.currentNetwork.chain.map[val];
      if (god.isConnect) {
        store.confirmDialogOpen.setValue(true);
      }else {
        toast('Please connect wallet first.')
      }
    },
    connectInejct() {
      god.setNetwork(Network.eth);
      activate(injected);
      god.eth.connector.latestProvider.save('inject');
    },
    onSelectDest(chain: ChainState) {
      token.toNetwork.setValue(chain.chainId);
      token.loadPrivateData();
    }
  }));

  return (
    <>
      <SwitchNetworkDialog
        destChain={store.destChain?.name}
        isOpen={store.confirmDialogOpen.value}
        onClose={store.confirmDialogClose}
        onConfirm={store.onConfirm}/>
      <Flex>
        <Menu>
          <MenuButton
            as={Button}
            pl={[0, 3]}
            pr={[3, 3]}
            py={10}
            fontSize={theme.iconSize.md}
            variant={'ghost'}
            w={'fit-content'}
            h={'fix-content'}
            rightIcon={<ChevronDownIcon color={theme.colors.gray[9]}/>}>
            <Flex>
              <img width={36} height={36} src={god.currentChain.logoUrl}/>
              <Box p={2}><Text fontSize="xl" color={headerColor}>{god.currentChain.name}</Text></Box>
            </Flex>
          </MenuButton>
          <MenuList bg={home} zIndex={3}>
            {store.networks.map((fromChain) =>
              (fromChain.name !== god.currentChain.name) &&
              <MenuItem key={fromChain.name} onClick={() => store.setChain(fromChain.chainId)}>
                <Box><Avatar bg={iconBg} size="sm" src={fromChain.logoUrl} alt=""/></Box>
                <Box ml={4}>{fromChain.name}</Box>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
        <Spacer/>
        <Center w={50} cursor="pointer">
          <Image src={'images/icon_arrow_r_green.svg'} onClick={store.toggle}/>
        </Center>
        <Spacer/>
        <Menu>
          <MenuButton
            as={Button}
            pl={[3, 3]}
            pr={[0, 3]}
            py={10}
            w={'fit-content'}
            h={'fix-content'}
            fontSize={theme.iconSize.md}
            variant={'ghost'}
            rightIcon={(Object.values(god.currentChain.crossChain).length > 1) &&
            <ChevronDownIcon color={theme.colors.gray[9]}/>}>
            <Flex>
              <img width={36} height={36} src={token.currentCrossChain?.chain.logoUrl}/>
              <Box p={2}><Text fontSize="xl" color={headerColor}>{token.currentCrossChain?.chain.name}</Text></Box>
            </Flex>
          </MenuButton>
          {Object.values(god.currentChain.crossChain).length > 1 &&
          <MenuList bg={home} zIndex={3}>
            {Object.values(god.currentChain.crossChain).map((crossChain) =>
              <MenuItem key={crossChain.chain.name} onClick={() => store.onSelectDest(crossChain.chain)}>
                <Box><Avatar bg={iconBg} size="sm" src={crossChain.chain.logoUrl} alt=""/></Box>
                <Box ml={4}>{crossChain.chain.name}</Box>
              </MenuItem>
            )}
          </MenuList>
          }
        </Menu>
      </Flex>
    </>
  );
});

export default NetworkHeader;
