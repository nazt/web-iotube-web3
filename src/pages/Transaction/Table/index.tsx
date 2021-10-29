import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header } from './Header';
import { Center, Image, Table, Tbody, useColorModeValue } from '@chakra-ui/react';
import { Row } from './Row';
import { Paginator } from '@/components/Paginator';
import { useStore } from '@/store/index';
import { ActionListState } from '@/store/lib/ActionListState';

interface TableProps{
  index: number;
}

export const TransactionTable = observer((props: TableProps) => {

  const { record } = useStore();
  const actionList: ActionListState = record.actionLists[props.index];

  const blankBg = useColorModeValue("white", "gray.11");

  const renderBlank = () => (
    <Center
      h="calc(100vh - 22rem)"
      minH="xs"
      borderRadius="2xl"
      bg={blankBg}
    >
      <Image srcSet={"/images/subtract.svg"} boxSize="3xs" />
    </Center>
  );

  const renderContent= () => (
    <>
      <Tbody>
        {
          actionList.actions.map(item => (
            <Row action={item}/>
          ))
        }
      </Tbody>
      <Paginator
        total={actionList.count}
        defaultPage={actionList.currentPage}
        defaultSize={actionList.currentPageSize}
        onPageChange={(page) => {
          record.updateList(props.index, actionList.currentPageSize, (page - 1) * actionList.currentPageSize)
        }}
        onSizeChange={(size) => {
          record.updateList(props.index, size, (actionList.currentPage - 1) * size)
        }}
      />
    </>
  );

  return (
    <Table>
      <Header />
      {
        actionList.count <= 0
          ? renderBlank()
          : renderContent()
      }
    </Table>
  );
});
