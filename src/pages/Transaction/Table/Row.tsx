import { observer } from 'mobx-react-lite';
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
import { IotexMainnetConfig } from '../../../config/IotexMainnetConfig';
import { useStore } from '@/store/index';

interface RowProps{
  record?: {
    fromNetwork: ChainState
    toNetwork: ChainState
    action: ActionState
  }
}

export const Row = observer((props: RowProps) => {

  const { lang } = useStore();

  const bg = useColorModeValue("white", "bg.bg1Alpha20");
  const textColor = useColorModeValue("gray.4", "white");
  const statusColor = useColorModeValue("darkLightGreen", "lightGreen");

  const renderStatus = () => {
    let color = statusColor;
    let status = lang.t('transaction.status.tips.unknown');
    switch (props.record.action.status) {
      case 'UNKNOWN':
        color = 'red';
        status = lang.t('transaction.status.tips.unknown');
        break;
      case 'CREATED':
        color = statusColor;
        status = lang.t('transaction.status.tips.created');
        break;
      case 'SUBMITTED':
        color = 'blue';
        status = lang.t('transaction.status.tips.submitted');
        break;
      case 'SETTLED':
        color = 'yellow';
        status = lang.t('transaction.status.tips.settled');
        break
    }

    return <Text
      bg="bg.bg2Alpha20"
      h="6"
      lineHeight="6"
      borderRadius="full"
      px="5"
      display="inline-block"
      color={color}
      cursor='pointer'
    >
      {status}
    </Text>
  };

  return(
    <Tr
      as={Center}
      bg={bg}
      h="14"
      color={textColor}
    >
      <Td flex="1.4">
        <Link
          target='_blank'
          href={
            props.record.toNetwork.name.toLowerCase() === 'iotex'
              ? `${props.record.toNetwork.explorerURL}/action/${props.record.action.txHash}`
              : `${props.record.toNetwork.explorerURL}/tx/${props.record.action.txHash}`
          }
        >
          {helper.string.truncate(props.record.action.txHash, 12, '...')}
        </Link>
      </Td>
      <Td as={HStack} spacing="2" flex="1.4" border="none">
        <Image src={props.record.fromNetwork.logoUrl} boxSize="5"/>
        <Link
          target='_blank'
          href={`${props.record.fromNetwork.explorerURL}/address/${props.record.action.sender}`}
        >
          {helper.string.truncate(props.record.action.sender, 12, '...')}
        </Link>
      </Td>
      <Td as={HStack} spacing="2" flex="1.4" border="none">
        <Image src={props.record.toNetwork.logoUrl} boxSize="5"/>
        <Link
          target='_blank'
          href={`${props.record.toNetwork.explorerURL}/address/${props.record.action.recipient}`}
        >
          {helper.string.truncate(props.record.action.recipient, 12, '...')}
        </Link>
      </Td>
      <Td flex="1.35">
        {renderStatus()}
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
        <Text>{`${props.record.action.fee.format} ${IotexMainnetConfig.nativeCurrency.symbol}`}</Text>
      </Td>
    </Tr>
  )
});
