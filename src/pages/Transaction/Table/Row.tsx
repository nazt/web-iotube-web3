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
import { ActionState } from '@/store/lib/ActionState';
import { IotexMainnetConfig } from '../../../config/IotexMainnetConfig';
import { useStore } from '@/store/index';

interface RowProps{
  action: ActionState;
}

export const Row = observer((props: RowProps) => {

  const { lang } = useStore();

  const bg = useColorModeValue("white", "bg.bg1Alpha20");
  const textColor = useColorModeValue("gray.4", "white");
  const linkColor = useColorModeValue("darkLightGreen", "lightGreen");
  const statusColor = useColorModeValue("darkLightGreen", "lightGreen");
  const action = props.action;

  const renderStatus = () => {
    let color = statusColor;
    let status = lang.t('transaction.status.tips.unknown');
    switch (action.status) {
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

  const renderHash = () => {
    return action.status !== 'SETTLED'
      ? <Text color={linkColor}>--</Text>
      : <Link
        isExternal
        href={
          action.toNetwork.name.toLowerCase() === 'iotex'
            ? `${action.toNetwork.explorerURL}/action/${action.txHash}`
            : `${action.toNetwork.explorerURL}/tx/${action.txHash}`
        }
      >
        {helper.string.truncate(action.txHash, 12, '...')}
      </Link>
  };

  return(
    <Tr
      as={Center}
      bg={bg}
      h="14"
      color={textColor}
    >
      <Td flex="1.4">
        { renderHash() }
      </Td>
      <Td as={HStack} spacing="2" flex="1.4" border="none">
        <Image src={action.fromNetwork.logoUrl} boxSize="5"/>
        <Link
          isExternal
          href={`${action.fromNetwork.explorerURL}/address/${action.sender}`}
        >
          {helper.string.truncate(action.sender, 12, '...')}
        </Link>
      </Td>
      <Td as={HStack} spacing="2" flex="1.4" border="none">
        <Image src={action.toNetwork.logoUrl} boxSize="5"/>
        <Link
          isExternal
          href={`${action.toNetwork.explorerURL}/address/${action.recipient}`}
        >
          {helper.string.truncate(action.recipient, 12, '...')}
        </Link>
      </Td>
      <Td flex="1.35">
        {renderStatus()}
      </Td>
      <Td flex="1.1" as={HStack} spacing="2">
        {action.token.logoURI
            ? <Image src={action.token.logoURI} boxSize="6"/>
            : null
        }
        <Text ml="2">{action.token.symbol}</Text>
      </Td>
      <Td flex="1.1">
        <Text>{action.amount.format}</Text>
      </Td>
      <Td flex="1.1">
        <Text>{helper.time.translateFn(action.timestamp)}</Text>
      </Td>
      <Td flex="1.15" as={VStack} alignItems="flex-end" spacing="0">
        <Text>{`${action.fee.format} ${IotexMainnetConfig.nativeCurrency.symbol}`}</Text>
      </Td>
    </Tr>
  )
});
