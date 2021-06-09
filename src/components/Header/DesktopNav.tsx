import React from 'react';
import { Stack, BoxProps, Button, Box, Avatar, useColorModeValue } from '@chakra-ui/react';
import { observer, useObserver, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { helper } from '../../lib/helper';
import { ETH, BNB, IOTX } from 'ccy-icons';

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

  const accountView = useObserver(() => {
    if (!god.currentNetwork.account) {
      return <Button onClick={store.showConnecter}>{lang.t('connect.wallet')}</Button>;
    }
    return <Button onClick={store.showWalletInfo}>{helper.string.truncate(god.currentNetwork.account, 12, '...')}</Button>;
  });
  return (
    <Stack direction={'row'} spacing={4} {...props}>
      <Button>
        <Box minW={5}><Avatar css={{
          backgroundColor: useColorModeValue('rgba(249, 249, 249, 0.5)', 'rgba(250, 250, 250, 1)')
        }} size="xs" src={god.currentChain.logoUrl}/></Box>
        <Box ml={2}>{god.currentChain.alias || god.currentChain.name}</Box>
        <Box ml={3}>{god.currentNetwork.chain.current.Coin.balance.format}</Box>
        <Box ml={1}>{god.currentNetwork.chain.current.Coin.symbol}</Box>
      </Button>
      {accountView}
    </Stack>
  );
});
