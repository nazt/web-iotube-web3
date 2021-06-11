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
  Alert,
  AlertIcon,
  useColorModeValue
} from '@chakra-ui/react';
import { Text, Center } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TokenListModal } from '@/components/TokenListModal';
import { useStore } from '@/store/index';
import { BigNumberInputState } from '@/store/standard/BigNumberInputState';
import { BooleanState, StringState } from '@/store/standard/base';
import { TokenState } from '@/store/lib/TokenState';
import NetworkHeader from '@/components/NetworkHeader';
import { toRau, validateAddress } from 'iotex-antenna/lib/account/utils';
import { AddressState } from '@/store/standard/AddressState';
import BigNumber from 'bignumber.js';
import { ConfirmModal } from '@/components/ConfirmModal';
import { message } from 'antd';
import { BigNumberState } from '@/store/standard/BigNumberState';

export const Home = observer(() => {
  const { god, token, lang } = useStore();

  const store = useLocalStore(() => ({
    curToken: null as TokenState,
    amount: new BigNumberInputState({}),
    receiverAddress: new AddressState(),
    isOpenTokenList: new BooleanState(),
    isOpenConfirmModal: new BooleanState(),
    depositeFee: new BigNumberState({decimals: 18, loading: false}),
    actionHash: '',
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

      if (!token.currentCrossChain.cashier.address) {
        return lang.t('input.cashier.invalid');
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
      token.depositFee().then((i) =>
      {
        // @ts-ignore
        store.depositeFee.setValue(new BigNumber(i))
      });
    },
    get shouldApprove() {
      if (!store.curToken || store.curToken.isEth) return;
      if (!store.curToken.allowanceForCashier) return;
      return store.amount.value.comparedTo(store.curToken.allowanceForCashier.value) > 0;
    },
    async onCashierApprove() {
      try {
        const approvedRes = await token.approve(store.amount.value, store.curToken);
        console.log(`approve response:`, approvedRes.value.toString());
        store.curToken.allowanceForCashier.setValue(new BigNumber(approvedRes.value.toString()));
      } catch (e) {
        message.error(`tokenContract.approve error ${e}`);
      }
    },
    async onSubmit() {
      const amountVal = store.amount.value.toFixed(0);
      console.log(store.amount.value);
      console.log(store.amount.value.toFixed(0));
      let options = {};
      let receiverAddress = store.receiverAddress.value;
      let fromAddress = store.curToken.address;
      console.log(token.currentChain.name);
      if(token.currentChain.name == "Iotex") {
        receiverAddress = store.receiverAddress.getIoAddress();
        options = {
          amount: await token.depositFee(),
          gasLimit: 1000000,
          gasPrice: toRau('1', 'Qev')
        };
      }else {
        options = {
          value: amountVal
        };
      }
      let res = await token.depositTo([fromAddress, receiverAddress, amountVal], options);
      const receipt = await res.wait();
      console.log(receipt);
      store.isOpenConfirmModal.setValue(false);
      if (receipt.status == 1) {
        store.actionHash = receipt.blockHash;
        message.success(`Ethereum transaction broadcasted successfully.`);
      }
    }
  }));

  useEffect(() => {
    if (god.currentNetwork.account) {
      token.loadPrivateData();
    }
  }, [god.currentNetwork.account]);
  return (
    <Container
      maxW="md"
      mt={10}
      p={30}
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: useColorModeValue('#fff', 'rgba(26, 32, 44, 0.8)'),
        borderRadius: '30px',
        boxShadow: '0px 3px 20px 0px rgba(214, 214, 214, 0.5)'
      }}
    >
      <NetworkHeader/>
      <FormControl mt={10}>
        <Box
          border="1px solid"
          borderRadius="md"
          css={{
            backgroundColor: useColorModeValue('rgba(248, 248, 250, 1)', '')
          }}
          borderColor="rgba(248, 248, 250, 1)"
        >
          <Flex justify="space-between" p={2}>
            <Text fontSize="sm">Token Amount</Text>
            <Text fontSize="sm">{store.curToken ? `Balance ${store.curToken.balance.format} ` : '...'}</Text>
          </Flex>
          <InputGroup>
            <Input
              border="none"
              placeholder="0.0"
              type="number"
              value={store.amount.format || ''}
              onChange={(e) => store.amount.setFormat(e.target.value)}
            />
            <InputRightElement onClick={store.openTokenList} width="4rem" cursor="pointer" flexDir="column">
              {/* {store.curToken && <Text fontSize="sm">Balance: {store.curToken.balance.format}</Text>} */}
              <Flex alignItems="center" pr={2} w="100%">
                <Image borderRadius="full" boxSize="24px"  src={store.curToken?.logoURI}
                       fallbackSrc="https://via.placeholder.com/150"/>
                <Icon as={ChevronDownIcon} ml={1}/>
              </Flex>
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box
          border="1px solid"
          borderRadius="md"
          css={{
            backgroundColor: useColorModeValue('rgba(248, 248, 250, 1)', '')
          }}
          borderColor="rgba(248, 248, 250, 1)"
          mt={4}
        >
          <Flex justify="space-between" p={2}>
            <Text fontSize="sm">Receiver Address</Text>
          </Flex>
          <InputGroup>
            <Input
              border="none"
              placeholder={token.currentCrossChain && token.currentCrossChain.chain.network.info.token.tokenExample}
              value={store.receiverAddress.value}
              onChange={(e) => store.receiverAddress.setValue(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Center>
          {!Boolean(god.currentNetwork.account) ? (
            <Button
              mt="10"
              mb={10}
              w="100%"
              p={8}
              title={lang.t('connect.wallet')}
              leftIcon={<img src="images/logo.svg" className="h-6 mr-4"/>}
              onClick={store.showConnector}
            >
              {lang.t('connect.wallet')}
            </Button>
          ) : (
            <>
              {!store.state && Boolean(store.shouldApprove) ?
                <Button
                  onClick={store.onCashierApprove}
                  mt="10"
                  mb={10}
                  w="100%"
                  p={8}
                  disabled={!!store.state}
                  css={{
                    backgroundColor: useColorModeValue('#182532', ''),
                    color: useColorModeValue('#fff', '')
                  }}
                >
                  {lang.t('approve')}
                </Button> :
                <Button
                  onClick={() => store.isOpenConfirmModal.setValue(true)}
                  mt="10"
                  mb={10}
                  w="100%"
                  p={8}
                  disabled={!!store.state}
                  css={{
                    backgroundColor: useColorModeValue('#182532', ''),
                    color: useColorModeValue('#fff', '')
                  }}
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
        depositeFee={store.depositeFee}
        isOpen={store.isOpenConfirmModal.value}
        onClose={() => store.isOpenConfirmModal.setValue(false)}
        receiverAddress={store.receiverAddress}
      />
    </Container>
  );
});
