import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { useStore } from '../../store/index';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { Button, Text, Flex, ModalHeader, ModalCloseButton, useColorModeValue } from '@chakra-ui/react';
import { theme } from '@/lib/theme';

export const WalletInfo = observer(() => {
  const { god, lang } = useStore();
  const store = useLocalStore(() => ({
    get visible() {
      return god.currentNetwork.walletInfo.visible;
    },
    close() {
      god.currentNetwork.walletInfo.visible = false;
    },
    copy() {
      copy(god.currentNetwork.account);
      toast.success(lang.t('address.copied'));
    },
    logout() {
      eventBus.emit('wallet.logout');
      store.close();
    }
  }));
  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent style={{padding:'2rem 2rem'}} bgColor={useColorModeValue(theme.colors.white,theme.colors.bg.bg1)}>
        <Flex justifyContent={'space-between'} alignContent={'flex-start'}>
          <ModalHeader color={useColorModeValue('black',theme.colors.gray['3'])} padding={0} fontSize={'2xl'}>Logout</ModalHeader>
          <ModalCloseButton position={'relative'} top={'0'} right={'0'} _hover={{}} _focus={{}}/>
        </Flex>
        <Text color={useColorModeValue('black',theme.colors.gray['3'])} mt={50} fontSize={'lg'}>{god.currentNetwork.account}</Text>
        <Button onClick={store.logout} size="md" variant={'green'} mt={100}>
          <Text fontSize={'xl'}>Logout</Text>
        </Button>
      </ModalContent>
    </Modal>
  );
});
