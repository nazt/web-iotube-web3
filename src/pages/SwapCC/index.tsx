import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Box,
  Center,
  Flex,
  Text,
  useTheme,
  Button, useColorModeValue, Icon, Container, Input, InputRightElement, Tag, Stack, InputGroup, Spacer, HStack
} from '@chakra-ui/react';
import { useStore } from '@/store/index';
import { ETHProvider } from '@/components/EthProvider';
import { BooleanState, NumberState } from '@/store/standard/base';
import BigNumber from 'bignumber.js';
import { BigNumberInputState } from '@/store/standard/BigNumberInputState';
import { MaxUint256 } from '@ethersproject/constants';
import { toast } from 'react-hot-toast';
import './index.scss';
import { CCRouterState } from '@/store/lib/CCRouterState';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { IotexTestnetConfig } from '../../config/IotexTestnetConfig';

export const SwapCC = observer(() => {
  const { god, token, lang } = useStore();
  const theme = useTheme();
  const home = useColorModeValue('white', theme.colors.bg.bg1);
  const homeShadow = useColorModeValue(theme.shadows.lightShadow, theme.shadows.darkShadow);
  const inputBg = useColorModeValue(theme.colors.gray[5], theme.colors.gray[8]);
  const inputColor = useColorModeValue(theme.colors.gray[6], theme.colors.gray[2]);

  const store = useLocalStore(() => ({
    isIotexNetwork: false,
    hasCCToken: false,
    routerProvider: null,
    amount: new BigNumberInputState({ value: new BigNumber(0) }),
    curToken: null,
    curWToken: null,
    curCCToken: null,
    curTokenIndex: new NumberState({ value: 0 }),
    approveLoading: new BooleanState(),
    approveLoadingContent: lang.t('deposit.approving'),
    confirmIsLoading: new BooleanState(),
    confirmLoadingText: lang.t('button.confirming'),
    isCCToken: false,
    setCurSourceToken(n, token) {
      this.curTokenIndex.setValue(n);
      this.amount = new BigNumberInputState({ value: new BigNumber(0) });
      this.curToken = token;
      this.curToken.network = god.currentNetwork;
    },
    maxCurTokenValue() {
      // iotx coin amount
      if (store.curToken?.symbol == IotexMainnetConfig.nativeCurrency.symbol) {
        let maxAmount = store.curToken?.balance.value.minus(new BigNumber(10 ** store.curToken?.balance.decimals));
        store.amount.setValue(maxAmount < 0 ? new BigNumber(0) : maxAmount);
      } else {
        store.amount.setValue(store.curToken?.balance.value);
      }
    },
    get shouldApprove() {
      if (this.isCCToken && store.isIotexNetwork && store.curToken.isEth()) {
        return this.amount?.value.comparedTo(this.curCCToken.allowanceForSwap.value) > 0;
      }
      if (this.isCCToken) return false;
      if (!this.curToken || this.curToken.isEth()) return false;
      return this.amount?.value.comparedTo(this.curToken.allowanceForSwap.value) > 0;
    },

    get state() {
      if (!god.currentNetwork.account) {
        return lang.t('input.wallet.not_connected');
      }

      if (!this.curToken) {
        return lang.t('input.token.unselected');
      }

      if (!this.routerProvider?.address && store.isIotexNetwork) {
        return lang.t('input.swap.invalid');
      }

      if (isNaN(Number(store.amount.value)) || store.amount.format == null || store.amount.format == 0) {
        return lang.t('input.amount.enter_value');
      }

      let balanceValue = this.isCCToken ? this.curCCToken?.balance.value : this.curToken.balance.value;
      if (this.amount.format < 0 || store.amount.value.comparedTo(balanceValue) > 0) {
        return lang.t('input.amount.invalid');
      }
      return '';
    },
    async onSwapApprove() {
      try {
        store.approveLoading.setValue(true);
        let approvedRes;
        if (this.isCCToken && store.isIotexNetwork && store.curToken.isEth()) {
          approvedRes = await store.curCCToken?.approve({ params: [god.currentChain.ccSwapRouter, MaxUint256] });
        } else {
          approvedRes = await store.curToken?.approve({ params: [store.curCCToken.address, MaxUint256] });
        }
        if (approvedRes) {
          store.approveLoadingContent = lang.t('button.waiting');
        }
        const receipt = await approvedRes.wait();
        if (receipt.status == 1) {
          if (store.isCCToken) {
            // @ts-ignore
            store.curCCToken?.allowanceForSwap.setValue(new BigNumber(MaxUint256));
          } else {
            // @ts-ignore
            store.curToken?.allowanceForSwap.setValue(new BigNumber(MaxUint256));
          }
          store.approveLoading.setValue(false);
        }
      } catch (e) {
        toast.error(`tokenContract.approve error ${e.message}`);
        store.approveLoading.setValue(false);
      }
    },
    async onSubmit() {
      const amountVal = store.amount.value.toFixed(0);
      try {
        store.confirmIsLoading.setValue(true);
        let res;
        if (!this.isCCToken) {
          if (this.curToken.isEth()) {
            res = await store.routerProvider.swapCoinForCrosschainCoin({
              params: [amountVal],
              options: { value: amountVal }
            });
          } else {
            res = await store.curCCToken.deposit({ params: [amountVal] });
          }
        } else {
          if (this.curToken.isEth()) {
            res = await store.routerProvider.swapCrosschainCoinForCoin({ params: [amountVal] });
          } else {
            res = await store.curCCToken.withdraw({ params: [amountVal] });
          }
        }
        if (res) {
          token.actionHash.setValue(res.hash);
        }
        const receipt = await res.wait();
        if (receipt.status == 1) {
          toast.success(`Your action hash: ${res.hash} sent successfully`, {
            style: {
              minWidth: '500px'
            }
          });
        }
        store.confirmIsLoading.setValue(false);
        god.updateTicker.setValue(god.updateTicker.value + 1);
        store.amount = new BigNumberInputState({ value: new BigNumber(0) });
      } catch (e) {
        store.confirmIsLoading.setValue(false);
        console.log(e);
        if (e.message) {
          toast.error(e.message);
        }
        if (e && e.data && e.data.message) {
          toast.error(e.data.message);
        }
      }
    }
  }));


  useEffect(() => {
    if (god.currentNetwork.account) {
      god.currentNetwork.loadBalance();
      token.loadCCSourceToken();
    }
  }, [god.updateTicker.value]);

  useEffect(() => {
    store.isIotexNetwork = [IotexMainnetConfig.chainId, IotexTestnetConfig.chainId].includes(god.currentChain.chainId);
    store.hasCCToken = !!god.currentChain.ccSwapTokensPairs.wTokens;
    if (!store.hasCCToken) return;
    if (god.currentNetwork.account) {
      store.curWToken = god.currentChain.ccSwapTokensPairs?.wTokens[0];
      store.curCCToken = god.currentChain.ccSwapTokensPairs?.ccTokens[0];
      token.loadCCSourceToken();
    }
    if ([IotexTestnetConfig.chainId, IotexMainnetConfig.chainId].includes(god.currentChain.chainId)) {
      store.routerProvider = new CCRouterState({
        network: god.currentNetwork,
        address: god.currentNetwork.currentChain.ccSwapRouter
      });
      store.curTokenIndex.setValue(0);
      store.curToken = god.currentNetwork.chain.current.Coin;
    } else {
      store.curTokenIndex.setValue(1);
      store.curToken = god.currentChain.ccSwapTokensPairs?.wTokens[0];
    }
  }, [god.currentNetwork, token.currentChain.chainId, god.currentNetwork.account, god.currentNetwork.chain.current.Coin.balance]);

  return (
    <Box h={theme.content.height} bgImage={'/images/home_bg.png'} pt={10} px={{ base: 2 }}>
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
        {/*<Box position='absolute' left={-4} top={-4}>*/}
        {/*  <Image borderRadius='full' boxSize={12} src={'/images/tokens/ctoken_logo.jpeg'} />*/}
        {/*</Box>*/}
        <HStack>
          <Text fontWeight='500' fontSize='md'>{lang.t('swap.ctoken.title')}</Text>
          <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
            Beta
          </Tag>
        </HStack>
        <Box my={8} fontSize='sm'>{lang.t('swap.ctoken.description')}</Box>
        {store.hasCCToken ?
          <Box>
            <Flex my={8}>
              <Box width='45%' className={`transition_box ${store.isCCToken ? 'transformer' : 'before'}`}>
                <HStack spacing={2}>
                  {store.isIotexNetwork &&
                  <Button variant={store.curTokenIndex.value == 0 ? 'opacity-primary' : 'opacity'}
                          onClick={() => store.setCurSourceToken(0, god.currentNetwork.chain.current.Coin)}>
                    <Image borderRadius='full' mr='2'
                           boxSize={theme.iconSize.md}
                           src={god.currentChain.nativeCurrency.logoURI} />{god.currentChain.nativeCurrency.symbol}
                  </Button>
                  }
                  <Button variant={store.curTokenIndex.value == 0 ? 'opacity' : 'opacity-primary'}
                          onClick={() => store.setCurSourceToken(1, store.curWToken)}>
                    <Image borderRadius='full' mr='2'
                           src={store.curWToken?.logoURI}
                           boxSize={theme.iconSize.md} />{store.curWToken?.symbol}
                  </Button>
                </HStack>
                <Box
                  bg={inputBg}
                  borderRadius={theme.borderRadius.sm}
                  color={inputColor}
                >
                  <Flex borderRadius='md' justify='space-between' px={{ base: 2, md: 4 }} pt={4} mt={4}>
                    <Text fontSize='md'>{store.isCCToken ? 'To' : 'From'}</Text>
                    <Center>
                      <Text fontSize='sm'>Balance: {store.curToken?.balance.format}</Text>
                    </Center>
                  </Flex>
                  <InputGroup>
                    <Input
                      variant='unstyled'
                      placeholder='0.0'
                      fontWeight={500}
                      fontSize='lg'
                      color={useColorModeValue(theme.colors.gray[4], 'white')}
                      type='number'
                      ml={{ base: 2, md: 4 }}
                      mr='2'
                      py={2}
                      value={store.amount?.format || ''}
                      onChange={(e) => store.amount.setFormat(e.target.value)}
                    />
                    {!store.isCCToken &&
                    <InputRightElement float={'right'} mr={{ base: 2, md: 4 }} cursor='pointer'
                                       zIndex={0}>
                      <Tag size='sm' variant='solid' bg={theme.colors.darkLightGreen} cursor='pointer'
                           onClick={() => store.maxCurTokenValue()}
                      >{'MAX'}</Tag>
                    </InputRightElement>
                    }
                  </InputGroup>
                </Box>
              </Box>

              <Spacer />

              <Center w={50} cursor='pointer' onClick={() => store.isCCToken = !store.isCCToken}>
                <Image mt={14} src={'images/icon_arrow_r_green.svg'} />
              </Center>

              <Spacer />
              {store.curCCToken &&
              <Box width='45%' className={`transition_box ${store.isCCToken ? 'transformer' : 'before'}`}>
                <Button variant='opacity-primary'>
                  <Image borderRadius='full' mr='2' boxSize={theme.iconSize.md}
                         src={store.curCCToken?.logoURI} />{store.curCCToken.symbol}</Button>
                <Box
                  bg={inputBg}
                  borderRadius={theme.borderRadius.sm}
                  color={inputColor}
                >
                  <Flex borderRadius='md' justify='space-between' px={{ base: 2, md: 4 }} pt={4} mt={4}>
                    <Text fontSize='md'>{store.isCCToken ? 'From' : 'To'}</Text>
                    <Center>
                      <Text fontSize='sm'>Balance: {store.curCCToken?.balance?.format}</Text>
                    </Center>
                  </Flex>
                  <Box>
                    <InputGroup>
                      <Input
                        variant='unstyled'
                        placeholder='0.0'
                        fontWeight={500}
                        fontSize='lg'
                        color={useColorModeValue(theme.colors.gray[4], 'white')}
                        type='number'
                        ml={{ base: 2, md: 4 }}
                        mr='2'
                        py={2}
                        value={store.amount?.format || ''}
                        onChange={(e) => store.amount.setFormat(e.target.value)}
                      />
                      {store.isCCToken &&
                      <InputRightElement float={'right'}
                                         mr={{ base: 2, md: 4 }} cursor='pointer'
                                         zIndex={0}>
                        <Tag size='sm' variant='solid' bg={theme.colors.darkLightGreen} cursor='pointer'
                             onClick={() => store.amount.setValue(store.curCCToken?.balance.value)}
                        >{'MAX'}</Tag>
                      </InputRightElement>
                      }
                    </InputGroup>
                  </Box>
                </Box>
              </Box>
              }
            </Flex>
            {!store.state && Boolean(store.shouldApprove) ?
              <Button
                isLoading={store.approveLoading.value}
                loadingText={store.approveLoadingContent}
                onClick={store.onSwapApprove}
                size='block'
                variant='green'
                disabled={store.approveLoading.value}
              >
                {lang.t('approve')}
              </Button> :
              <Button
                isLoading={store.confirmIsLoading.value}
                loadingText={store.confirmLoadingText}
                onClick={() => store.onSubmit()}
                size='block'
                variant='green'
                disabled={!!store.state || store.confirmIsLoading.value}
              >
                {store.state || lang.t('button.swap')}
              </Button>
            }
          </Box>
          :
          <Box my={8} fontSize='sm'>{lang.t('swap.ctoken.not_support')}</Box>
        }
      </Container>
    </Box>
  );
});
