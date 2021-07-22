import React from 'react';
import { observer } from 'mobx-react-lite';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { ethTokensForIotex, iotexTokensForEth } from '@/constants/token/eth-iotex';
import { bscToIotexTokens, iotexBscNetTokens } from '@/constants/token/bsc-iotex';
import { polygonToIotexTokens, iotexPolygonTokens } from '@/constants/token/matic-iotex';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';
import { PolygonMainnetConfig } from '../../config/PolygonMainnetConfig';
import { TokenTable } from './components/TokenTable';


export const TokenList = observer(() => {

  return (
    <Box w={'70%'} mx={'auto'} mt={10}>
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
