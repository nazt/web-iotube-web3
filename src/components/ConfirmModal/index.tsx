import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { TokenState } from '../../store/lib/TokenState';
import { AddressState } from '@/store/standard/AddressState';
import { BigNumberInputState } from '@/store/standard/BigNumberInputState';
import {
  Text,
  Center,
  Box,
  Flex,
  Image,
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
import { BigNumberState } from '@/store/standard/BigNumberState';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: Function;
  amount: BigNumberInputState;
  curToken: TokenState | null;
  receiverAddress: AddressState;
  depositeFee: BigNumberState;
  confirmLoadingText: string;
  confirmIsLoading: boolean;
}

export const ConfirmModal = observer((props: PropsType) => {
  const { token, lang } = useStore();
  const theme = useTheme();
  const store = useLocalObservable(() => ({
    onClose() {
      props.onClose();
    }
  }));

  return (
    <Modal isOpen={props.isOpen} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay/>
      <ModalContent borderRadius={theme.borderRadius.sm}>
        <ModalHeader>{lang.t('you_are_going_to_deposit')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Flex>
            <Text fontSize="3xl" mr={4}>{props.amount.format}</Text>
            <Center>
              <Image borderRadius="full" boxSize={theme.iconSize.md} src={props.curToken?.logoURI}
                     fallbackSrc="https://via.placeholder.com/150"/>
              <Text fontSize="2xl" ml={2}>{props.curToken?.symbol}</Text>
            </Center>
          </Flex>
          <Text>on {token.currentCrossChain?.chain.name} </Text>
          <Text>at {props.receiverAddress.value}</Text>
          <Box my={6}>
            <Text mb={2}>{lang.t('fee')}</Text>
            <Flex justifyContent="space-between">
              <Box>{lang.t('fee.tube')}</Box>
              <Box>0 ({lang.t('fee')})</Box>
            </Flex>
            <Flex justifyContent="space-between">
              <Box>{<span>{lang.t('relay_to_chain', { chain: token.currentChain.name })}</span>}</Box>
              <Box>
                <span>{props.depositeFee?.format}</span>
                <span> {`IOTX (${lang.t("fee")})`}</span>
              </Box>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            mb="10px"
            isLoading={props.confirmIsLoading}
            loadingText={props.confirmLoadingText}
            variant="black"
            size="block"
            onClick={props.onConfirm()}>
            {lang.t('confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
