import { Flex, Box, useTheme, Icon, Center, useColorModeValue, Divider, Stack, Text } from '@chakra-ui/react';
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
         borderBottomWidth={1}
         py={5}
    >
      <Flex flexDirection='row'
            color={isOpen ? 'lightGreen' : ''}
            h={theme.faq.collapseHeight}
            cursor='pointer'>
        <Center mr={6}>
          <Icon as={isOpen ? MinusIcon : AddIcon} onClick={() => setOpen(!isOpen)} color={theme.colors.lightGreen} />
        </Center>
        <Center>
          <Text onClick={() => setOpen(!isOpen)} fontSize={'2xl'}>
            {title}
          </Text>
        </Center>
      </Flex>
      <Collapse isOpened={isOpen} offsetX={10}>
        <Box p={4} >
          <Box
            position={'relative'}
            _after={{
              content: `""`,
              position: 'absolute',
              left: 0,
              top: 'calc(10%)',
              height: '80%',
              borderLeftWidth:2 ,
              borderColor:theme.colors.lightGreen
            }}
            px={7}
            ml={20}
            fontSize={'lg'}
            color={theme.colors.gray[10]}>
            <blockquote>{body}</blockquote>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
