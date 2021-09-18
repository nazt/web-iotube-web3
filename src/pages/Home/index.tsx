import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '@/store/index';
import {
  Box,
  Center,
  Flex,
  Text,
  useTheme,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Button, useColorModeValue, Icon, HStack
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IotubeIcon } from '@/components/Icon';
import { metamaskUtils } from '@/lib/metaskUtils';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { BooleanState } from '@/store/standard/base';
import { bscToIotexTokens } from '@/constants/token/bsc-iotex';
import { ethTokensForIotex } from '@/constants/token/eth-iotex';
import { polygonToIotexTokens } from '@/constants/token/matic-iotex';

export const Home = observer(() => {
  const { lang, sideBar } = useStore();
  const history = useHistory();
  const theme = useTheme();
  const textColor = useColorModeValue('darkLightGreen', 'lightGreen');

  const store = useLocalObservable(() => ({
    addNetworkLoading: new BooleanState(),
    // @ts-ignore
    totalAssetsNums: bscToIotexTokens.tokens.concat(ethTokensForIotex.tokens).concat(polygonToIotexTokens.tokens).length,
    goTube() {
      history.push('/tube');
      sideBar.setActiveMenu('/tube');
    },
    async onConfirm() {
      this.addNetworkLoading.setValue(true);
      await metamaskUtils.addNetwork({
        chainId: IotexMainnetConfig.chainId,
        blockExplorerUrls: [IotexMainnetConfig.explorerURL],
        chainName: IotexMainnetConfig.name,
        nativeCurrency: {
          decimals: IotexMainnetConfig.Coin.decimals || 18,
          name: IotexMainnetConfig.Coin.symbol,
          symbol: IotexMainnetConfig.Coin.symbol
        },
        rpcUrls: [IotexMainnetConfig.rpcUrl]
      });
      this.addNetworkLoading.setValue(false);
    }
  }));

  return (
    <Box h={theme.content.height} bgImage={'/images/home_bg.png'}>
      <Center pt={{ base: 10, md: 20 }}>
        <Flex flexDirection='column' align='center' textAlign='center'>
          <Icon as={IotubeIcon} color={textColor} w={{ base: '3xs', md: '2xl' }} h={{ base: 16, md: 20 }} />
          <Text my={{ base: 5, md: 10 }} color={theme.colors.gray[10]}>{lang.t('info.features')}</Text>
          <Text fontSize={{ base: 'md', md: '2xl' }}>{lang.t('info.summary')}<br />{lang.t('info.summary.next')}</Text>
          <StatGroup mt={{ base: 8, md: 16 }} w='full'>
            <Stat>
              <StatNumber fontSize='2xl' color={textColor} fontWeight={100}>4</StatNumber>
              <StatLabel>{lang.t('info.chain')}</StatLabel>
            </Stat>
            <Stat>
              <StatNumber fontSize='2xl' color={textColor} fontWeight={100}>{store.totalAssetsNums}</StatNumber>
              <StatLabel>{lang.t('info.assets')}</StatLabel>
            </Stat>
            <Stat>
              <StatNumber fontSize='2xl' color={textColor} fontWeight={100}>$50,000,000+</StatNumber>
              <StatLabel>{lang.t('info.total_value_locked')}</StatLabel>
            </Stat>
          </StatGroup>
          <Center mt={{base: 10, md: 20}}>
            <HStack w='full' spacing={{ base: 2, md: 6 }}>
              <Button onClick={() => store.goTube()} w={{ base: 40, md: 60 }} size='lg' variant='green'>
                {lang.t('enter_app')}
              </Button>
            </HStack>
          </Center>
          <Center my={8}>
            <Text as='ins' cursor='pointer' color={useColorModeValue('darkLightGreen', 'lightGreen')}
                  onClick={() => store.onConfirm()}
                  w={{ base: 52, md: 60 }} size='lg' variant='green-border'>
              {lang.t('home.button.add_iotex_net')}
            </Text>
          </Center>

        </Flex>
      </Center>
    </Box>
  );
});
