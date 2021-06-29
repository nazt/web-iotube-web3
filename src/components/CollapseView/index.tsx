import { Flex, Box, useTheme, Icon, Center, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

interface IComponentProps {
  title: string;
  body: Array<JSX.Element> | JSX.Element;
}

export const CollapseView = (props: IComponentProps) => {
  const { title, body } = props;
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box mx={10}
         my={4}
         bg={useColorModeValue(theme.sideBar.bg.light, theme.sideBar.bg.dark)}
         borderRadius={theme.borderRadius.sm}>
      <Flex flexDirection="row"
            color={isOpen ? 'lightGreen' : ''}
            h={theme.faq.collapseHeight}
            bg={useColorModeValue(theme.sideBar.bg.light, theme.sideBar.bg.dark)}
            boxShadow={useColorModeValue(theme.shadow.light, '')}
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
        <Box bg={useColorModeValue(theme.sideBar.bg.light, theme.sideBar.bg.dark)}
             p={4}
             borderBottomRadius={theme.borderRadius.sm}
             color={theme.colors.gray[10]}>
          <blockquote>{body}</blockquote>
        </Box>
      </Collapse>
    </Box>
  );
};
