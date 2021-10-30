import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/index';
import { Text } from '@chakra-ui/layout';
import {
  Box,
  Button,
  chakra,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  useColorModeValue
} from '@chakra-ui/react';
import { ActionListState } from '@/store/lib/ActionListState';
import { BooleanState, StringState } from '@/store/standard/base';
import filter from '@/../public/images/filter.svg';
import { helper } from '@/lib/helper';
import { CloseIcon, ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons';

interface TableProps {
  index: number;
}

export const Searcher = observer((props: TableProps) => {
  const { record } = useStore();
  const textColor = useColorModeValue('darkLightGreen', 'lightGreen');
  const actionList: ActionListState = record.actionLists[props.index];

  return (
    <>
      {!!(actionList.sender.value.concat(actionList.recipient.value).concat(actionList.token.value)) &&
      <HStack mt={4} p={4}>
        <Text>Filter by: </Text>
        {actionList.sender.value &&
        <Tag
          size='md'
          borderRadius='full'
          variant='subtle'
          colorScheme='gray'
        >
          <TagLabel>From: <Text display={'inline'} color={textColor}>{helper.string.truncate(actionList.sender.value, 12, '...')}</Text></TagLabel>
          <TagCloseButton onClick={() => record.clearSearchParam('sender')}/>
        </Tag>
        }
        {actionList.recipient.value &&
        <Tag
          size='md'
          borderRadius='full'
          variant='subtle'
          colorScheme='gray'
        >
          <TagLabel>To: <Text display={'inline'} color={textColor}>{helper.string.truncate(actionList.recipient.value, 12, '...')}</Text></TagLabel>
          <TagCloseButton onClick={() => record.clearSearchParam('recipient')}/>
        </Tag>
        }
        {actionList.token.value &&
        <Tag
          size='md'
          borderRadius='full'
          variant='subtle'
          colorScheme='gray'
        >
          <TagLabel>Token: <Text display={'inline'} color={textColor}>{helper.string.truncate(actionList.token.value, 12, '...')}</Text></TagLabel>
          <TagCloseButton onClick={() => record.clearSearchParam('token')}/>
        </Tag>
        }
      </HStack>
      }
    </>);
});

interface SearchFiledProps
{
  name: string;
}

export const SearchInputPopover = observer((props: SearchFiledProps) =>
{
  const mainColor = useColorModeValue('darkLightGreen', 'lightGreen');
  const { record } = useStore();
  const [search, setSearch] = useState('');
  const store = useLocalStore(() => ({
    isOpen: new BooleanState(),
    changeInput(e) {
      setSearch(e.target.value);
    },
    onClear() {
      setSearch('');
    }
  }));
  return (
    <Popover trigger={'click'}>
      {({ isOpen, onClose }) => (<>
          <PopoverTrigger>
            <Tag>
              <chakra.img src={filter} />
            </Tag>
          </PopoverTrigger>
          <PopoverContent w='260px' _focusVisible={{}} _focus={{}}  p={1} borderRadius='20px'>
            <PopoverBody _focusVisible={{}} _focus={{}} align='right'>
              <Input borderRadius='20px' _focusVisible={{}} _focus={{}} borderColor={mainColor} size='sm'
                     onChange={(e) => store.changeInput(e)}
                     value={search}
                   />
              <HStack pt={2}>
                <Button variant='green' size='sm' px={10} minH={8} onClick={() => {
                  record.updateSearchParam(props.name, search);
                  onClose();
                }}>Filter</Button>
                <Button size='sm' ml={3} px={10} minH={8} onClick={() => {
                  store.onClear();
                  onClose();
                }}>Clear</Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
);


export const SearchSelectPopover = observer((props: SearchFiledProps) =>
  {
    const mainColor = useColorModeValue('darkLightGreen', 'lightGreen');
    const { record } = useStore();
    const [search, setSearch] = useState('');
    const store = useLocalStore(() => ({
      isOpen: new BooleanState(),
      keyword: new StringState(),
      get tokens() {
        if (!record.actionLists[record.activeTab.value].tokensOnNetwork) return [];
        return record.actionLists[record.activeTab.value].tokensOnNetwork
          .filter((i) => i.symbol.toLowerCase().includes(store.keyword.value.toLowerCase()));
      },
      onSelect(address) {
        record.updateSearchParam(props.name, address);
      },
      onClear() {
        setSearch('');
        store.keyword.setValue('');
      }
    }));

    return (
      <Popover trigger={'click'}>
        {({ isOpen, onClose }) => (<>
            <PopoverTrigger>
              <Tag>
                <chakra.img src={filter} />
              </Tag>
            </PopoverTrigger>
            <PopoverContent w='260px' _focusVisible={{}} _focus={{}}  p={1} borderRadius='20px'>
              <PopoverBody _focusVisible={{}} _focus={{}} align='right'>

                <InputGroup>
                  <Input borderRadius='20px' _focusVisible={{}} _focus={{}} borderColor={mainColor}
                         onChange={(e) => {setSearch(e.target.value); store.keyword.setValue(e.target.value)}}
                         value={search}
                  />
                  <InputRightElement onClick={() => store.onClear()} children={<CloseIcon color="green.500" />} />
                </InputGroup>
                <List spacing={5} padding={4} maxH="500px" overflowY="scroll">
                  {store.tokens.map((i, item) => (
                    <ListItem key={`${record.activeTab.value}-${item}`} cursor="pointer" display="flex" alignItems="center" justifyContent="space-between" onClick={() =>  {store.onSelect(i.address); onClose();}}>
                      <Box display="flex" alignItems="center">
                        <Image borderRadius='full' boxSize='24px' src={i.logoURI} mr='4'
                               fallbackSrc="https://via.placeholder.com/150" />
                        {i.symbol}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    );
  }
);
