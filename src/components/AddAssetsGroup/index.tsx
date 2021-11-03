import { observer, useLocalStore, useObserver } from 'mobx-react-lite';
import { TokenState } from '@/store/lib/TokenState';
import { Text } from '@chakra-ui/layout';
import { helper } from '@/lib/helper';
import CopyToClipboard from '@/components/CopyToClipboard';
import { CopyIcon } from '@chakra-ui/icons';
import { chakra, HStack, useColorModeValue } from '@chakra-ui/react';
import MetamaskSvg from '@/../public/images/metamask.svg';
import React, { useEffect } from 'react';
import { metamaskUtils } from '@/lib/metaskUtils';
import { toast } from 'react-hot-toast';
import { useStore } from '@/store/index';


interface AssetsProps {
  token: TokenState;
}

export const AddAssetsGroup = observer((props: AssetsProps) => {
  const textColor = useColorModeValue('darkLightGreen', 'lightGreen');
  const { god } = useStore();
  const store = useLocalStore(() => ({
    token: props.token,
    addAssetsToMetamask(token: TokenState) {
      god.addAssetToken = token;
      if (token.chainId != god.currentChain.chainId) {
        store.setChain(token.chainId);
      }
    },
    setChain(val) {
      god.destChain = god.currentNetwork.chain.map[val];
      if (god.isConnect) {
        god.confirmDialogOpen.setValue(true);
      } else {
        toast('Please connect wallet first.');
      }
    }
  }));

  useEffect(() => {
    if (god.addAssetToken?.chainId == god.currentChain.chainId) {
      metamaskUtils.addTokenToMetamask({
        tokenAddress: god.addAssetToken.address,
        tokenSymbol: god.addAssetToken.symbol,
        tokenDecimals: god.addAssetToken.decimals,
        tokenImage: god.addAssetToken.logoURI
      });
      god.addAssetToken = null;
    }
  }, [god.currentChain.chainId, god.addAssetToken]);

  if (store.token?.address == '0x0000000000000000000000000000000000000000') return null;

  return (
    <HStack>
      <HStack w={{ base: 0, md: 32 }} overflow='hidden'>
        <Text fontSize='sm' color='gray.600'>{helper.string.truncate(store.token?.address, 12, '...')}</Text>
        <CopyToClipboard text={store.token?.address}>
          <CopyIcon ml={5} color={textColor} />
        </CopyToClipboard>
      </HStack>
      <chakra.img cursor='pointer' w='6' h='6' src={MetamaskSvg}
                  onClick={() => store.addAssetsToMetamask(store.token)} />
    </HStack>
  );
});
