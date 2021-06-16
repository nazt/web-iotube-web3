import React from 'react';
import { Stack, BoxProps, Button, Box, Avatar, useColorModeValue } from '@chakra-ui/react';
import { observer, useObserver, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { helper } from '../../lib/helper';
import { ETH, BNB, IOTX } from 'ccy-icons';
import { theme } from '@/lib/theme';
import { ButtonProps } from '@chakra-ui/button/dist/types/button';

export const DesktopNav = observer((props: BoxProps) => {
  const { god, lang } = useStore();

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
        bgColor={theme.colors.header.bg}
        color={theme.colors.lightGreen}
        borderRadius={'15px'}
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
      onClick={store.showWalletInfo}>{helper.string.truncate(god.currentNetwork.account, 12, '...')}</NavButton>;
  });
  return (
    <Stack direction={'row'} spacing={4} {...props}>
      <NavButton
      >
        <Box minW={5}><Avatar css={{
          backgroundColor: useColorModeValue('rgba(249, 249, 249, 0.5)', 'rgba(250, 250, 250, 1)')
        }} size="xs" src={god.currentChain.logoUrl}/></Box>
        <Box ml={2}>{god.currentChain.alias || god.currentChain.name}</Box>
        <Box ml={3}>{god.currentNetwork.chain.current.Coin.balance.format}</Box>
        <Box ml={1}>{god.currentNetwork.chain.current.Coin.symbol}</Box>
      </NavButton>
      {accountView}
    </Stack>
  );
});
