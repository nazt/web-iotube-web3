import React, { useEffect, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/all';
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite';
import {
  Box, Button, chakra, Flex,
  IconButton, useColorMode, useDisclosure, HStack, Link, Stack, useTheme, Text, Image, useColorModeValue
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import Logo from '../SiderMenu/Logo';
import { WalletInfo } from '../WalletInfo';
import { DesktopNav } from '@/components/Header/DesktopNav';
import { useHistory } from 'react-router-dom';
import { useStore } from '@/store/index';
import { Nav } from '@/components/Header/Nav';
import { SideItem } from '@/components/SiderMenu/SideItem';
import { MoonDarkIcon, MoonLightIcon, SunnyDarkIcon, SunnyIcon } from '@/components/Icon';
import { eventBus } from '@/lib/event';
import { helper } from '@/lib/helper';
import ToggleModeButton from '@/components/SiderMenu/ToggleModeButton';

export const Header = observer(() => {
  const { sideBar, lang, god } = useStore();
  const mobileNav = useDisclosure();
  const history = useHistory();
  const theme = useTheme();
  const [y, setY] = React.useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const activeColor = useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      mobileNav.isOpen?mobileNav.onClose():null;
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const store = useLocalStore(() => ({

    close() {
      god.currentNetwork.walletInfo.visible = false;
    },

    logout() {
      eventBus.emit('wallet.logout');
      store.close();
    }
  }));

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const MobileNavContent = (
    <Box position={'relative'}>
      <Flex
        ref={ref}
        display={mobileNav.isOpen ? 'flex' : 'none'}
        position='fixed'
        top={'0'}
        right={0}
        align='center'
        flexDirection={'column'}
        h={'100vh'}
        width={'fix-content'}
        bgColor={colorMode === 'light' ? theme.sideBar.bg.light : theme.sideBar.bg.dark}
        px={2}
        shadow={colorMode === 'light' ? theme.shadows.lightShadow : theme.shadows.darkShadow}
        zIndex={-1}
        pt={'4.5rem'}
      >

        {
          sideBar.menus.map((menu) => {
            return (
              <SideItem menu={menu} key={menu.name} activeColor={activeColor} />
            );
          })

        }
        <Flex justifyContent={'flex-start'} w={'100%'} p={1} mt={30}
        >
          <ToggleModeButton/>
        </Flex>
        <Button onClick={store.logout} size='md' mt={100} w={'100%'} bg={theme.colors.gray['11']}>
          <Text fontSize={'xl'} color={activeColor}>Logout</Text>
        </Button>
      </Flex>
    </Box>
  );
  return (
    <Box pos='relative' zIndex='sticky'>
      <chakra.header
        ref={ref}
        transition='box-shadow 0.2s'
        bg={theme.colors.header.bg}
        w='full'
        overflowY='hidden'
        pos='fixed'
      >
        <chakra.div h={theme.header.height} mx={6}>
          <Flex w='full' h='full' align='center' justify='space-between'>
            <Flex align='center'>
              <Link href='/'>
                <HStack>
                  <Logo />
                </HStack>
              </Link>
            </Flex>

            <Flex
              justify='flex-end'
              w='full'
              maxW='824px'
              align='center'
              color='gray.400'
              height={'100%'}
            >
              {sideBar.isShowHeadNav ? (
                  <Flex w={72} justifyContent={'flex-end'} display={{ base: 'none', md: 'flex' }}>
                    {/*<Nav />*/}
                    <Button
                      _hover={{}}
                      display={{ base: 'none', md: 'block' }}
                      bgColor={theme.colors.sideBar.itemActive}
                      color={theme.colors.lightGreen}
                      borderRadius='full'
                      size='md'
                      onClick={() => {
                        history.push('/tube');
                        sideBar.setActiveMenu('/tube');
                      }}
                    >
                      {lang.t('enter_app')}
                    </Button>
                  </Flex>
                ) :
                <>
                  <Stack direction={'row'} align={'center'} spacing={8} flex={{
                    base: 1,
                    md: 'auto'
                  }} justify={'flex-end'}>
                    <DesktopNav display={{ base: 'none', md: 'flex' }} />
                  </Stack>

                  <WalletInfo />
                </>
              }
              <Flex display={{ base: 'flex', md: 'none' }}>
                <Button
                  _hover={{}}
                  variant={'unstyled'}
                  color={theme.colors.lightGreen}
                  display={'flex'}
                >
                  <Image src={'images/icon_vita.png'} mr={2} />
                  {god.currentNetwork.account ? helper.string.truncate(god.currentNetwork.account, 12, '...') : null}
                </Button>
                <IconButton
                  ref={ref}
                  aria-label='Open menu'
                  fontSize='lg'
                  color='lightGreen'
                  variant='ghost'
                  icon={<AiOutlineMenu />}
                  _hover={{}}
                  _active={{}}
                  _focus={{}}
                  onClick={mobileNav.isOpen ? mobileNav.onClose : mobileNav.onOpen}
                />
              </Flex>
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
      {MobileNavContent}

    </Box>
  );
});


