import React from 'react';
import { Box, Flex, Container, Stack, useDisclosure, IconButton, useColorModeValue, Icon, useColorMode, Heading } from '@chakra-ui/react';
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
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        as={'header'}
        // pos="fixed"
        // top="0"
        // w={'full'}
        minH={'60px'}
        boxShadow={'sm'}
        zIndex="999"
        justify={'center'}
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue('rgba(249, 249, 249, 1)', 'rgba(26, 32, 44, 0.8)')
        }}
      >
        <Container as={Flex} maxW={'7xl'} align={'center'}>
          <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={isMobileNavOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              size={'sm'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>

          <Flex flex={{ base: 1, md: 'auto' }} justify={{ base: 'center', md: 'start' }}>
            <Link to={'/'}>
              <Stack direction={'row'} alignItems={'center'} spacing={{ base: 2, sm: 4 }}>
                <img src={'/images/logo.svg'}/>
                <img src={'/images/logo_crosschain.svg'}/>
                <Heading as={'h1'} fontSize={'xl'} display={{ base: 'none', md: 'block' }}>
                </Heading>
              </Stack>
            </Link>
          </Flex>

          <Stack direction={'row'} align={'center'} spacing={8} flex={{ base: 1, md: 'auto' }} justify={'flex-end'}>
            <DesktopNav display={{ base: 'none', md: 'flex' }} />
            <IconButton
              size={'sm'}
              variant={'ghost'}
              aria-label={'Toggle Color Mode'}
              onClick={toggleColorMode}
              icon={colorMode == 'light' ? <IoMoon size={18} /> : <IoSunny size={18} />}
            />
          </Stack>
        </Container>
      </Flex>
      <MobileNav isOpen={isMobileNavOpen} />
      <WalletInfo />
    </Box>
  );
});
