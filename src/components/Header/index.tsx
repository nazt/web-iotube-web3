import React from 'react';
import {
  Box,
  Flex,
  Container,
  Stack,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Icon,
  useColorMode,
  Heading,
  Image
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { DesktopNav } from '@/components/Header/DesktopNav';
import { MobileNav } from '@/components/Header/MobileNav';
import { observer } from 'mobx-react-lite';
import { WalletInfo } from '../WalletInfo';

export const Header = observer(() => {
  const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        as={'header'}
        // pos="fixed"
        // top="0"
        // w={'full'}
        minH={'60px'}
        zIndex="999"
        justify={'center'}
      >
        <Container as={Flex} maxW={'100%'} align={'center'}>
          <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={isMobileNavOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              size={'sm'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>



          <Stack direction={'row'} align={'center'} spacing={8} flex={{ base: 1, md: 'auto' }} justify={'flex-end'}>
            <DesktopNav display={{ base: 'none', md: 'flex' }} />
          </Stack>
        </Container>
      </Flex>
      <MobileNav isOpen={isMobileNavOpen} />
      <WalletInfo />
    </Box>
  );
});
