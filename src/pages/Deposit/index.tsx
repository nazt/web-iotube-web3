import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { isAddress as isEthAddress } from '@ethersproject/address';
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
  useColorModeValue,
  useTheme
} from '@chakra-ui/react';
import { Text, Center } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TokenListModal } from '@/components/TokenListModal';
import { useStore } from '@/store/index';
import { BigNumberInputState } from '@/store/standard/BigNumberInputState';
import { BooleanState } from '@/store/standard/base';
import { TokenState } from '@/store/lib/TokenState';
import NetworkHeader from '@/components/NetworkHeader';
import { validateAddress } from 'iotex-antenna/lib/account/utils';
import { AddressState } from '@/store/standard/AddressState';
import BigNumber from 'bignumber.js';
import { ConfirmModal } from '@/components/ConfirmModal';
import { BigNumberState } from '@/store/standard/BigNumberState';
import { theme } from '@/lib/theme';
import { CompleteModal } from '@/components/CompleteModal';

export const Deposit = observer(() => {
  const { god, token, lang } = useStore();

  const theme = useTheme();
  const home = useColorModeValue('white', theme.colors.gray.bg);
  const homeShadow = useColorModeValue(theme.shadows.lightShadow, theme.shadows.darkShadow);
  const inputBg = useColorModeValue(theme.colors.gray[5], theme.colors.gray[8]);
  const inputColor = useColorModeValue(theme.colors.gray[6], theme.colors.gray[2]);

  const store = useLocalStore(() => ({
    curToken: null as TokenState,
    amount: new BigNumberInputState({}),
    receiverAddress: new AddressState(),
    isOpenTokenList: new BooleanState(),
    isOpenConfirmModal: new BooleanState(),
    depositeFee: new BigNumberState({ decimals: 18, loading: false }),
    actionHash: '',
    approveLoading: new BooleanState(),
    approveLoadingContent: lang.t('deposit.approving'),
    confirmIsLoading: new BooleanState(),
    confirmLoadingText: lang.t('button.confirming'),
    maxAllowance: new BigNumber(1.157920892373162e59),
    isOpenCompleteModal: new BooleanState(),
    showConnector() {
      god.setShowConnecter(true);
    },
    get state() {
      if (!god.currentNetwork.account) {
        return lang.t('input.wallet.not_connected');
      }

      if (!store.curToken) {
        return lang.t('input.token.unselected');
      }

      if (!token.currentCrossChain?.cashier.address) {
        return lang.t('input.cashier.invalid');
      }

      if (token.currentCrossChain?.cashier.depositFee.value.comparedTo(god.currentNetwork.chain.current.Coin.balance.value) > 0) {
        return lang.t('input.insufficient.depositFee');
      }

      if (isNaN(Number(store.amount.value)) || store.amount.format <= 0 || store.amount.value.comparedTo(store.curToken.balance.value) >= 0) {
        return lang.t('input.amount.invalid');
      }
      console.log(store.curToken.amountRange);
      if (!store.curToken.isEth() && store.amount.value.gt(store.curToken.amountRange.maxAmount.value)) {
        return `Amount must <= ${store.curToken.amountRange.maxAmount.format}`;
      }

      if (!store.curToken.isEth() && store.amount.value.lt(store.curToken.amountRange.minAmount.value)) {
        return `Amount must >= ${store.curToken.amountRange.minAmount.format}`;
      }

      if (!god.isETHNetwork && !isEthAddress(store.receiverAddress.value)) {
        return lang.t('input.crossschainaddress.invalid', { chain: token.currentCrossChain.chain.name });
      }

      if (god.isETHNetwork && !validateAddress(store.receiverAddress.value)) {
        return lang.t('input.crossschainaddress.invalid', { chain: token.currentCrossChain.chain.name });
      }
      return '';
    },
    openTokenList() {
      store.isOpenTokenList.setValue(true);
    },
    onSelectToken(t: TokenState) {
      store.curToken = t;
      store.amount.setDecimals(t.decimals);
    },
    get shouldApprove() {
      if (!store.curToken || store.curToken.isEth()) return false;
      console.log('allowance ForCashier ---->', store.curToken.allowanceForCashier.format);
      return store.amount.value.comparedTo(store.curToken.allowanceForCashier.value) > 0;
    },
    async onCashierApprove() {
      try {
        store.approveLoading.setValue(true);
        const approvedRes = await token.approve(store.maxAllowance, store.curToken);
        if (approvedRes) {
          store.approveLoadingContent = lang.t('button.waiting');
        }
        const receipt = await approvedRes.wait();
        console.log(`approve receipt:`, receipt);
        if (receipt.status == 1) {
          store.approveLoading.setValue(false);
          store.curToken.allowanceForCashier.setValue(store.maxAllowance);
        }
        console.log('allowance Cashier new ---->', store.curToken.allowanceForCashier.format);
      } catch (e) {
        // message.error(`tokenContract.approve error ${e.message}`);
        store.approveLoading.setValue(false);
      }
    },
    async onSubmit() {
      const amountVal = store.amount.value.toFixed(0);
      console.log(store.amount.value);
      console.log(store.amount.value.toFixed(0));
      let options = { value: token.currentCrossChain?.cashier.depositFee.value.toFixed(0) };
      if (store.curToken.isEth()) {
        options = { value: new BigNumber(amountVal).plus(token.currentCrossChain?.cashier.depositFee.value).toString() };
      }
      let receiverAddress = store.receiverAddress.value;
      let fromAddress = store.curToken.address;
      try {
        store.confirmIsLoading.setValue(true);
        let res = await token.depositTo([fromAddress, receiverAddress, amountVal], options);
        store.isOpenConfirmModal.setValue(false);
        store.confirmIsLoading.setValue(false);
        console.log("res--->", res);
        if (res) {
          token.actionHash.setValue(res.hash);
          store.isOpenCompleteModal.setValue(true);
        }
        const receipt = await res.wait();
        // store.isOpenConfirmModal.setValue(false);
        // store.confirmIsLoading.setValue(false);
        console.log("receipt--->", receipt);
        // if (receipt.status == 1) {
        //   token.actionHash.setValue(receipt.blockHash);
        //   store.isOpenCompleteModal.setValue(true);
        // }
      } catch (e) {
        store.confirmIsLoading.setValue(false);
        console.log(e);
        if (e.message) {
          // message.error(e.message);
        }
        store.isOpenConfirmModal.setValue(false);
        if (e && e.data && e.data.message) {
          // message.error(e.data.message);
        }
      }
    }
  }));
  useEffect(() => {
    store.curToken = token.currentCrossChain?.tokens[0];
    store.amount = new BigNumberInputState({});
    store.receiverAddress.setValue('');
    store.approveLoading.setValue(false);
    store.confirmIsLoading.setValue(false);
    if (god.currentNetwork.account) {
      token.loadPrivateData();
    }
  }, [token.currentCrossChain?.chain, token.currentCrossChain?.tokens[0], token.currentChain.chainId, god.currentNetwork.account]);

  return (
    <Container
      maxW="md"
      mt={10}
      p={30}
      bg={home}
      borderRadius={theme.borderRadius.sm}
      boxShadow={homeShadow}
    >
      <NetworkHeader/>
      <FormControl mt={8}>
        <Box
          bg={inputBg}
          borderRadius={theme.borderRadius.sm}
          color={inputColor}
        >
          <Flex borderRadius="md" justify="space-between" px={4} pt={4}>
            <Text fontSize="md">Token Amount</Text>
            <Center>
              {store.curToken && <Text fontSize="sm">Balance: {store.curToken.balance.format}</Text>}
            </Center>
          </Flex>
          <InputGroup>
            <Input
              variant="unstyled"
              placeholder="0.0"
              type="number"
              ml={4}
              mr="8rem"
              py={2}
              value={store.amount.format || ''}
              onChange={(e) => store.amount.setFormat(e.target.value)}
            />
            <InputRightElement onClick={store.openTokenList} float={'right'} width="10rem" cursor="pointer">
              <Stack width="100%" direction="row-reverse" maxW="12rem" alignContent="flex-end">
                <Center mr={3}>
                  <Icon as={ChevronDownIcon}/>
                </Center>
                {store.curToken?.symbol && <Text>{store.curToken.symbol}</Text>}
                <Image borderRadius="full" boxSize={theme.iconSize.md} src={store.curToken?.logoURI}
                       fallbackSrc="https://via.placeholder.com/150"/>
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
          <Flex justify="space-between" px={4} pt={4}>
            <Text fontSize="md">Receiver Address</Text>
          </Flex>
          <InputGroup>
            <Input
              variant="unstyled"
              mx={4}
              py={2}
              placeholder={token.currentCrossChain && token.currentCrossChain.chain.network.info.token.tokenExample}
              value={store.receiverAddress.value}
              onChange={(e) => store.receiverAddress.setValue(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Center mt={5}>
          {!Boolean(god.currentNetwork.account) ? (
            <Button
              my={10}
              size="block"
              variant="green"
              title={lang.t('connect.wallet')}
              // leftIcon={<Image size={theme.iconSize.md} src="images/swap.svg"/>}
              onClick={store.showConnector}
            >
              {lang.t('connect.wallet')}
            </Button>
          ) : (
            <>
              {!store.state && Boolean(store.shouldApprove) ?
                <Button
                  my={10}
                  isLoading={store.approveLoading.value}
                  loadingText={store.approveLoadingContent}
                  onClick={store.onCashierApprove}
                  size="block"
                  variant="black"
                  disabled={store.approveLoading.value}
                >
                  {lang.t('approve')}
                </Button> :
                <Button
                  onClick={() => store.isOpenConfirmModal.setValue(true)}
                  size="block"
                  variant="black"
                  my={10}
                  disabled={!!store.state}
                >
                  {store.state || lang.t('deposit')}
                </Button>}
            </>
          )}
        </Center>
      </FormControl>
      <TokenListModal isOpen={store.isOpenTokenList.value} onClose={() => store.isOpenTokenList.setValue(false)}
                      onSelect={store.onSelectToken}/>
      <ConfirmModal
        onConfirm={() => store.onSubmit}
        amount={store.amount}
        curToken={store.curToken}
        depositeFee={token.currentCrossChain?.cashier?.depositFee}
        isOpen={store.isOpenConfirmModal.value}
        onClose={() => store.isOpenConfirmModal.setValue(false)}
        receiverAddress={store.receiverAddress}
        confirmIsLoading={store.confirmIsLoading.value}
        confirmLoadingText={store.confirmLoadingText}
      />
      <CompleteModal
        amount={store.amount}
        curToken={store.curToken}
        receiverAddress={store.receiverAddress}
        isOpen={store.isOpenCompleteModal.value}
        onClose={() => store.isOpenCompleteModal.setValue(false)}
      />
    </Container>
  );
});
