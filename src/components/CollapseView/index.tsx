import { Flex, Box, useTheme, Icon, Center, useColorModeValue, Text, useBreakpointValue } from '@chakra-ui/react';
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
    <Box mx={{ base: 0, md: 10 }}
         borderBottomWidth={1}
         py={{ base: 3, md: 5 }}
    >
      <Flex flexDirection='row'
            color={isOpen ? useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen) : ''}
            minH={theme.faq.collapseHeight}
            cursor='pointer'>
        <Center mr={6}>
          <Icon as={isOpen ? MinusIcon : AddIcon} onClick={() => setOpen(!isOpen)} color={useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)} />
        </Center>
        <Center>
          <Text onClick={() => setOpen(!isOpen)} fontSize={{ md: '2xl', base: 'lg' }}>
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
              top: useBreakpointValue({base: 'calc(3%)', md: 'calc(10%)'}),
              height: useBreakpointValue({base: '94%', md: '80%'}),
              borderLeftWidth:2 ,
              borderColor:useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)
            }}
            pl={7}
            pr={{ base: 0, md: 7 }}
            ml={{ base: 0, md: 20 }}
            fontSize={'lg'}
            color={theme.colors.gray[10]}>
            <blockquote>{body}</blockquote>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
