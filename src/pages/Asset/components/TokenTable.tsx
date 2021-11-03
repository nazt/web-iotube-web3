import { Flex, HStack, Link, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import React from 'react';
import { ChainState } from '@/store/lib/ChainState';
import { IotexMainnetConfig } from '../../../config/IotexMainnetConfig';
import { AddressState } from '@/store/standard/AddressState';
import { observer } from 'mobx-react-lite';
import { AddAssetsGroup } from '@/components/AddAssetsGroup';

interface TokenTableProps {
  title: string;
  networkConfig: ChainState;
  headers: string[];
  tokensForIotex: any;
  iotexTokensForNetwork: any;
}

export const TokenTable = observer(({
                                      title,
                                      networkConfig,
                                      headers,
                                      tokensForIotex,
                                      iotexTokensForNetwork
                                    }: TokenTableProps) => {
  const bg = useColorModeValue('white', 'bg.bg1Alpha20');
  const textColor = useColorModeValue('darkLightGreen', 'lightGreen');
  tokensForIotex.tokens.forEach(token => {
    const address = new AddressState({ value: token.destAddress });
    token.iotexAddress = address.anotherAddress;
    token['chainId'] = networkConfig.chainId;
  });
  const getIotexToken = (address) => {
    const iotexToken = iotexTokensForNetwork.tokens.find(t => t.address === address);
    iotexToken['chainId'] = IotexMainnetConfig.chainId;
    return iotexToken;
  };


  return (
    <>
      <Link href={networkConfig.explorerURL} isExternal _hover={{}} variant='black'>
        <Text mt={10} fontSize={{base:'12', md:'1.25rem'}}>{title}</Text>
      </Link>
      <Table mt={5} width='100%'>
        <Thead>
          <Tr width='100%'>
            {
              headers.map(header => <Th width='50%'  fontSize={{base:'12', md:'1.25rem'}}> {header}</Th>)
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            tokensForIotex.tokens.filter(t => t.destAddress).map((token, index) => {
              return (
                <Tr as={Flex} justify='space-between' bg={bg}>
                  <Td width='50%'>
                    <HStack>
                      <Link
                        w={{base:12, md:28}}
                        href={token.address === '0x0000000000000000000000000000000000000000' ? networkConfig.explorerURL : `${networkConfig.explorerURL}/token/${token.address}`}
                        _hover={{}}
                        variant='green'
                        isExternal
                      >
                        {token.symbol}
                      </Link>
                      <AddAssetsGroup token={token} />
                    </HStack>
                  </Td>
                  <Td width='50%'>
                    <HStack>
                      <Link w={{base:12, md:28}} isExternal color={textColor}
                            href={`${IotexMainnetConfig.explorerURL}/token/${token.iotexAddress}`}>
                        {getIotexToken(token.destAddress)?.symbol}
                      </Link>
                      <AddAssetsGroup token={getIotexToken(token.destAddress)} />
                    </HStack>
                  </Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </>
  );
})

