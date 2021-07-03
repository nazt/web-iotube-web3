import {
  Flex,
  useColorMode, IconButton, useTheme, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import {
  SunnyIcon,
  SunnyDarkIcon,
  MoonLightIcon,
  MoonDarkIcon,
  ToggleRightIcon,
  ToggleLeftIcon,
} from '@/components/Icon';
import { useStore } from '@/store/index';
import { ChildrenMenu, SideItem } from '@/components/SiderMenu/SideItem';

export const SiderMenu = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const { sideBar } = useStore();
  const activeColor= useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)

  useEffect(() => {
    if (history.location) {
      sideBar.activeMenu = history.location.pathname;
      sideBar.activeChildMenu = history.location.hash;

    }
  }, [history]);

  const isShowSideBar = useBreakpointValue({ base: false, md: true });

  const renderToggleButton = () => {
    return (
      <IconButton
        _focus={{}}
        variant={'unstyled'}
        fontSize={theme.iconSize.md}
        aria-label={'Toggle Dark Mode'}
        onClick={() => sideBar.isOpen = !sideBar.isOpen}
        icon={sideBar.isOpen ? <ToggleLeftIcon /> : <ToggleRightIcon />}
      />
    );
  };

  const renderSideBar = () => {
    return (
      <Flex
        hidden={!sideBar.isShow}
        position='fixed'
        top='0'
        left={0}
        align='center'
        flexDirection={'column'}
        h={'100vh'}
        width={sideBar.width}
        bgColor={colorMode === 'light' ? theme.sideBar.bg.light : theme.sideBar.bg.dark}
        px={2}
        shadow={colorMode === 'light' ? theme.shadows.lightShadow : theme.shadows.darkShadow}
      >
        <Flex flexDirection={'column'} justifyContent={'space-between'} mt={20} w={'100%'} h={'100%'}>
          <Flex
            flexDirection={'column'}
            pw={2}
          >
            {
             activeColor? sideBar.menus.map((menu) => {
               if (menu.children){
                 return (
                   <ChildrenMenu menu={menu} key={menu.name} activeColor={activeColor}/>
                 )
               }
                return (
                  <SideItem menu={menu} key={menu.name} activeColor={activeColor}/>
                );
              }):null
            }
          </Flex>
          <Flex flexDirection={sideBar.isOpen ? 'row' : 'column'}
                width={'100%'}
                p={'3'}>
            <IconButton
              _focus={{}}
              isActive={false}
              variant={'unstyled'}
              fontSize={theme.iconSize.md}
              aria-label={'Toggle Light Mode'}
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunnyIcon /> : <SunnyDarkIcon />}
            />
            <IconButton
              _focus={{}}
              variant={'unstyled'}
              fontSize={theme.iconSize.md}
              aria-label={'Toggle Dark Mode'}
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonLightIcon /> : <MoonDarkIcon />}
            />
            {renderToggleButton()}
          </Flex>
        </Flex>
      </Flex>
    );
  };


  return (
    isShowSideBar ? renderSideBar() : null
  );
};
export default observer(SiderMenu);
