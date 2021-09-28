import React from 'react';
import { observer } from 'mobx-react-lite';

import { Box, Link, useColorModeValue } from '@chakra-ui/react';
import { ethTokensForIotex, iotexTokensForEth } from '@/constants/token/eth-iotex';
import { bscToIotexTokens, iotexBscNetTokens } from '@/constants/token/bsc-iotex';
import { polygonToIotexTokens, iotexPolygonTokens } from '@/constants/token/matic-iotex';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';
import { PolygonMainnetConfig } from '../../config/PolygonMainnetConfig';
import { TokenTable } from './components/TokenTable';
import { Text } from '@chakra-ui/layout';
import { useStore } from '@/store/index';
import { ETHProvider } from '@/components/EthProvider';


export const TokenList = observer(() => {

  const {lang} = useStore()

  return (
    <Box w={{base: '100%', md: '70%'}} mx={'auto'} overflow='hidden' mt={10}>
      <ETHProvider />
      <Text fontSize={{base:'1rem',md:"1.5rem"}} >{lang.t('asset.title')}</Text>
      <Box mt={2}>
        <Text display={{base:'block',md:'inline'}}>{lang.t('asset.supported')}</Text>
        <Link href={'https://github.com/iotexproject/ioTube/issues/new/choose'} isExternal _hover={{}}>
          <Text display={'inline'} ml={{base:0,md:2}} _hover={{}}>{lang.t('asset.start')}</Text>
        </Link>
      </Box>
      <TokenTable
        title={'Ethereum <-> IoTeX'}
        networkConfig={ETHMainnetConfig}
        headers={['On Ethereum','On IoTeX']}
        tokensForIotex={ethTokensForIotex}
        iotexTokensForNetwork={iotexTokensForEth}
      />

      <TokenTable
        title={'Binance Smart Chain <-> IoTeX'}
        networkConfig={BSCMainnetConfig}
        headers={['On BSC','On IoTeX']}
        tokensForIotex={bscToIotexTokens}
        iotexTokensForNetwork={iotexBscNetTokens}
      />

      <TokenTable
        title={'Polygon(Matic) <-> IoTeX'}
        networkConfig={PolygonMainnetConfig}
        headers={['On Polygon','On IoTeX']}
        tokensForIotex={polygonToIotexTokens}
        iotexTokensForNetwork={iotexPolygonTokens}
      />

    </Box>
  );
});
