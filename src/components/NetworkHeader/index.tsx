import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '@/store/index';
import { TokenState } from '@/store/lib/TokenState';
import { ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  Box,
  useColorModeValue,
  Center,
  Icon,
  Text,
  Spacer, Avatar
} from '@chakra-ui/react';
import { CrossChain } from '../../../type';
import { ChainState } from '@/store/lib/ChainState';

interface ISwitchProps {
  tokens?: Array<TokenState>;
}

const NetworkHeader = observer((props: ISwitchProps) => {
  const { god, token, lang } = useStore();

  const store = useLocalObservable(() => ({
    tipsVisible: false,
    toggle() {
      // swap.toggleSwap()


    },
    onSelectSource(e) {
      // const network = sourceChainInfos[e.key]
      // if (!network.chainIdsGroup.includes(eth.chainId)) {
      //   store.tipsVisible = true
      // } else {
      //   eth.fromNetwork = e.key
      // }
    },
    onSelectDest(chain: ChainState) {
      token.toNetwork.setValue(chain.chainId);
      token.loadPrivateData();
    }
  }));

  return (
    <Flex>
      <Menu>
        <MenuButton css={{
          backgroundColor: useColorModeValue('#fff', 'rgba(26, 32, 44, 0.8)')
        }} isActive={false} as={Button} pl={[5, 3]} pr={[5, 3]} pt={10} pb={10} rightIcon={<ChevronDownIcon/>}>
          <Flex>
            <img width={36} height={36} src={god.currentChain.logoUrl}/>
            <Box p={2}><Text fontSize="xl">{god.currentChain.name}</Text></Box>
          </Flex>
        </MenuButton>
        {Object.values(god.currentChain.crossChain).length > 1 &&
        <MenuList zIndex={3}>
          {Object.values(god.currentChain.crossChain).map((fromChain) =>
            <MenuItem key={fromChain.chain.name}  onClick={() => store.onSelectSource(fromChain)}>
              <Box><Avatar css={{
                backgroundColor: useColorModeValue('rgba(249, 249, 249, 0.5)', 'rgba(250, 250, 250, 1)')
              }} size="sm" src={fromChain.chain.logoUrl} alt=""/></Box>
              <Box ml={4}>{fromChain.chain.name}</Box>
            </MenuItem>
          )}
        </MenuList>}
      </Menu>
      <Spacer/>
      <Center w={30} h={30} p={6} css={{
        cursor: 'pointer',
        margin: 'auto 0',
        backgroundColor: useColorModeValue('#fff', 'rgba(26, 32, 44, 0.8)'),
        borderRadius: '30px',
        boxShadow: '0px 3px 20px 0px rgba(214, 214, 214, 0.5)'
      }}>
        <Icon as={ArrowForwardIcon} w={8} h={8} onClick={store.toggle}/>
      </Center>
      <Spacer/>
      <Menu>
        <MenuButton css={{
          backgroundColor: useColorModeValue('#fff', 'rgba(26, 32, 44, 0.8)')
        }} isActive={false} as={Button} pl={[5, 3]} pr={[5, 3]} pt={10} pb={10} rightIcon={<ChevronDownIcon/>}>
          <Flex>
            <img width={36} height={36} src={token.currentCrossChain?.chain.logoUrl}/>
            <Box p={2}><Text fontSize="xl">{token.currentCrossChain?.chain.name}</Text></Box>
          </Flex>
        </MenuButton>
        {Object.values(god.currentChain.crossChain).length > 1 &&
        <MenuList zIndex={3}>
          {Object.values(god.currentChain.crossChain).map((crossChain) =>
            <MenuItem key={crossChain.chain.name} onClick={() => store.onSelectDest(crossChain.chain)}>
              <Box><Avatar css={{
                backgroundColor: useColorModeValue('rgba(249, 249, 249, 0.5)', 'rgba(250, 250, 250, 1)')
              }} size="sm" src={crossChain.chain.logoUrl} alt=""/></Box>
              <Box ml={4}>{crossChain.chain.name}</Box>
            </MenuItem>
          )}
        </MenuList>
        }
      </Menu>
    </Flex>
  );
});

export default NetworkHeader;
