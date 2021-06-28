import {
  Flex,
  Button,
  Image, useColorMode, IconButton, useTheme
} from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { ToolConfig } from '../../config/ToolConfig';
import { SunnyIcon, SunnyDarkIcon, MoonLightIcon, MoonDarkIcon } from '@/components/Icon';

export const SiderMenu = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

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
      position='absolute'
      top="4.5rem"
      left={0}
      align='center'
      flexDirection={'column'}
      h={theme.content.height}
      width={'200px'}
      bgColor={colorMode === 'light' ? theme.sideBar.bg.light : theme.sideBar.bg.dark}
      px={2}
      zIndex={1}
    >
      <Flex flexDirection={'column'} justifyContent={'space-between'} w={'100%'} h={'100%'}>
        <Flex
          flexDirection={'column'}
          pw={2}
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
                        color={store.activeMenu === config.path ? theme.colors.lightGreen: ''}>{config.name}</Text>
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
