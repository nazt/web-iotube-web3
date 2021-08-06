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
  onConfirm: Function;
  confirmLoadingText: string;
  confirmIsLoading: boolean;
}

export const ConfirmModal = observer((props: PropsType) => {
  const { token, lang, deposit } = useStore();
  const theme = useTheme();

  return (
    <Modal isOpen={deposit.isOpenConfirmModal.value} onClose={() => deposit.isOpenConfirmModal.setValue(false)} closeOnEsc closeOnOverlayClick>
      <ModalOverlay/>
      <ModalContent borderRadius={theme.borderRadius.sm}>
        <ModalHeader>{lang.t('you_are_going_to_deposit')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Flex>
            <Text fontSize="3xl" mr={4}>{deposit.amount.format}</Text>
            <Center>
              <Image borderRadius="full" boxSize={theme.iconSize.md} src={deposit.curToken?.logoURI}
                     fallbackSrc="https://via.placeholder.com/150"/>
              <Text fontSize="2xl" ml={2}>{deposit.curToken?.symbol}</Text>
            </Center>
          </Flex>
          <Text>{lang.t('to_iotube_and_mint')}</Text>
          <Flex>
            <Text fontSize="3xl" mr={4}>{deposit.amount.format}</Text>
            <Center>
              <Image borderRadius="full" boxSize={theme.iconSize.md} src={deposit.destToken?.logoURI}
                     fallbackSrc="https://via.placeholder.com/150"/>
              <Text fontSize="2xl" ml={2}>{deposit.destToken?.symbol}</Text>
            </Center>
          </Flex>
          <Text>on {token.currentCrossChain?.chain.name} </Text>
          <Text>at&nbsp;{deposit.receiverAddress.value}</Text>
          <Box my={6}>
            <Text mb={2}>{lang.t('fee')}</Text>
            <Flex justifyContent="space-between">
              <Box>{lang.t('fee.tube')}</Box>
              <Box>0 ({lang.t('free')})</Box>
            </Flex>
            <Flex justifyContent="space-between">
              <Box>{<span>{lang.t('relay_to_chain', { chain: token.currentCrossChain?.chain.name })}</span>}</Box>
              <Box>
                <span>{token.currentCrossChain?.cashier?.depositFee.format}</span>
                <span>{token.currentCrossChain?.cashier?.depositFee.format > 0? ' IOTX':` (${lang.t("free")})`}</span>
              </Box>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            mb={4}
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
