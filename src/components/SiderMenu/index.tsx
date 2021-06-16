import {
  Flex,
  Button,
  Image, useColorMode, Heading, Link, Stack, IconButton, useMediaQuery
} from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { ToolConfig } from '../../config/ToolConfig';
import { theme } from '@/lib/theme';
import { SunnyIcon, SunnyDarkIcon, MoonLightIcon, MoonDarkIcon } from '@/components/Icon';

export const SiderMenu = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

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
  return (
    <Flex>
      <Flex
        position='fixed'
        top={'0px'}
        left='0rem'
        align='center'
        flexDirection={'column'}
        h='100vh'
        width={'200px'}
        bgColor={theme.colors.sideBar.bg}
      >
        <Flex justify={{ base: 'center', md: 'start' }} mt={'21px'}>
          <Link to={'/'}>
            <Stack direction={'row'} alignItems={'center'} spacing={{ base: 2, sm: 4 }}>
              <Image src={'/images/logo_iotube.png'} />
              <Heading as={'h1'} fontSize={'xl'} display={{ base: 'none', md: 'block' }}>
              </Heading>
            </Stack>
          </Link>
        </Flex>
        <Flex flexDirection={'column'} justifyContent={'space-between'} w={'100%'} h={'100%'}>
          <Flex
            flexDirection={'column'}
            width={'100%'}
          >
            {
              ToolConfig.map((config) => {
                return (
                  <Button
                    variant='ghost'
                    aria-label='Home'
                    _hover={{ bg: theme.colors.sideBar.itemActive }}
                    w='100%'
                    minHeight={'50px'}
                    display={'flex'}
                    onClick={() => store.switchToRoute(config.path)}
                    key={config.name}
                    {...getItemActiveStyle(config.path)}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    marginTop={'32px'}
                    _focus={{}}
                  >
                    <Image
                      src={store.activeMenu === config.path ? `images/${config.iconActive}` : `images/${config.icon}`} />
                    <Text marginLeft={'15px'}
                          color={store.activeMenu === config.path ? '#33FF99' : 'white'}>{config.name}</Text>
                  </Button>
                );
              })
            }
          </Flex>
          <Flex height={'48px'} padding={'0 1rem'}>
            <IconButton
              _hover={{}}
              _focus={{}}
              _active={{}}
              padding={0}
              variant={'ghost'}
              width={'24px'}
              height={'24px'}
              size={'lg'}
              aria-label={'Toggle Light Mode'}
              onClick={toggleColorMode}
              icon={colorMode==='light'?<SunnyIcon w={'24px'} h={'24px'}/>:<SunnyDarkIcon w={'24px'} h={'24px'}/>}
            />
            <IconButton
              _active={{}}
              _hover={{}}
              _focus={{}}
              padding={0}
              variant={'ghost'}
              width={'24px'}
              height={'24px'}
              size={'lg'}
              aria-label={'Toggle Dark Mode'}
              onClick={toggleColorMode}
              icon={colorMode==='light'?<MoonLightIcon w={'24px'} h={'24px'}/>:<MoonDarkIcon w={'24px'} h={'24px'}/>}
            />
          </Flex>
        </Flex>

      </Flex>
    </Flex>
  );
};
export default observer(SiderMenu);
