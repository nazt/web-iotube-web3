import React from 'react';
import { Stack, BoxProps, Button, Box, useColorModeValue, Img,Icon } from '@chakra-ui/react';
import { observer, useObserver, useLocalStore } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { helper } from '@/lib/helper';
import { ETH, BNB, IOTX } from 'ccy-icons';
import { theme } from '@/lib/theme';
import { ButtonProps } from '@chakra-ui/button/dist/types/button';
import { TimeIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/layout';
export const DesktopNav = observer((props: BoxProps) => {
  const { god, lang,base } = useStore();

  const store = useLocalStore(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },

    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    }
  }));
  const NetowrkIcon = useObserver(() => {
    if (god.network.currentId.value == 'iotex') {
      return <IOTX />;
    }
    if (god.network.currentId.value == 'eth') {
      return <ETH />;
    }
    if (god.network.currentId.value == 'bsc') {
      return <BNB />;
    }
  });

  const NavButton = ({children,...props}:ButtonProps)=>{
    return (
      <Button
        _hover={{}}
        bgColor={theme.colors.header.bg}
        color={useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)}
        borderRadius={theme.borderRadius.sm}
        {...props}
      >
        {children}
      </Button>
    )
  }

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
        <Flex alignItems={'center'}>
          <NavButton>
            <Box minW={5}>
              <Img src={god.currentChain.logoUrl} boxSize='6' borderRadius='full'/>
            </Box>
            <Box ml={2}>{god.currentChain.alias || god.currentChain.name}</Box>
            <Box ml={3}>{god.currentNetwork.chain.current.Coin.balance.format}</Box>
            <Box ml={1}>{god.currentNetwork.chain.current.Coin.symbol}</Box>
          </NavButton>
          <Icon as={TimeIcon} cursor='pointer' color={useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)} onClick={()=>base.historyActionsModal.setValue(true)} mx={2}/>
        </Flex>
      }
      {accountView}
    </Stack>
  );
});
