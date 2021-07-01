import {
  Flex,
  Button,
  Image, useColorMode, IconButton, useTheme, useBreakpointValue
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Text } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import {
  SunnyIcon,
  SunnyDarkIcon,
  MoonLightIcon,
  MoonDarkIcon,
  ToggleRightIcon,
  ToggleLeftIcon
} from '@/components/Icon';
import { useStore } from '@/store/index';

export const SiderMenu = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const { sideBar } = useStore();

  const isShowSideBar = useBreakpointValue({ base: false, md: true });
  const renderToggleButton = () => {
    return (
      <IconButton
        _focus={{}}
        variant={'unstyled'}
        fontSize={theme.iconSize.md}
        aria-label={'Toggle Dark Mode'}
        onClick={() => sideBar.isOpen = !sideBar.isOpen}
        icon={sideBar.isOpen ? <ToggleLeftIcon/> : <ToggleRightIcon/>}
      />
    );
  };

  const renderSideBarItem = (menu) => {
    return (
      <Button
        fontSize={'15px'}
        variant='ghost'
        aria-label='Home'
        _hover={{ bg: theme.colors.sideBar.itemActive }}
        _focus={{}}
        fontWeight={400}
        onClick={() => {
          history.push(menu.path);
          sideBar.setActiveMenu(menu.path);
        }}
        key={menu.name}
        bgColor={menu.isActive ? theme.colors.sideBar.itemActive : 'none'}
        borderRadius={'15px'}
        justifyContent={sideBar.isOpen ? 'flex-start' : 'center'}
        mt={30}
      >
        <Image
          src={`images/${menu.iconActive}`}
          display={sideBar.activeMenu === menu.path ? 'block' : 'none'}
        />
        <Image
          src={`images/${menu.icon}`}
          display={sideBar.activeMenu !== menu.path ? 'block' : 'none'}
        />
        {sideBar.isOpen ? <Text marginLeft={'15px'}
                                color={sideBar.activeMenu === menu.path ? theme.colors.lightGreen : ''}>{menu.name}</Text> : null}
      </Button>
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
        <Flex flexDirection={'column'} justifyContent={'space-between'} mt={10} w={'100%'} h={'100%'}>
          <Flex
            flexDirection={'column'}
            pw={2}
          >
            {
              sideBar.menus.map((menu) => {
                return (
                  renderSideBarItem(menu)
                );
              })
            }
          </Flex>
          <Flex flexDirection={sideBar.isOpen ? 'row' : 'column'}
                width={'100%'}
                p={'12px'}>
            <IconButton
              _focus={{}}
              isActive={false}
              variant={'unstyled'}
              fontSize={theme.iconSize.md}
              aria-label={'Toggle Light Mode'}
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunnyIcon/> : <SunnyDarkIcon/>}
            />
            <IconButton
              _focus={{}}
              variant={'unstyled'}
              fontSize={theme.iconSize.md}
              aria-label={'Toggle Dark Mode'}
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonLightIcon/> : <MoonDarkIcon/>}
            />
            {renderToggleButton()}
          </Flex>
        </Flex>
      </Flex>
    );
  };

  useEffect(() => {
    if (history.location) {
      sideBar.activeMenu = history.location.pathname;
    }
  }, [history]);

  return (
    isShowSideBar ? renderSideBar() : null
  );
};
export default observer(SiderMenu);
