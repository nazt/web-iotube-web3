import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/web3-react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image, Button } from '@chakra-ui/react';
import { Network } from '@/store/god';
import { useEffect } from 'react';

export const WalletSelecter = observer(() => {
  const { god } = useStore();
  const { active, error, activate } = useWeb3React();

  const store = useLocalStore(() => ({
    get visible() {
      return god.eth.connector.showConnector;
    },
    close() {
      god.eth.connector.showConnector = false;
    },
    connectInejct() {
      god.setNetwork(Network.eth);
      activate(injected);
      god.eth.connector.latestProvider.save('inject');
    }
  }));

  useEffect(() => {
    //@ts-ignore
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = () => {
        store.connectInejct();
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          store.connectInejct();
        }
      };
      ethereum.on('networkChanged', handleChainChanged);
      ethereum.on('close', handleChainChanged);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('networkChanged', handleChainChanged);
          ethereum.removeListener('close', handleChainChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [active, error, activate]);

  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent padding="10">
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center">
          <Text>Metamask</Text>
          <Image src="/images/metamask.svg" />
        </Button>
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center" mt="2">
          <Text>TrustWallet</Text>
          <Image src="/images/trustwallet.svg" />
        </Button>
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center" mt="2">
          <Text>MathWallet</Text>
          <Image src="/images/mathwallet.svg" />
        </Button>
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center" mt="2">
          <Text>TokenPocket</Text>
          <Image src="/images/tokenpocket.svg" />
        </Button>
      </ModalContent>
    </Modal>
  );
});
