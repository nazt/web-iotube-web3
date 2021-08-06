import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import copy from 'copy-to-clipboard';
import {
  Text,
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Link,
  useTheme,
  useColorModeValue
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { toast } from 'react-hot-toast';


export const CompleteModal = observer(() => {
  const { token, lang, god, deposit } = useStore();
  const theme = useTheme();
  const grayText = useColorModeValue( theme.colors.gray[2], theme.colors.gray[12]);
  const store = useLocalObservable(() => ({
    onClose() {
      deposit.isOpenCompleteModal.setValue(false);
    },
    onCopyAddress() {
      copy(deposit.receiverAddress.value);
      toast.success(lang.t('address_copied'));
    },
    onCopyTransactionId() {
      copy(`${token.currentChain.explorerURL}/tx/${token.actionHash.value}`);
      toast.success(lang.t('transaction_link_copied'));
    }
  }));

  return (
    <Modal isOpen={deposit.isOpenCompleteModal.value} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay/>
      <ModalContent
        borderRadius={theme.borderRadius.sm}
        color={useColorModeValue(theme.colors.gray[600], theme.colors.gray[3])}
      >
        <ModalHeader>{lang.t('complete.broadcast_transaction_successfully')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text>{lang.t('complete.tx_broadcast_network', {
            network: god.currentNetwork.currentChain.name,
            amount: deposit.amount.format,
            token: deposit.curToken?.symbol
          })}
          </Text>
          <Box fontSize="md" my={3} fontWeight='bold' color={useColorModeValue( theme.colors.gray[4], 'white')}>
            {deposit.receiverAddress.value}
            <CopyIcon color={useColorModeValue('darkLightGreen', 'lightGreen')} ml={4} w={5} h={5} cursor="pointer" onClick={() => store.onCopyAddress()}/>
          </Box>
          <Text mb={2}>{lang.t('complete.your_tx_chain', { chain: token.currentChain.name })} </Text>
          <Box mb={2}>
            <Link href={`${token.currentChain.explorerURL}/tx/${token.actionHash.value}`}
               isExternal>
              <u>{token.actionHash.value}</u>
            </Link>
            <CopyIcon color={useColorModeValue('darkLightGreen', 'lightGreen')} ml={4} w={5} h={5} cursor="pointer" onClick={() => store.onCopyTransactionId()}/>
          </Box>
          <Text>{lang.t('complete.check_status_comment')} <Link
            href={`/explorer#${token.currentCrossChain?.chain.name.toLowerCase()}`} textDecoration='underline'
            isExternal>{lang.t('view_transactions')}</Link></Text>
          <Box mt={6}>
            <Flex justifyContent="space-between">
              <span style={{color: grayText}}>{lang.t('eta')}</span>
              <span>{`~3 ${lang.t('min')}*`}</span>
            </Flex>
            <Flex justifyContent="space-between">
              <span style={{color: grayText}}>{lang.t('network_confirmations', { network: token.currentChain.name })}</span> :<span>~{token.currentChain.name != IotexMainnetConfig.name ? `3 ${lang.t('min')}` : `5 ${lang.t('sec')}`}</span>
            </Flex>
            <Flex justifyContent="space-between">
              <span style={{color: grayText}}>{lang.t('witness_confirmation')}</span>
              <span>~{token.currentChain.name != IotexMainnetConfig.name ? `7 ${lang.t('sec')}` : `1 ${lang.t('min')}*`}</span>
            </Flex>
            <div style={{color: grayText}}>{lang.t('may_delay_comment', { network: token.currentCrossChain?.chain.name })}</div>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            mb="10px"
            variant="green"
            size="block"
            onClick={() => store.onClose()}>
            {lang.t('button.okay')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
