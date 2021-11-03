import { ETHProvider } from '@/components/EthProvider';
import {
  Container,
  HStack, Icon, Image,
  Input,
  InputGroup,
  InputRightAddon, Link, List, ListItem,
  Tag, TagLeftIcon,
  Text,
  useColorModeValue,
  useTheme
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/layout';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons';
import { StringState } from '@/store/standard/base';


export const Wallets = observer(() => {
  const theme = useTheme();
  const home = useColorModeValue('white', theme.colors.bg.bg1);
  const homeShadow = useColorModeValue(theme.shadows.lightShadow, theme.shadows.darkShadow);
  const inputBg = useColorModeValue(theme.colors.gray[5], theme.colors.gray[8]);
  const buttonGreen = useColorModeValue('darkLightGreen', 'lightGreen');
  const { lang, wallets, god } = useStore();

  const store = useLocalObservable(() => ({
    searchAddress: new StringState(),
    keyword: new StringState(),
    get tokens() {
      if (!wallets.iotexAllToken) return [];
      return wallets.iotexAllToken
        .filter((i) => i.symbol.toLowerCase().includes(store.keyword.value.toLowerCase()))
        .sort((a, b) => b.balance.value && b.balance.value?.comparedTo(a.balance?.value));
    },
    loadSearchBalance() {
      wallets.loadTokensBalance(store.searchAddress.value);
    }
  }));

  useEffect(() => {
    if (store.searchAddress.value || god.currentNetwork.account) {
      wallets.loadTokensBalance(store.searchAddress.value || god.currentNetwork.account);
    }
  }, [god.updateTicker.value, store.searchAddress.value]);

  return (
    <Box bgImage={'/images/home_bg.png'} pt={10} px={{ base: 2 }}>
      <ETHProvider />
      <Container
        maxW='container.md'
        mt={8}
        px={{ base: 2, md: 30 }}
        py={30}
        borderRadius={theme.borderRadius.sm}
        boxShadow={homeShadow}
        bg={home}
        position='relative'
      >
        <HStack>
          <Text fontWeight='500' fontSize='md'>Wallet</Text>
          <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
            Beta
          </Tag>
        </HStack>
        <Box my={8} fontSize='sm'>{lang.t('wallets.description')}
          <Link href={'/assets'}>
            <Text display={'inline'} _hover={{}}>here.</Text>
          </Link>
        </Box>

        <HStack>
          <Box w={{ base: 'auto', md: '200px' }}>Wallet Address: </Box>
          <InputGroup>
            <Input borderRadius='lg' bg={inputBg}
                   placeholder={god.currentNetwork.account || ''}
                   value={store.searchAddress.value}
                   onChange={(e) => store.searchAddress.setValue(e.target.value)} />
            <InputRightAddon cursor='pointer' color={'white'} bg={buttonGreen} borderColor={buttonGreen}
                             children='Search'
                             onClick={() => store.loadSearchBalance()} />
          </InputGroup>
        </HStack>
        <Box bg={inputBg} borderRadius='lg' mt={6}>
          <List spacing={5} padding={4} maxH='500px' overflowY='scroll'>
            {store.tokens.map((i) => (
              <ListItem opacity={i.isMaintained ? '0.5' : '1'} key={i.address} display='flex'
                        alignItems='center' justifyContent='space-between'>
                <Box display='flex' alignItems='center'>
                  <Image borderRadius='full' boxSize='24px' src={i.logoURI} mr='4'
                         fallbackSrc='https://via.placeholder.com/150' />
                  {i.symbol}
                  {i.isMaintained &&
                  <Tag isExternal ml={4} colorScheme='orange'><TagLeftIcon boxSize='12px' as={InfoIcon} /> Under
                    Maintenance</Tag>}
                  {i.quickSwap && <Link href={i.quickSwap} isExternal ml={4} fontSize='sm'>{lang.t('token.quick_swap', {
                    tokenA: i.quickSwapFrom,
                    tokenB: i.symbol
                  })} <Icon as={ExternalLinkIcon} mb={1} /></Link>}
                </Box>

                <Box>
                  <Text>{i.balance.format}</Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
});
