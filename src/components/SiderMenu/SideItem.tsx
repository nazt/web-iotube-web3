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
  useColorMode, Tooltip, AccordionIcon
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const SideItem = observer(({ menu, activeColor }: { menu: any, activeColor: string }) => {
  const { sideBar } = useStore();
  const theme = useTheme();
  const history = useHistory();
  const colorMode = useColorMode();

  return (
    <Tooltip label={menu.name} isDisabled={sideBar.isOpen} fontSize={'md'} placement={'right'} bg={theme.colors.bg.bg1}>

      <Accordion allowToggle mt={{base:4,md:8}}>
        <AccordionItem
          border="none"
          borderRadius='2xl'
          bg={menu.isActive ? theme.colors.sideBar.itemActive : 'none'}
          _hover={{ bg: theme.colors.sideBar.itemActive }}
        >
          <AccordionButton
            justifyContent={sideBar.isOpen?'flex-start':'center'}
            minH='12'
            _focus={{ shadow: 'none' }}
            onClick={() => {
              if (menu.children&&menu.children.length > 0) {
                history.push(`${menu.path}${menu.children[0].path}`);
                sideBar.setActiveMenu(menu.path);
                sideBar.setActiveChildMenu(menu.children[0].path);
                return;
              }
              if (menu._blank){
                return window.open(menu.path)
              }
              history.push(menu.path)
              sideBar.setActiveMenu(menu.path);
            }}
          >
            <Center>
              <Icon as={menu.icon} color={sideBar.activeMenu !== menu.path ? theme.colors.gray : activeColor}/>
              {sideBar.isOpen ? <Text marginLeft={'4'}
                                      color={sideBar.activeMenu === menu.path ? activeColor : ''}>{menu.name}</Text> : null}
              {
                sideBar.isOpen&&menu.children
                  ? <AccordionIcon mx={5} color={sideBar.activeMenu !== menu.path ? theme.colors.gray : activeColor} boxSize="5"/>
                  : null
              }
            </Center>
          </AccordionButton>
          {
            menu.children?(
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
            ):null
          }
        </AccordionItem>
      </Accordion>
    </Tooltip>

  );
});
