import { Flex, Box, useColorMode, useTheme, Icon, Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';

import './index.scss';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

interface IComponentProps {
  title: string;
  body: Array<JSX.Element> | JSX.Element;
}

export const CollapseView = (props: IComponentProps) => {
  const { title, body } = props;
  const [isOpen, setOpen] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <Box mx={10}
         my={4}
         borderRadius={theme.borderRadius.sm}
         bg={colorMode === 'light' ? theme.sideBar.bg.light : theme.sideBar.bg.dark}>
      <Flex flexDirection="row"
            color={isOpen ? 'lightGreen' : ''}
            h={theme.faq.collapseHeight}
            bg={theme.faq.titleBg.dark}
            borderRadius={theme.borderRadius.sm}
            cursor="pointer">
        <Center mx={4}>
          <Icon as={isOpen ? MinusIcon : AddIcon} onClick={() => setOpen(!isOpen)}/>
        </Center>
        <Center>
        <span className="c-white-10 text-2xl mb-0" onClick={() => setOpen(!isOpen)}>
          {title}
        </span>
        </Center>
      </Flex>
      <Collapse isOpened={isOpen}>
        <Box bg={theme.faq.contentBg.dark} p={4} borderRadius={theme.borderRadius.sm} color={theme.colors.gray[10]}>
          <blockquote>{body}</blockquote>
        </Box>
      </Collapse>
    </Box>
  );
};
