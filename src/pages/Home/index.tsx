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
  Button
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export const Home = observer(() => {
  const { lang, sideBar } = useStore();
  const history = useHistory();
  const theme = useTheme();
  return (
    <Box h={theme.content.height} bgImage={'/images/home_bg.png'}>
      <Center pt={20}>
        <Flex flexDirection="column" textAlign="center">
          <Image alt="iotube logo" src="/images/logo_iotube.svg" h={20}/>
          <Text my={10} color={theme.colors.gray[10]}>{lang.t('info.features')}</Text>
          <Text fontSize="2xl">{lang.t('info.summary')}<br/>{lang.t('info.summary.next')}</Text>
          <StatGroup mt={16}>
            <Stat>
              <StatNumber fontSize="2xl" color="lightGreen" fontWeight={100}>4</StatNumber>
              <StatLabel>{lang.t('info.chain')}</StatLabel>
            </Stat>
            <Stat>
              <StatNumber fontSize="2xl" color="lightGreen" fontWeight={100}>22</StatNumber>
              <StatLabel>{lang.t('info.assets')}</StatLabel>
            </Stat>
            <Stat>
              <StatNumber fontSize="2xl" color="lightGreen" fontWeight={100}>200,000K+</StatNumber>
              <StatLabel>{lang.t('info.total_value_locked')}</StatLabel>
            </Stat>
          </StatGroup>
          <Center>
            <Button onClick={() => {
              history.push('/deposit');
              sideBar.setActiveMenu('/deposit');
            }} my={20} w="20rem" size="lg" variant="green">
              {lang.t('enter_app')}
            </Button>
          </Center>
        </Flex>
      </Center>
    </Box>
  );
});
