import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { useStore } from '@/store/index';
import { eventBus } from '@/lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import {
  Button,
  Text,
  Flex,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  Link,
  chakra
} from '@chakra-ui/react';
import { theme } from '@/lib/theme';
import { fromBytes } from '@iotexproject/iotex-address-ts';
import { CopyIcon } from '@chakra-ui/icons';
import EnterSvg from '../../../public/images/enter.svg';
import { NetworkState } from '@/store/lib/NetworkState';
import CopyToClipboard from '@/components/CopyToClipboard';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';

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
    },
    get isIotex() {
      return god.currentChain.name.toLowerCase() === 'iotex';
    },
    get ioAddress() {
      if(!god.currentNetwork.account) return null;
      return fromBytes(Buffer.from(String(god.currentNetwork.account).replace(/^0x/, ''), 'hex')).string();
    }
  }));
  const color = useColorModeValue('darkLightGreen', 'lightGreen');


  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay/>
      <ModalContent style={{ padding: '2rem 2rem' }}
                    bgColor={useColorModeValue(theme.colors.white, theme.colors.bg.bg1)}>
        <Flex justifyContent={'space-between'} alignContent={'flex-start'}>
          <ModalHeader color={useColorModeValue('black', theme.colors.gray['3'])} padding={0}
                       fontSize={'2xl'}>{lang.t('account')}</ModalHeader>
          <ModalCloseButton position={'relative'} top={'0'} right={'0'} _hover={{}} _focus={{}}/>
        </Flex>
        <CopyToClipboard text={god.currentNetwork.account}>
          <Text cursor='pointer'
                color={useColorModeValue('black', theme.colors.gray['3'])} mt={50}
                fontSize={'lg'}
          >
            {god.currentNetwork.account}

            <CopyIcon ml={5} color={color}/>
          </Text>
        </CopyToClipboard>
        <Flex mt='4' alignItems={'center'}>
          <chakra.img w='4' h='4' src={EnterSvg}/>
          <CopyToClipboard text={store.ioAddress}>
            <Text
              ml={2}
              cursor='pointer'
              wordBreak={'break-all'}
              color={'gray'}
            >
              {god.currentNetwork?.account && store.ioAddress}
              <CopyIcon ml={5} color={color}/>
            </Text>
          </CopyToClipboard>
        </Flex>
        <Link href={`${IotexMainnetConfig.explorerURL}/address/${(god.currentNetwork as NetworkState).account}`} mt={5}
              isExternal><u>{lang.t('view_iotexscan')}</u></Link>
        <Button onClick={store.logout} size='md' variant={'green'} mt={100}>
          <Text fontSize={'xl'}>{lang.t('button.logout')}</Text>
        </Button>
      </ModalContent>
    </Modal>
  );
});
