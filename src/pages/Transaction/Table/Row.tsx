import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import {
  Text,
  HStack,
  Image,
  VStack,
  Tr,
  Td,
  Link,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { helper } from '@/lib/helper';
import { ChainState } from '@/store/lib/ChainState';
import { ActionState } from '@/store/lib/ActionState';

interface RowProps{
  record?: {
    fromNetwork: ChainState
    toNetwork: ChainState
    action: ActionState
  }
}

export const Row = observer((props: RowProps) => {

  const bg = useColorModeValue("white", "bg.bg1Alpha20");
  const textColor = useColorModeValue("gray.4", "white");
  const statusColor = useColorModeValue("darkLightGreen", "lightGreen");

  const store = useLocalStore(() => ({

    get hashLink() {
      return `${props.record.fromNetwork.explorerURL}/tx/${props.record.action.txHash}`
    },

    get fromAddressLink() {
      return `${props.record.fromNetwork.explorerURL}/address/${props.record.action.sender}`
    },

    get toAddressLink() {
      return `${props.record.toNetwork.explorerURL}/address/${props.record.action.recipient}`
    }

  }));

  return(
    <Tr
      as={Center}
      bg={bg}
      h="14"
      color={textColor}
    >
      <Td flex="1.4">
        <Link
          href={`${props.record.fromNetwork.explorerURL}/tx/${props.record.action.txHash}`}
        >
          {helper.string.truncate(props.record.action.txHash, 12, '...')}
        </Link>
      </Td>
      <Td as={HStack} spacing="2" flex="1.4" border="none">
        <Link href={store.fromAddressLink}>
          {helper.string.truncate(props.record.action.sender, 12, '...')}
        </Link>
      </Td>
      <Td as={HStack} spacing="2" flex="1.4" border="none">
        <Link href={store.toAddressLink}>
          {helper.string.truncate(props.record.action.recipient, 12, '...')}
        </Link>
      </Td>
      <Td flex="1.35">
        <Text bg="bg.bg2Alpha20" h="6" lineHeight="6" borderRadius="full" px="5" display="inline-block" color={statusColor}>
          {props.record.action.status}
        </Text>
      </Td>
      <Td flex="1.1" as={HStack} spacing="2">
        {
          props.record.action.token.logoURI
            ? <Image src={props.record.action.token.logoURI} boxSize="6"/>
            : null
        }
        <Text ml="2">{props.record.action.token.symbol}</Text>
      </Td>
      <Td flex="1.1">
        <Text>{props.record.action.amount.format}</Text>
      </Td>
      <Td flex="1.1">
        <Text>{helper.time.translateFn(props.record.action.timestamp)}</Text>
      </Td>
      <Td flex="1.15" as={VStack} alignItems="flex-end" spacing="0">
        <Text>{`${props.record.action.fee.format} ${props.record.fromNetwork.nativeCurrency.symbol}`}</Text>
      </Td>
    </Tr>
  )
});
