import React from 'react';
import { Stack, BoxProps, Button, Box, useColorModeValue, Img, Icon, Menu, MenuButton, Center, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { observer, useObserver, useLocalStore } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { helper } from '@/lib/helper';
import { theme } from '@/lib/theme';
import { ChevronDownIcon, TimeIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { ButtonProps } from '@chakra-ui/button/dist/types/button';

export const DesktopNav = observer((props: BoxProps) => {
  const { god, lang, base } = useStore();

  const store = useLocalStore(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    }
  }));

  const NavButton = ({ children, ...props }: ButtonProps) => {
    return (
      <Button
        _hover={{}}
        _active={{}}
        bgColor={theme.colors.header.bg}
        color={useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen)}
        borderRadius={theme.borderRadius.sm}
        {...props}
      >
        {children}
      </Button>
    );
  };

  const accountView = useObserver(() => {
    if (!god.currentNetwork.account) {
      return <NavButton onClick={store.showConnecter}>{lang.t('connect.wallet')}</NavButton>;
    }
    return <NavButton
      bgColor={theme.colors.sideBar.itemActive}
      onClick={store.showWalletInfo}>{helper.string.truncate(god.currentNetwork.account, 12, '...')}</NavButton>;
  });
  return (
    <Stack direction={'row'} spacing={4} {...props}>
      {god.currentNetwork.account &&
      <Menu>
        <MenuButton
          as={Button}
          variant={'ghost'}
          _hover={{}}
          _active={{}}
          bgColor={theme.colors.sideBar.itemActive}
          rightIcon={<ChevronDownIcon
            color={useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen)} />}>
          <Flex>
            <img width={24} height={24} src={god.currentChain.logoUrl} />
            <Center ml={2}
                    color={useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen)}>{god.currentChain.alias || god.currentChain.name}</Center>
          </Flex>
        </MenuButton>
        <MenuList zIndex={3}>
          {god.networks.map((fromChain) =>
            (fromChain.chainId !== god.currentChain.chainId) &&
            <MenuItem key={fromChain.name} onClick={() => god.setDestChain(fromChain.chainId)}>
              <Box><img width={30} height={30} src={fromChain.logoUrl}/></Box>
              <Box ml={4}><Text color={useColorModeValue('black', 'white')}>{fromChain.name}</Text></Box>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      }
      {god.currentNetwork.account &&
      <Flex alignItems={'center'}>
        <NavButton>
          <Box>{god.currentNetwork.chain.current.Coin.balance.format}</Box>
          <Box ml={1}>{god.currentNetwork.chain.current.Coin.symbol}</Box>
        </NavButton>
        <Icon as={TimeIcon} cursor='pointer'
              color={useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen)}
              onClick={() => base.historyActionsModal.setValue(true)} mx={2}/>
      </Flex>
      }
      {accountView}
    </Stack>
  );
});
