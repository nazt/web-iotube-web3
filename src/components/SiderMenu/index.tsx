import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Link, useHistory } from "react-router-dom";
import {
  ListItem,
  List,
  Box,
  useColorModeValue
} from '@chakra-ui/react';
import { ToolConfig } from '../../config/ToolConfig';

export const SiderMenu = observer((props) => {
  const history = useHistory();
  const store = useLocalObservable(() => ({
    activeMenu: history.location.pathname,
    switchToRoute (path) {
      history.push(path);
      store.activeMenu = path
    }
  }));

  return (
    <Box css={{
      position: 'absolute',
      top: 100,
      left: 20,
      zIndex: 10,
      width: 180,
      height: 200,
      backgroundColor: useColorModeValue('rgba(255, 255, 255, 1)', ''),
      borderRadius: 15,
      boxShadow: '0px 3px 20px 0px rgba(214, 214, 214, 0.5)'
    }}>
      <List mt={8} mb={8} spacing={1}  maxH="200px" overflowY="scroll" colorScheme={'green'}>
        {ToolConfig.map((i) => (
          <ListItem cursor="pointer" px={4} py={3} onClick={() => store.switchToRoute(i.path)} css={store.activeMenu == i.path && {
            color: "green",
            backgroundColor: useColorModeValue('rgba(248, 248, 248, 1)', 'black'),
          }}><Box ml={8}><b>{i.name}</b></Box></ListItem>
        ))}
      </List>
    </Box>
  );
});
