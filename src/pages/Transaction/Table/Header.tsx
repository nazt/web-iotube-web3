import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, Flex, Thead, Tr, Th } from '@chakra-ui/react';
import { useStore } from '@/store/index';

export const Header = observer(() => {

  const { lang } = useStore();

  return (
    <Thead>
      <Tr as={Flex} justify="space-between" mt="10" mb="4" px="5">
        <Th flex='1.4'>{lang.t("hash")}</Th>
        <Th flex='1.4'>{lang.t("from")}</Th>
        <Th flex='1.4'>{lang.t("to")}</Th>
        <Th flex='1.35'>{lang.t("status")}</Th>
        <Th flex='1.1'>{lang.t("asset")}</Th>
        <Th flex='1.1' >{lang.t("amount")}</Th>
        <Th flex='1.1'>{lang.t("age")}</Th>
        <Th flex='1.15' as={Text} textAlign="right">{lang.t("fee")}</Th>
      </Tr>
    </Thead>
  );
});
