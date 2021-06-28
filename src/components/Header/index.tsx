import React from "react";
import {
  AiFillHome,
  AiOutlineInbox,
  AiOutlineMenu,
  BsFillCameraVideoFill,
  FaHeart,
  FaMoon,
  FaSun
} from 'react-icons/all';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Box, Button, chakra, CloseButton, Flex, Icon,
  IconButton, useColorMode, useColorModeValue, useDisclosure, VStack, HStack, Link, Stack, useTheme, Image
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import Logo from "../SiderMenu/Logo";
import { WalletInfo } from "../WalletInfo";
import { DesktopNav } from '@/components/Header/DesktopNav';
import { ToolConfig } from '../../config/ToolConfig';
import { theme } from '@/lib/theme';
import { Text } from '@chakra-ui/layout';
import { useHistory } from 'react-router-dom';

export const Header = observer(() => {
  const mobileNav = useDisclosure();
  const history = useHistory();
  const theme = useTheme();
  const [y, setY] = React.useState(0);
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

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const MobileNavContent = (
    <VStack
      pos="absolute"
      zIndex={10000}
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={theme.colors.header.bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />

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
    </VStack>
  );
  return (
    <Box pos="relative">
      <chakra.header
        transition="box-shadow 0.2s"
        bg={theme.colors.header.bg}
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx={6}>
          <Flex w="full" h="full" align="center" justify="space-between">
            <Flex align="center">
              <Link href="/">
                <HStack>
                  <Logo />
                </HStack>
              </Link>
            </Flex>

            <Flex
              justify="flex-end"
              w="full"
              maxW="824px"
              align="center"
              color="gray.400"
            >
              <Stack direction={'row'} align={'center'} spacing={8} flex={{ base: 1, md: 'auto' }} justify={'flex-end'}>
                <DesktopNav display={{ base: 'none', md: 'flex' }} />
              </Stack>
              <WalletInfo />
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </Box>
  );
});


