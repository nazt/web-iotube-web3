import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import {
  Box,
  Container,
  FormControl,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Image,
  Icon,
  Button,
  Stack,
  Textarea,
  useColorModeValue,
  useTheme,
  Tag, chakra, Alert, CloseButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody
} from '@chakra-ui/react';
import { Text, Center } from '@chakra-ui/layout';
import { ChevronDownIcon, CopyIcon, QuestionOutlineIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { TokenListModal } from '@/components/TokenListModal';
import { useStore } from '@/store/index';
import { BigNumberInputState } from '@/store/standard/BigNumberInputState';
import { BooleanState } from '@/store/standard/base';
import { TokenState } from '@/store/lib/TokenState';
import NetworkHeader from '@/components/NetworkHeader';
import BigNumber from 'bignumber.js';
import { ConfirmModal } from '@/components/ConfirmModal';
import { CompleteModal } from '@/components/CompleteModal';
import { toast } from 'react-hot-toast';
import { ETHProvider } from '@/components/EthProvider';
import { MaxUint256 } from '@ethersproject/constants';
import EnterSvg from '../../../public/images/enter.svg';
import { isAddress as isEthAddress } from '@ethersproject/address';
import { HistoryActionModal } from './components/HistoryActionModal';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { IotexTestnetConfig } from '../../config/IotexTestnetConfig';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';

export const Deposit = observer(() => {
  const { god, token, lang, deposit } = useStore();

  const theme = useTheme();
  const home = useColorModeValue('white', theme.colors.bg.bg1);
  const homeShadow = useColorModeValue(theme.shadows.lightShadow, theme.shadows.darkShadow);
  const inputBg = useColorModeValue(theme.colors.gray[5], theme.colors.gray[8]);
  const inputColor = useColorModeValue(theme.colors.gray[6], theme.colors.gray[2]);

  const store = useLocalStore(() => ({
    isOpenTokenList: new BooleanState(),
    approveLoading: new BooleanState(),
    approveLoadingContent: lang.t('deposit.approving'),
    confirmIsLoading: new BooleanState(),
    confirmLoadingText: lang.t('button.confirming'),
    showAddressToolTip: new BooleanState(),
    isShowAlert: new BooleanState(),
    showConnector() {
      god.setShowConnecter(true);
    },
    openTokenList() {
      store.isOpenTokenList.setValue(true);
    },
    onSelectToken(t: TokenState) {
      deposit.curToken = t;
      deposit.amount.setDecimals(t.decimals);
    },
    async onCashierApprove() {
      try {
        store.approveLoading.setValue(true);
        // @ts-ignore
        const approvedRes = await token.approve(MaxUint256, deposit.curToken);
        if (approvedRes) {
          store.approveLoadingContent = lang.t('button.waiting');
        }
        const receipt = await approvedRes.wait();
        console.log(`approve receipt:`, receipt);
        if (receipt.status == 1) {
          store.approveLoading.setValue(false);
          // @ts-ignore
          deposit.curToken.allowanceForCashier.setValue(new BigNumber(MaxUint256));
        }
        console.log('allowance Cashier new ---->', deposit.curToken.allowanceForCashier.format);
      } catch (e) {
        // message.error(`tokenContract.approve error ${e.message}`);
        store.approveLoading.setValue(false);
      }
    },
    async onSubmit() {
      const amountVal = deposit.amount.value.toFixed(0);
      let options = { value: token.currentCrossChain?.cashier.depositFee.value.toFixed(0) };
      if (deposit.curToken.isEth()) {
        options = { value: deposit.amount.value.plus(token.currentCrossChain?.cashier.depositFee.value).toFixed() };
      }
      let receiverAddress = deposit.receiverAddress.ethAddress;
      let fromAddress = deposit.curToken.address;
      try {
        store.confirmIsLoading.setValue(true);
        let res = await token.depositTo([fromAddress, receiverAddress, amountVal], options);
        deposit.isOpenConfirmModal.setValue(false);
        store.confirmIsLoading.setValue(false);
        console.log('res--->', res);
        if (res) {
          token.actionHash.setValue(res.hash);
          deposit.isOpenCompleteModal.setValue(true);
          deposit.saveAction(res);
        }
        const receipt = await res.wait();
        deposit.updateAction(receipt);
        console.log('receipt--->', receipt);
        god.updateTicker.setValue(god.updateTicker.value + 1);
      } catch (e) {
        store.confirmIsLoading.setValue(false);
        console.log(e);
        if (e.message) {
          toast.error(e.message);
        }
        deposit.isOpenConfirmModal.setValue(false);
        if (e && e.data && e.data.message) {
          toast.error(e.data.message);
        }
      }
    }
  }));

  useEffect(() => {
    if (god.currentNetwork.account) {
      god.currentNetwork.loadBalance();
      token.loadPrivateData();
    }
  }, [god.updateTicker.value]);

  useEffect(() => {
    const effectiveTokens =  token.currentCrossChain?.tokens.filter(i => !i.isMaintained)
    deposit.curToken = effectiveTokens[0];
    deposit.amount = new BigNumberInputState({});
    store.approveLoading.setValue(false);
    store.confirmIsLoading.setValue(false);
    store.isShowAlert.setValue(true);
    store.showAddressToolTip.setValue(false);
    if (god.currentNetwork.account) {
      token.loadPrivateData();
    }
  }, [token.currentCrossChain?.chain, token.currentCrossChain?.tokens[0], token.currentChain.chainId, god.currentNetwork.account]);

  const addressToolTip = () => {
    const learnMore = '<a href=\'https://docs.iotex.io/basic-concepts/accounts\' target=\'_blank\' class=\'addressToolTip\'>Learn More.</a>';
    return (
      <Box fontSize={'0.9rem'} whiteSpace={'pre-line'}>
        <div
          dangerouslySetInnerHTML={{ __html: lang.t(isEthAddress(deposit.receiverAddress.anotherAddress) ? 'ethAddress.tooltip' : 'iotexAddress.tooltip', { keyword: learnMore }) }}>
        </div>
      </Box>
    );
  };

  return (
    <Box bgImage={'/images/home_bg.png'} pt={6}>
      <HistoryActionModal/>
      <Center>
        <Alert
          display={store.isShowAlert.value ? 'flex' : 'none'}
          maxW='md' textAlign='center'
          bgColor={useColorModeValue('white', theme.colors.bg.bg1Alpha20)}
          opacity={0.8}
          boxShadow={homeShadow}
          borderRadius={'10px'}>
          <Text
            fontSize='sm'>{token.currentCrossChain?.chain.chainId == ETHMainnetConfig.chainId?`Swapping IOTX from IoTeX to Ethereum is temporarily paused due to lack of IOTX-E (ERC20) liquidity.`: lang.t('tube_v4')}</Text>
          <CloseButton position='absolute' right={1} top={1} onClick={() => store.isShowAlert.setValue(false)} />
        </Alert>
      </Center>
      <Container
        maxW='md'
        mt={6}
        p={{ base: 2, md: 30 }}
        borderRadius={theme.borderRadius.sm}
        boxShadow={homeShadow}
        bg={home}
      >
        <ETHProvider />
        <NetworkHeader />
        <FormControl mt={6}>
          <Box
            bg={inputBg}
            borderRadius={theme.borderRadius.sm}
            color={inputColor}
          >
            <Flex borderRadius='md' justify='space-between' px={{ base: 2, md: 4 }} pt={4}>
              <Text fontSize='md'>Token Amount</Text>
              <Center>
                {deposit.curToken && <Text fontSize='sm'>Balance: {deposit.curToken.balance.format}</Text>}
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
                mr='8rem'
                py={2}
                value={deposit.amount.format || ''}
                onChange={(e) => deposit.amount.setFormat(e.target.value)}
              />
              <InputRightElement float={'right'} width='12rem' cursor='pointer'
                                 zIndex={0}>
                <Tag size='sm' variant='solid' bg={theme.colors.darkLightGreen} cursor='pointer'
                     onClick={() => deposit.amount.setValue(deposit.curToken.balance.value)}>{'MAX'}</Tag>
                <Stack onClick={store.openTokenList} width='100%' direction='row-reverse' maxW='12rem'
                       alignContent='flex-end'>
                  <Center mr={3}>
                    <Icon as={ChevronDownIcon} />
                  </Center>
                  {deposit.curToken?.symbol && <Text>{deposit.curToken.symbol}</Text>}
                  <Image borderRadius='full' boxSize={theme.iconSize.md} src={deposit.curToken?.logoURI}
                         fallbackSrc='https://via.placeholder.com/150' />
                </Stack>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box
            borderRadius={theme.borderRadius.sm}
            bg={inputBg}
            mt={8}
            color={inputColor}
          >
            <Flex justify='space-between' px={{ base: 2, md: 4 }} pt={4}>
              <Text fontSize='md'>Receiver Address</Text>
              {
                !deposit.receiverAddress.value.length &&
                god.currentNetwork.account &&
                <Button
                  variant={'green'} fontSize={'0.75rem'} minH={6} h={6}
                  onClick={() => deposit.receiverAddress.setValue(god.currentNetwork.account)}
                >
                  {lang.t('my.wallet')}
                </Button>
              }
            </Flex>
            <InputGroup>
              <Textarea
                rows={2}
                variant='unstyled'
                resize='none'
                mx={{ base: 2, md: 4 }}
                pr={{ base: 4, md: 6 }}
                fontWeight={500}
                color={useColorModeValue(theme.colors.gray[4], 'white')}
                value={deposit.receiverAddress.value}
                onChange={(e) => deposit.receiverAddress.setValue(e.target.value)}
              />
              {deposit.receiverAddress.value &&
              <InputRightElement zIndex={0} cursor='pointer' onClick={() => deposit.cleanAddress()}
                                 children={<SmallCloseIcon />} />}
            </InputGroup>
          </Box>
          {deposit.receiverAddress.anotherAddress && ![IotexMainnetConfig.chainId, IotexTestnetConfig.chainId].includes(god.currentChain.chainId) &&
          <Flex mx={4} h={14} alignItems={'center'} position={'relative'}>
            <chakra.img w='4' h='4' src={EnterSvg} />
            <Text
              mx={2}
              wordBreak={'break-all'}
              color={useColorModeValue(theme.colors.gray[6], theme.colors.gray[2])}
            >
              {deposit.receiverAddress.anotherAddress}
            </Text>
            <Popover trigger={'hover'}>
              <PopoverTrigger>
                <Icon as={QuestionOutlineIcon} cursor={'pointer'} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody _focusVisible={{}} _focus={{}}>
                  {addressToolTip()}
                </PopoverBody>
              </PopoverContent>

            </Popover>
          </Flex>
          }
          <Box px={3} py={1} mt={5}>
            <Text fontSize={'0.75rem'}
                  color={useColorModeValue(theme.colors.darkLightGreen, theme.colors.lightGreen)}>{lang.t('exchange.address.warning')}</Text>
          </Box>
          <Center mt={deposit.receiverAddress.anotherAddress ? 6 : 14} mb={2}>
            {!Boolean(god.currentNetwork.account) ? (
              <Button
                size='block'
                variant='green'
                title={lang.t('connect.wallet')}
                // leftIcon={<Image size={theme.iconSize.md} src="images/swap.svg"/>}
                onClick={store.showConnector}
              >
                {lang.t('connect.wallet')}
              </Button>
            ) : (
              <>
                {!deposit.state && Boolean(deposit.shouldApprove) ?
                  <Button
                    isLoading={store.approveLoading.value}
                    loadingText={store.approveLoadingContent}
                    onClick={store.onCashierApprove}
                    size='block'
                    variant='black'
                    disabled={store.approveLoading.value}
                  >
                    {lang.t('approve')}
                  </Button> :
                  <Button
                    onClick={() => deposit.isOpenConfirmModal.setValue(true)}
                    size='block'
                    variant='black'
                    disabled={!!deposit.state}
                  >
                    {deposit.state || lang.t('deposit')}
                  </Button>}
              </>
            )}
          </Center>
        </FormControl>
        <TokenListModal isOpen={store.isOpenTokenList.value} onClose={() => store.isOpenTokenList.setValue(false)}
                        onSelect={store.onSelectToken} />
        <ConfirmModal
          onConfirm={() => store.onSubmit}
          confirmIsLoading={store.confirmIsLoading.value}
          confirmLoadingText={store.confirmLoadingText}
        />
        <CompleteModal />
      </Container>
    </Box>
  );

});
