import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Text,
  Flex,
  Thead,
  Tr,
  Th
} from '@chakra-ui/react';
import { useStore } from '@/store/index';
import { SearchInputPopover, SearchSelectPopover, SearchStatusPopover } from './Searcher';

export const Header = observer(() => {

  const { lang, record } = useStore();

  return (
    <Thead>
      <Tr as={Flex} justify='space-between' mt='4' mb='4' px='5'>
        <Th flex='1.4'>{lang.t('hash')}</Th>
        <Th flex='1.4'>{lang.t('from')} <SearchInputPopover name='sender'/></Th>
        <Th flex='1.4'>{lang.t('to')} <SearchInputPopover name='recipient'/></Th>
        <Th flex='1.35'>{lang.t('status')}<SearchStatusPopover name='status'/></Th>
        <Th flex='1.1'>{lang.t('asset')} <SearchSelectPopover name='token'/></Th>
        <Th flex='1.1'>{lang.t('amount')}</Th>
        <Th flex='1.1'>{lang.t('age')}</Th>
        <Th flex='1.15' as={Text} textAlign='right'>{lang.t('fee.relay')}</Th>
      </Tr>
    </Thead>
  );
});
