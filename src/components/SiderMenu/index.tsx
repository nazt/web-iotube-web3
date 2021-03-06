import {
  Flex,
  useColorMode, IconButton, useTheme, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import React  from 'react';
import { observer } from 'mobx-react-lite';
import {
  SunnyIcon,
  SunnyDarkIcon,
  MoonLightIcon,
  MoonDarkIcon,
  ToggleRightIcon,
  ToggleLeftIcon,
} from '@/components/Icon';
import { useStore } from '@/store/index';
import {  SideItem } from '@/components/SiderMenu/SideItem';
import {withRouter} from 'react-router-dom'
import ToggleModeButton from '@/components/SiderMenu/ToggleModeButton';
export const SiderMenu = observer(({history}: {history: any}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const { sideBar } = useStore();
  const activeColor= useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)
  sideBar.activeMenu = history.location.pathname;
  sideBar.activeChildMenu = history.location.hash;

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
                return (
                  <SideItem menu={menu} key={menu.name} activeColor={activeColor}/>
                );
              }):null
            }
          </Flex>
          <Flex flexDirection={sideBar.isOpen ? 'row' : 'column'}
                width={'full'}
                p={'3'}>
            <ToggleModeButton/>
            {renderToggleButton()}
          </Flex>
        </Flex>
      </Flex>
    );
  };


  return (
    isShowSideBar ? renderSideBar() : null
  );
});
// @ts-ignore
export default withRouter(SiderMenu);
