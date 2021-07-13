import { useStore } from '@/store/index';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Icon,
  Image,
  Center,
  HStack,
  useTheme,
  useColorMode
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowDownIcon } from '@/components/Icon';
import { observer } from 'mobx-react-lite';

export const SideItem = observer(({ menu, activeColor }: { menu: any, activeColor: string }) => {
  const { sideBar } = useStore();
  const theme = useTheme();
  const history = useHistory();

  return (
    <Button
      fontSize={'md'}
      variant='ghost'
      aria-label='Home'
      _hover={{ bg: theme.colors.sideBar.itemActive }}
      _focus={{}}
      fontWeight={400}
      onClick={() => {
        if (menu._blank) {
          return window.open(menu.path);
        }
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
      <Icon as={menu.icon} color={sideBar.activeMenu !== menu.path ? theme.colors.gray : activeColor}/>
      {sideBar.isOpen ? <Text marginLeft={'15px'}
                              color={sideBar.activeMenu === menu.path ? activeColor : ''}>{menu.name}</Text> : null}

    </Button>
  );
});

export const ChildrenMenu = observer(({ menu, activeColor }: { menu: any, activeColor: string }) => {
  const theme = useTheme();
  const { sideBar } = useStore();
  const history = useHistory();
  const colorMode = useColorMode();

  return (
    <Accordion allowToggle mt='8' index={menu.isActive ? 0 : -1}>
      <AccordionItem
        border="none"
        borderRadius='2xl'
        bg={menu.isActive ? theme.colors.sideBar.itemActive : 'none'}
        _hover={{ bg: theme.colors.sideBar.itemActive }}
      >
        <AccordionButton
          minH='12'
          _focus={{ shadow: 'none' }}
          onClick={() => {
            if (menu.children.length > 0) {
              history.push(`${menu.path}${menu.children[0].path}`);
              sideBar.setActiveMenu(menu.path);
              sideBar.setActiveChildMenu(menu.children[0].path);
            }
          }}
        >
          <Center>
            <Icon as={menu.icon} color={sideBar.activeMenu !== menu.path ? theme.colors.gray : activeColor}/>
            {sideBar.isOpen ? <Text marginLeft={'4'}
                                    color={sideBar.activeMenu === menu.path ? activeColor : ''}>{menu.name}</Text> : null}
            {
              sideBar.isOpen
                ? <ArrowDownIcon color={sideBar.activeMenu !== menu.path ? theme.colors.gray : activeColor} boxSize="5"/>
                : null
            }
          </Center>
        </AccordionButton>
        <AccordionPanel
          display={sideBar.isOpen ? 'block' : 'none'}
        >
          {
            menu.children.map(item => (
              <HStack
                key={item.name}
                ml="10"
                my="3"
                cursor="pointer"
                onClick={() => {
                  history.push(`${menu.path}${item.path}`);
                  sideBar.setActiveMenu(menu.path);
                  sideBar.setActiveChildMenu(item.path);
                }}
              >
                <Image
                  srcSet={
                    sideBar.activeChildMenu === item.path
                      ? item.icon
                      : colorMode.colorMode === 'dark' ? item.iconInactivatedLight : item.iconInactivatedDark
                  }
                  boxSize='5'
                />
                <Text ml='2.5' fontSize='md'
                      color={sideBar.activeChildMenu === item.path ? activeColor : ''}>{item.name}</Text>
              </HStack>
            ))
          }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});
