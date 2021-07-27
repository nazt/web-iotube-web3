import { Flex, Link, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { ChainState } from '@/store/lib/ChainState';
import { IotexMainnetConfig } from '../../../config/IotexMainnetConfig';
import { AddressState } from '@/store/standard/AddressState';
import { useStore } from '@/store/index';

interface TokenTableProps {
  title: string;
  networkConfig: ChainState;
  headers: string[];
  tokensForIotex:any;
  iotexTokensForNetwork:any;
  showSupport?:boolean
}

export const TokenTable = ({ title, networkConfig, headers,tokensForIotex,iotexTokensForNetwork,showSupport=false }: TokenTableProps) => {
  const bg = useColorModeValue('white', 'bg.bg1Alpha20');
  const textColor = useColorModeValue('darkLightGreen', 'lightGreen');
  tokensForIotex.tokens.forEach(token=>{
    const address = new AddressState({value:token.destAddress})
    token.iotexAddress = address.anotherAddress;
  })
  const getIotexToken=(address)=>{
    return iotexTokensForNetwork.tokens.find(t => t.address === address)
  }

  const {lang} = useStore()

  return (
    <>
      <Link href={networkConfig.explorerURL} isExternal _hover={{}} variant='black'>
        <Text mt={10} fontSize={'1.25rem'}>{title}</Text>
      </Link>
      {
        showSupport?(
          <Box mt={2}>
            <Text display={{base:'block',md:'inline'}}>{lang.t('asset.supported')}</Text>
            <Link href={'https://github.com/iotexproject/ioTube/issues/new/choose'} isExternal _hover={{}}>
              <Text display={'inline'} ml={{base:0,md:2}} _hover={{}}>{lang.t('asset.start')}</Text>
            </Link>
          </Box>
        ):null
      }
      <Table mt={5}>
        <Thead>
          <Tr as={Flex} justify='space-between' bg={bg} fontSize={600}>
            {
              headers.map(header => <Th flex='1.4'> {header}</Th>)
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            tokensForIotex.tokens.filter(t=>t.destAddress).map((token, index) => {
              return (
                <Tr as={Flex} justify='space-between' bg={bg}>
                  <Td flex='1.4'>
                    <Link href={token.address==='0x0000000000000000000000000000000000000000'?networkConfig.explorerURL:`${networkConfig.explorerURL}/token/${token.address}`}
                          _hover={{}}
                          variant='green'
                          isExternal
                    >
                      {token.symbol}
                    </Link>
                  </Td>
                  <Td flex='1.4'>

                    <Link isExternal color={textColor} href={`${IotexMainnetConfig.explorerURL}/token/${token.iotexAddress}`}>
                      {getIotexToken(token.destAddress)?.symbol}
                    </Link>
                  </Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </>
  );
};
