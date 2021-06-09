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
  InputGroup,
  Input,
  InputRightElement,
  Image,
  Icon,
  Button,
  Alert,
  AlertIcon,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody
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
}

export const ConfirmModal = observer((props: PropsType) => {
  const { token, lang } = useStore();
  const store = useLocalObservable(() => ({
    onClose() {
      props.onClose();
    }
  }));

  return (
    <Modal isOpen={props.isOpen} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{lang.t('you_are_going_to_deposit')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Flex>
            <Text fontSize="3xl" mr={4}>{props.amount.format}</Text>
            <Center>
              <Image borderRadius="full" boxSize="24px" src={props.curToken?.logoURI}
                     fallbackSrc="https://via.placeholder.com/150"/>
              <Text fontSize="2xl" ml={2}>{props.curToken?.symbol}</Text>
            </Center>
          </Flex>
          <Text>on {token.currentCrossChain.chain.name} </Text>
          <Text>at {props.receiverAddress.value}</Text>
          <Box my={4}>
            <Text mb={2} className="font-normal text-base mb-3">{lang.t('fee')}</Text>
            <Flex className="font-light text-sm flex items-center justify-between">
              <span>{lang.t('fee.tube')}</span>
              <span>0 ({lang.t('fee')})</span>
            </Flex>
            <div className="font-light text-sm flex items-center justify-between">
              {<span>{lang.t('relay_to_chain', { chain: token.currentChain.name })}</span>}
              <span>{props.depositeFee?.format}</span>
              <span> ({lang.t("fee")})</span>
            </div>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onConfirm()}>
            {lang.t('confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
