import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/lib/web3-react';
import { Modal, ModalOverlay, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { Box, Flex, Text } from '@chakra-ui/layout';
import {
  AvatarGroup,
  Avatar,
  useColorModeValue,
  useTheme,
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton
} from '@chakra-ui/react';
import { Network } from '@/store/god';
import { useEffect } from 'react';
import { BooleanState, StringState } from '@/store/standard/base';

export const WalletSelecter = observer(() => {
  const { god } = useStore();
  let { active, error, activate } = useWeb3React();
  const theme = useTheme();
  const store = useLocalStore(() => ({
    get visible() {
      return god.eth.connector.showConnector;
    },
    showAlert: new BooleanState(),
    errorMessage:new StringState(),
    close() {
      god.eth.connector.showConnector = false;
    },
    handleError(error){
      this.showAlert.setValue(true);
      this.errorMessage.setValue(error.message)
    },
    connectInejct() {
      god.setNetwork(Network.eth);
      activate(injected, this.handleError);
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
    if (error){
      store.handleError(error)
    }
  }, [active, error, activate]);

  const config = [
    {
      title: 'Metamask',
      icon: '/images/metamask.svg'
    },
    {
      title: 'ioPay',
      icon: '/images/iopay.svg'
    },
    {
      title: 'Trust',
      icon: '/images/trustwallet.svg'
    },
    {
      title: 'Math',
      icon: '/images/mathwallet.svg'
    },
    {
      title: 'imToken',
      icon: '/images/imtoken.svg'
    }
  ];
  const names = config.map(item => item.title).join(', ');

  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay/>
      <ModalContent p={6} borderRadius={theme.radii.xl}
                    bg={useColorModeValue(theme.sideBar.bg.light, theme.sideBar.bg.dark)}>
        <ModalCloseButton variant='unstyled'/>
        {!god.currentNetwork.account && (
          <Box>
            <Box onClick={store.connectInejct} my={4} cursor='pointer' borderRadius={theme.radii.xl}
                 p={4} bg={useColorModeValue(theme.colors.gray[100], theme.colors.bg.bg1)}
                 _hover={{ opacity: '0.8' }}>
              <Flex>
                <Flex direction='column'>
                  <Text fontSize='lg' fontWeight='500'>Browser
                    Wallet</Text>
                  <Text mt={1} color={theme.colors.gray[2]} fontSize='xs'
                        fontWeight='500'>({names})</Text>
                </Flex>
                <Flex>
                  <AvatarGroup size='sm' border='none'>
                    {
                      config.map((item, index) => {
                        return <Avatar name={item.title} key={item.title} src={item.icon}/>;
                      })
                    }
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Box>
          </Box>
        )}
        {store.showAlert.value&&(<Alert status='warning'>
          <AlertIcon />
          <AlertDescription fontSize={'0.75rem'}>{store.errorMessage.value}</AlertDescription>
        </Alert>)}
      </ModalContent>
    </Modal>
  );
});
