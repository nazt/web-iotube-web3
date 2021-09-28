import { Button, Flex, HStack, Link, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { ChainState } from '@/store/lib/ChainState';
import { IotexMainnetConfig } from '../../../config/IotexMainnetConfig';
import { AddressState } from '@/store/standard/AddressState';
import { observer, useLocalStore } from 'mobx-react-lite';
import { AddAssetsGroup } from '@/components/AddAssetsGroup';
import { useStore } from '@/store/index';
import { metamaskUtils } from '@/lib/metaskUtils';
import { toast } from 'react-hot-toast';

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
  const { god } = useStore();

  const store = useLocalStore(() => ({
    tokens:[],
    isAdd:false,
    tokensForIotex() {
      return tokensForIotex.tokens.filter(t => t.destAddress);
    },
    setChain(val) {
      god.destChain = god.currentNetwork.chain.map[val];
      if (god.isConnect) {
        god.confirmDialogOpen.setValue(true);
      } else {
        toast('Please connect wallet first.');
      }
    },
    iotexTokensForNetwork() {
      return this.tokensForIotex().map((token) => getIotexToken(token.destAddress));
    },
    async addAll(tokens) {
      if (tokens[0].chainId === god.currentChain.chainId){
        const promises = tokens.filter(t => t.destAddress&&t.address!='0x0000000000000000000000000000000000000000').map(async (token) => metamaskUtils.addTokenToMetamask({
          tokenAddress: token.address,
          tokenSymbol: token.symbol,
          tokenDecimals: token.decimals,
          tokenImage: token.logoURI
        }));
        await Promise.all(promises);
      }else {
        toast('Please Switch Network first.');
      }
    }
  }));

  return (
    <>
      <Link href={networkConfig.explorerURL} isExternal _hover={{}} variant='black'>
        <Text mt={10} fontSize={{ base: '12', md: '1.25rem' }}>{title}</Text>
      </Link>
      <Table mt={5} width='100%'>
        <Thead>
          <Tr width='100%'>
            {
              headers.map((header, index) =>
                <Th width='50%' fontSize={{ base: '12', md: '1.25rem' }}>
                  {header}
                  <Button
                    onClick={() => store.addAll(index === 0 ? store.tokensForIotex() : store.iotexTokensForNetwork())}
                    display='inline-block' ml={5}>Add all</Button>
                </Th>
              )
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            store.tokensForIotex().map((token, index) => {
              return (
                <Tr as={Flex} justify='space-between' bg={bg} key={index}>
                  <Td width='50%'>
                    <HStack>
                      <Link
                        w={{ base: 12, md: 28 }}
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
                      <Link w={{ base: 12, md: 28 }} isExternal color={textColor}
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
});

