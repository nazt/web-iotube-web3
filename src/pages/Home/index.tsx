import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '@/store/index';
import {
  Image,
  Box,
  Center,
  Flex,
  Text,
  useTheme,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Button, useColorModeValue, Icon
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IotubeIcon } from '@/components/Icon';

export const Home = observer(() => {
  const { lang, sideBar } = useStore();
  const history = useHistory();
  const theme = useTheme();
  const textColor = useColorModeValue('darkLightGreen','lightGreen')
  return (
    <Box h={theme.content.height} bgImage={'/images/home_bg.png'}>
      <Center pt={{ base: 10, md: 20 }}>
        <Flex flexDirection="column" align='center' textAlign='center'>
          <Icon as={IotubeIcon} color={textColor} w={{ base: '3xs', md: '2xl' }} h={{ base: 16, md: 20 }}/>
          <Text my={{ base: 5, md: 10 }} color={theme.colors.gray[10]}>{lang.t('info.features')}</Text>
          <Text fontSize={{ base: 'md', md: '2xl' }}>{lang.t('info.summary')}<br/>{lang.t('info.summary.next')}</Text>
          <StatGroup mt={{ base: 8, md: 16 }} w='full'>
            <Stat>
              <StatNumber fontSize="2xl" color={textColor} fontWeight={100}>4</StatNumber>
              <StatLabel>{lang.t('info.chain')}</StatLabel>
            </Stat>
            <Stat>
              <StatNumber fontSize="2xl" color={textColor} fontWeight={100}>22</StatNumber>
              <StatLabel>{lang.t('info.assets')}</StatLabel>
            </Stat>
            <Stat>
              <StatNumber fontSize="2xl" color={textColor} fontWeight={100}>$5,000,000+</StatNumber>
              <StatLabel>{lang.t('info.total_value_locked')}</StatLabel>
            </Stat>
          </StatGroup>
          <Center w='full'>
            <Button onClick={() => {
              history.push('/tube');
              sideBar.setActiveMenu('/tube');
            }} my={20} w={{ base: 'full', md: 80 }} size="lg" variant="green">
              {lang.t('enter_app')}
            </Button>
          </Center>
        </Flex>
      </Center>
    </Box>
  );
});
