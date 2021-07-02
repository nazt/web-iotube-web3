import React from 'react';
import {
  AiFillHome,
  AiOutlineInbox,
  AiOutlineMenu,
  BsFillCameraVideoFill,
  FaHeart,
  FaMoon,
  FaSun
} from 'react-icons/all';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Box, Button, chakra, CloseButton, Flex, Icon,
  IconButton, useColorModeValue, useDisclosure, VStack, HStack, Link, Stack, useTheme,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import Logo from '../SiderMenu/Logo';
import { WalletInfo } from '../WalletInfo';
import { DesktopNav } from '@/components/Header/DesktopNav';
import { Text } from '@chakra-ui/layout';
import { useHistory } from 'react-router-dom';
import { useStore } from '@/store/index';
import { Nav } from '@/components/Header/Nav';
export const Header = observer(() => {
  const { sideBar, lang } = useStore();
  const mobileNav = useDisclosure();
  const history = useHistory();
  const theme = useTheme();
  const [y, setY] = React.useState(0);
  const store = useLocalObservable(() => ({
    activeMenu: history.location.pathname,
    switchToRoute(path) {
      history.push(path);
      this.activeMenu = path;
    }
  }));
  const getItemActiveStyle = (path) => {
    if (store.activeMenu === path) {
      return {
        bgColor: theme.colors.sideBar.itemActive,
        borderRadius: '15px'
      };
    }
  };

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const MobileNavContent = (
    <VStack
      pos='absolute'
      zIndex={10000}
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection='column'
      p={2}
      pb={4}
      m={2}
      bg={theme.colors.header.bg}
      spacing={3}
      rounded='sm'
      shadow='sm'
    >
      <CloseButton
        color='white'
        aria-label='Close menu'
        justifySelf='self-start'
        onClick={mobileNav.onClose}
      />

      {
        sideBar.menus.map((config) => {
          return (
            <Button
              fontSize={'15px'}
              variant='ghost'
              aria-label='Home'
              _hover={{ bg: theme.colors.sideBar.itemActive }}
              minHeight={'50px'}
              display={'flex'}
              fontWeight={400}
              onClick={() => store.switchToRoute(config.path)}
              key={config.name}
              {...getItemActiveStyle(config.path)}
              alignItems={'center'}
              justifyContent={'flex-start'}
              marginTop={'30px'}
              color={store.activeMenu === config.path ? 'lightGreen' : 'white'}
            >
              <Icon as={config.icon} color={sideBar.activeMenu!==config.path?theme.colors.gray:useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)}/>

              <Text marginLeft={'15px'}>{config.name}</Text>
            </Button>
          );
        })
      }
    </VStack>
  );
  return (
    <Box pos='relative' zIndex={1}>
      <chakra.header
        transition='box-shadow 0.2s'
        bg={theme.colors.header.bg}
        w='full'
        overflowY='hidden'
      >
        <chakra.div h='4.5rem' mx={6}>
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
                  <Flex w={72} justifyContent={'space-between'} display={{base:'none',md:'flex'}}>
                    <Nav/>
                    <Button
                      _hover={{}}
                      display={{base:'none',md:'block'}}
                      bgColor={theme.colors.sideBar.itemActive}
                      color={theme.colors.lightGreen}
                      borderRadius='full'
                      size='md'
                      onClick={() => {
                        history.push('/deposit');
                        sideBar.setActiveMenu('/deposit');
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
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label='Open menu'
                fontSize='lg'
                color='lightGreen'
                variant='ghost'
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </Box>
  );
});


