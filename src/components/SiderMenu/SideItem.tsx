import { useStore } from '@/store/index';
import { Button, Icon, Image, useTheme } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const SideItem=({menu,activeColor})=>{
  const { sideBar } = useStore();
  const theme = useTheme();
  const history = useHistory();

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
      w={'100%'}
    >
      <Icon as={menu.icon} color={sideBar.activeMenu!==menu.path?theme.colors.gray:activeColor}/>
      {sideBar.isOpen ? <Text marginLeft={'15px'}
                              color={sideBar.activeMenu===menu.path?activeColor:''}>{menu.name}</Text> : null}

    </Button>
  )
}
