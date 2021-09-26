import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import copy from 'copy-to-clipboard';
import {
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Link,
  Image,
  useTheme,
  useColorModeValue
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { toast } from 'react-hot-toast';
import { useStore } from '@/store/index';
import { BooleanState, StringState } from '@/store/standard/base';
import { TokenState } from '@/store/lib/TokenState';
import { metamaskUtils } from '@/lib/metaskUtils';

interface PropsType {
  isOpen: BooleanState;
  onClose: Function;
  actionHash: StringState;
  token: TokenState;
}

export const CompleteModal = observer((props: PropsType) => {
  const { lang, god } = useStore();
  const theme = useTheme();
  const grayText = useColorModeValue(theme.colors.gray[2], theme.colors.gray[12]);
  const store = useLocalObservable(() => ({
    onClose() {
      props.onClose();
    },
    onCopyTransactionId() {
      copy(`${god.currentChain.explorerURL}/tx/${props.actionHash.value}`);
      toast.success(lang.t('transaction_link_copied'));
    },
    addTokenToMetamask(token) {
      metamaskUtils.addTokenToMetamask({
        tokenAddress: token.address,
        tokenSymbol: token.symbol,
        tokenDecimals: token.decimals,
        tokenImage: token.logoURI
      });
    }
  }));

  return (
    <Modal isOpen={props.isOpen.value} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent
        borderRadius={theme.borderRadius.sm}
        color={useColorModeValue(theme.colors.gray[600], theme.colors.gray[3])}
      >
        <ModalHeader>{lang.t('complete.broadcast_transaction_successfully')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <Text mb={2}>{lang.t('complete.your_tx_chain', { chain: god.currentChain.name })} </Text>
          <Box mb={2}>
            <Link href={`${god.currentChain.explorerURL}/tx/${props.actionHash.value}`}
                  isExternal>
              <u>{props.actionHash.value}</u>
            </Link>
            <CopyIcon color={useColorModeValue('darkLightGreen', 'lightGreen')} ml={4} w={5} h={5} cursor='pointer'
                      onClick={() => store.onCopyTransactionId()} />
          </Box>
          {props.token &&
          <Button
            mt='12'
            variant='green-border'
            size='block'
            onClick={() => store.addTokenToMetamask(props.token)}>
            {lang.t('button.add_token_metamask', { token: props.token?.symbol })} <Image src='/images/metamask.svg' />
          </Button>
          }
        </ModalBody>
        <ModalFooter>
          <Button
            mb='6'
            variant='green'
            size='block'
            onClick={() => store.onClose()}>
            {lang.t('button.okay')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
