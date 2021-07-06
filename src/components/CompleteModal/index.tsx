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
  useTheme
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { toast } from 'react-hot-toast';


export const CompleteModal = observer(() => {
  const { token, lang, god, deposit } = useStore();
  const theme = useTheme();
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
      <ModalContent borderRadius={theme.borderRadius.sm}>
        <ModalHeader>{lang.t('complete.broadcast_transaction_successfully')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text>{lang.t('complete.tx_broadcast_network', {
            network: god.currentNetwork.currentChain.name,
            amount: deposit.amount.format,
            token: deposit.curToken?.symbol
          })}
          </Text>
          <Box fontSize="md" my={2}>
            {deposit.receiverAddress.value}
            <CopyIcon ml={4} w={5} h={5} cursor="pointer" onClick={() => store.onCopyAddress()}/>
          </Box>
          <Text mb={2}>{lang.t('complete.your_tx_chain', { chain: token.currentChain.name })} </Text>
          <Box mb={2}>
            <a href={`${token.currentChain.explorerURL}/tx/${token.actionHash.value}`}
               target="_blank">
              <u>{token.actionHash.value}</u>
            </a>
            <CopyIcon ml={4} w={5} h={5} cursor="pointer" onClick={() => store.onCopyTransactionId()}/>
          </Box>
          or
          <Box mb={2}>
            <a href={`/transaction#${token.currentCrossChain?.chain.name.toLowerCase()}`}
               target="_blank">
              <u>{lang.t('view_transactions')}</u>
            </a>
          </Box>
          <Text>{lang.t('complete.check_status_comment')}</Text>
          <Box mt={6}>
            <Flex justifyContent="space-between">
              <span>{lang.t('eta')}</span>
              <span>~{token.currentChain.name != IotexMainnetConfig.name ? `4 ${lang.t('min')}` : `1 ${lang.t('min')}*`}</span>
            </Flex>
            <Flex justifyContent="space-between">
              <span>{lang.t('network_confirmations', { network: token.currentChain.name })}</span> :<span>~{token.currentChain.name != IotexMainnetConfig.name ? `3 ${lang.t('min')}` : `5 ${lang.t('sec')}`}</span>
            </Flex>
            <Flex justifyContent="space-between">
              <span>{lang.t('witness_confirmation')}</span>
              <span>~{token.currentChain.name != IotexMainnetConfig.name ? `7 ${lang.t('sec')}` : `1 ${lang.t('min')}*`}</span>
            </Flex>
            <div>{lang.t('may_delay_comment', { network: token.currentChain.name })}</div>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            mb="10px"
            variant="black"
            size="block"
            onClick={() => store.onClose()}>
            {lang.t('confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
