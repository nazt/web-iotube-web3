import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { Button, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { theme } from '@/lib/theme';

export const Nav = () => {
  const { sideBar } = useStore();
  const history = useHistory();
  const activeColor= useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)

  useEffect(() => {
    if (history.location) {
      sideBar.activeMenu = history.location.pathname;
    }
  }, [history]);

  return (
    <>
      {
        sideBar.headMenus.map((nav) => {
          return (
            <Button
              key={nav.name}
              _focus={{}}
              _hover={{}}
              variant={'none'}
              color={sideBar.activeMenu===nav.path?activeColor:theme.colors.gray}
              height={'100%'}
              position={'relative'}
              onClick={()=>{
                history.push(nav.path);
                sideBar.setActiveMenu(nav.path);
              }}
              _after={sideBar.activeMenu===nav.path?{
                content: `""`,
                position: 'absolute',
                bottom: 0,
                width: '50%',
                borderBottomWidth: 2,
                borderColor: activeColor
              }:{}}
            >
              {nav.name}
            </Button>
          );
        })
      }
    </>
  );
};
export default observer(Nav);
