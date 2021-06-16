import {
  Flex,
  Button,
  Image, useColorMode, Heading, Link, Stack, IconButton, Box
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
    <Flex
      position='fixed'
      top={0}
      left={0}
      align='center'
      flexDirection={'column'}
      h='100vh'
      width={'200px'}
      bgColor={theme.colors.sideBar.bg}
      px={2}
    >
      <Box align='center' justify={{ base: 'center', md: 'start' }} mt={'21px'}>
        <Link to={'/'}>
          <Stack direction={'row'} alignItems={'center'} spacing={{ base: 2, sm: 4 }}>
            <Image src={'/images/logo_iotube.svg'}/>
            <Heading as={'h1'} fontSize={'xl'} display={{ base: 'none', md: 'block' }}>
            </Heading>
          </Stack>
        </Link>
      </Box>
      <Flex flexDirection={'column'} justifyContent={'space-between'} mt={10} w={'100%'} h={'100%'}>
        <Flex
          flexDirection={'column'}
          width={'100%'}
          pw={'10px'}
        >
          {
            ToolConfig.map((config) => {
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
                >
                  <Image
                    src={store.activeMenu === config.path ? `images/${config.iconActive}` : `images/${config.icon}`}/>
                  <Text marginLeft={'15px'}
                        color={store.activeMenu === config.path ? '#33FF99' : 'white'}>{config.name}</Text>
                </Button>
              );
            })
          }
        </Flex>
        <Flex flexDirection={'row'}
              width={'100%'}
              p={'12px'}>
          <IconButton
            isActive={false}
            variant={'unstyled'}
            fontSize={theme.iconSize.md}
            aria-label={'Toggle Light Mode'}
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <SunnyIcon/> : <SunnyDarkIcon/>}
          />
          <IconButton
            variant={'unstyled'}
            fontSize={theme.iconSize.md}
            aria-label={'Toggle Dark Mode'}
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonLightIcon/> : <MoonDarkIcon/>}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default observer(SiderMenu);
