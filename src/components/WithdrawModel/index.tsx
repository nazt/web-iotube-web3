import { observer, useLocalObservable } from 'mobx-react-lite';
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
  useTheme,
  chakra,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  MenuButton, MenuList, MenuItem, Avatar, Menu
} from '@chakra-ui/react';
import React from 'react';
import { useStore } from '@/store/index';
import EnterSvg from '../../../public/images/enter.svg';
import { ChevronDownIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { PolygonMainnetConfig } from '../../config/PolygonMainnetConfig';
import { toast } from 'react-hot-toast';

interface PropsType {
  onConfirm: Function;
  confirmLoadingText: string;
  confirmIsLoading: boolean;
}

export const WithdrawModal = observer((props: PropsType) => {
  const { lang, deposit, god } = useStore();
  const theme = useTheme();
  const home = useColorModeValue('white', theme.colors.bg.bg1);
  const iconBg = useColorModeValue(theme.colors.gray[7], 'white');
  const headerColor = useColorModeValue(theme.colors.gray[4], theme.colors.gray[3]);

  const store = useLocalObservable(() => ({
    get networks() {
      return [BSCMainnetConfig, ETHMainnetConfig, IotexMainnetConfig, PolygonMainnetConfig];
    },
    setChain(val) {
      god.destChain = god.currentNetwork.chain.map[val];
      if (god.isConnect) {
        god.confirmDialogOpen.setValue(true);
      }else {
        toast('Please connect wallet first.')
      }
    },
  }));

  return (
    <Modal isOpen={deposit.isOpenWithdrawModal.value} onClose={() => deposit.isOpenWithdrawModal.setValue(false)} closeOnEsc closeOnOverlayClick>
      <ModalOverlay/>
      <ModalContent borderRadius={theme.borderRadius.sm}>
        <ModalHeader
          color='gray.6'
          fontWeight='500'
          fontSize='xl'
        >{lang.t('deposit.withdraw')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text
            color='gray.2'
            fontSize='md'
            mb='4'
          >{lang.t('deposit.modal.withdraw_to_address')}</Text>
          <Text>{deposit.receiverAddress.value}</Text>
          {deposit.receiverAddress.anotherAddress &&
            <Flex mx={4} h={14} alignItems={'center'} position={'relative'}>
            <chakra.img w='4' h='4' src={EnterSvg} />
            <Text
              mx={2}
              wordBreak={'break-all'}
              color={useColorModeValue(theme.colors.gray[6], theme.colors.gray[2])}
            >
              {deposit.receiverAddress.anotherAddress}
            </Text>
            <Popover trigger={'hover'}>
              <PopoverTrigger>
                <Icon as={QuestionOutlineIcon} cursor={'pointer'} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody _focusVisible={{}} _focus={{}}>

                </PopoverBody>
              </PopoverContent>

            </Popover>
          </Flex>
          }
          <Text
            color='gray.2'
            fontSize='md'
            my='4'
          >{lang.t('deposit.modal.select_network')}</Text>
          <Menu>
            <MenuButton
              as={Button}
              pl={[0, 3]}
              pr={[3, 3]}
              fontSize={theme.iconSize.md}
              variant={'ghost'}
              w={'fit-content'}
              h={'fix-content'}
              rightIcon={<ChevronDownIcon color={theme.colors.gray[9]}/>}>
              <Flex>
                <img width={36} height={36} src={god.currentChain.logoUrl}/>
                <Box p={2}><Text fontSize="xl" color={headerColor}>{god.currentChain.name}</Text></Box>
              </Flex>
            </MenuButton>
            <MenuList bg={home} zIndex={3}>
              {store.networks.map((fromChain) =>
                (fromChain.name !== god.currentChain.name) &&
                <MenuItem key={fromChain.name} onClick={() => store.setChain(fromChain.chainId)}>
                  <Box><Avatar bg={iconBg} size="sm" src={fromChain.logoUrl} alt=""/></Box>
                  <Box ml={4}>{fromChain.name}</Box>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </ModalBody>
        <ModalFooter>
          <Button
            my={4}
            isLoading={props.confirmIsLoading}
            loadingText={props.confirmLoadingText}
            variant="green"
            size="block"
            onClick={props.onConfirm()}>
            {lang.t('deposit.withdraw')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

});
