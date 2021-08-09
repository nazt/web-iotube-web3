import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { Modal, ModalContent, ModalOverlay, ModalCloseButton } from '@chakra-ui/modal';
import {
  Button,
  Link,
  List,
  ListIcon,
  ListItem,
  ModalBody,
  ModalFooter,
  ModalHeader, useColorModeValue,
  useTheme
} from '@chakra-ui/react';
import { BsArrowUpRight } from 'react-icons/bs';
import { Box, Text } from '@chakra-ui/layout';
import { WarningIcon } from '@chakra-ui/icons';

export const HistoryActionModal = observer(() => {
  const { base, deposit, god } = useStore();
  const theme = useTheme();
  const closeModal = () => {
    base.historyActionsModal.setValue(false);
  };
  const store = useLocalObservable(() => ({
    curChainHistoryActions: {},
    setCurChainHistoryActions(val){
      this.curChainHistoryActions = val
    }
  }));

  useEffect(() => {
    store.setCurChainHistoryActions((deposit.historyActions.value&&deposit.historyActions.value[god.currentChain.chainId])||{})
  },[god.currentChain.chainId,deposit.actionState.value]);

  return (
    <>
      <Modal isOpen={base.historyActionsModal.value} onClose={closeModal} isCentered size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={theme.colors.gray[6]} fontWeight={'500'} fontSize='1.25rem'>Recent
            Transactions</ModalHeader>
          <ModalCloseButton _focus={{}} />
          <ModalBody>
            {
              Object.keys(store.curChainHistoryActions).length > 0 ? (
                <List>
                  {
                    Object.keys(store.curChainHistoryActions).map(hash => {
                      return (
                        <ListItem display={'flex'} justifyContent={'space-between'} key={hash}>
                          <Link href={`${god.currentChain.explorerURL}/tx/${hash} `} isExternal>
                            <Text
                              fontSize={'1rem'}
                              lineHeight={1.5}
                              color={!store.curChainHistoryActions[hash].receipt || store.curChainHistoryActions[hash].receipt.status !== 1 ? '#D9506B' : useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen)}
                            >
                              {store.curChainHistoryActions[hash].summary}
                            </Text>
                          </Link>
                          <Box>
                            <ListIcon
                              as={BsArrowUpRight}
                              color={!store.curChainHistoryActions[hash].receipt || store.curChainHistoryActions[hash].receipt.status !== 1 ? '#D9506B' : useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen)}
                            />
                            {
                              (!store.curChainHistoryActions[hash].receipt || store.curChainHistoryActions[hash].receipt.status !== 1) ?
                                <ListIcon as={WarningIcon} color={'#D9506B'} /> : null
                            }
                          </Box>
                        </ListItem>
                      );
                    })
                  }
                </List>
              ) : <Text color={theme.colors.gray[6]}>No recent transactions</Text>
            }
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal} w={'100%'} variant='green'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
