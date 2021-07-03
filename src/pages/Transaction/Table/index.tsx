import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header } from './Header';
import { Center, Image, Table, Tbody, useColorModeValue } from '@chakra-ui/react';
import { Row } from './Row';
import { Paginator } from '@/components/Paginator';
import { useStore } from '@/store/index';

export const TransactionTable = observer(() => {

  const { record } = useStore();

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
          record.activeTabRecords.actions.map(item => (
            <Row record={item}/>
          ))
        }
      </Tbody>
      <Paginator
        total={record.activeTabRecords.count}
        defaultPage={record.currentPage}
        defaultSize={record.currentPageSize}
        onPageChange={(page) => {
          record.updateList(record.currentPageSize, (page - 1) * record.currentPageSize)
        }}
        onSizeChange={(size) => {
          record.updateList(size, (record.currentPage - 1) * size)
        }}
      />
    </>
  );

  return (
    <Table>
      <Header/>
      {
        record.activeTabRecords.count <= 0
          ? renderBlank()
          : renderContent()
      }
    </Table>
  );
});
