import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Image, Flex, Text, Tabs, TabList, Tab, TabPanels, TabPanel, useDisclosure } from '@chakra-ui/react';
import { useStore } from '@/store/index';
import { TransactionTable } from './Table/index';
import { useHistory } from 'react-router-dom';
import { helper } from '@/lib/helper';

const tabSelectedStyle = {
  bg: 'sideBar.itemActive',
  shadow: 'none'
};

export const Transaction = observer(() => {
  const history = useHistory();
  const { record, god, sideBar } = useStore();

  useEffect(() => {
    if (!!history.location.hash) {
      if (record.tabHashMap[history.location.hash] !== undefined){
        record.activeTab.setValue(record.tabHashMap[history.location.hash]);
      }else {
        // if not match , redirect to iotex.
        history.push(`transactions#iotex`);
      }
    }
  }, [history.location?.hash]);

  return (
    <Flex px={{ base: 3, md: 10 }} py={{ base: 6, md: 10 }}>
      <Tabs variant="unstyled" isFitted index={record.activeTab.value}
            onChange={(index) => {
              history.push(`${sideBar.activeMenu}#${record.actionLists[index].key}`);
              sideBar.setActiveChildMenu(`#${record.actionLists[index].key}`);
            }} width="100%">
        <TabList
          bg="sideBar.bg"
          borderRadius="2xl"
          maxW="3xl"
        >
          {
            record.actionLists.map((item, index) => {
              return <Tab
                py={2.5}
                textAlign="center"
                borderRadius="2xl"
                _selected={tabSelectedStyle}
                _active={tabSelectedStyle}
              >
                <Image
                  srcSet={index == record.activeTab.value ? `/images/arrow_right_active.svg` : `/images/arrow_right.svg`}
                  boxSize="3" mr={2}/>
                <Image
                  srcSet={index == record.activeTab.value ? `/images/chain/${item.key.toLowerCase()}.svg` : `/images/chain/${item.key.toLowerCase()}_inactivated_light.svg`}
                  boxSize="6"/>
                <Text
                  display={{ base: 'none', lg: 'flex' }}
                  color="white"
                  fontSize="xl"
                  ml="2"
                >{item.name}</Text>
              </Tab>;
            })
          }
        </TabList>
        <TabPanels overflowX='auto'>
          {
            record.actionLists.map( (item,index) => {
              return <TabPanel key={index} p="0" width='100%' minW='5xl'>
                <TransactionTable index={index} />
              </TabPanel>;
            })
          }
        </TabPanels>
      </Tabs>
    </Flex>
  );
});
