import React, { forwardRef, useEffect, useState } from 'react';
import { Box, Button, Icon, BoxProps, Center, Text, Input, HStack } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/index';

interface PaginatorProps {
  total: number,
  defaultPage: number,
  defaultSize: number,
  onPageChange?: (page: number) => void,
  onSizeChange?: (size: number) => void,
}

const baseStyles: BoxProps  = {
  bg: "transparent",
  boxSizing: "border-box",
  minH: "6",
  minW: "6",
  w: "6",
  h: "6",
  p: "0",
  fontSize: "sm",
  fontFamily: "dmSans"
};

const paginationProps: BoxProps = {
  display: "flex",
  color: "gray.2"
};

const activeStyles: BoxProps = {
  border: "1px solid lightGreen",
  borderRadius: "0.3125rem",
  color: "lightGreen"
};

export const Paginator = observer((
  {
    total,
    defaultPage,
    defaultSize,
    onPageChange,
    onSizeChange
  }: PaginatorProps) => {

  const { lang } = useStore();

  const [curPage, setCurPage] = useState<number>(defaultPage);
  const [pageJumper, setPageJumper] = React.useState<string>('');
  const totalPages = Math.ceil(total / defaultSize);

  const PageSizeSelector = forwardRef<HTMLButtonElement>((props, ref) => (
    <Button
      ref={ref}
      {...props}
      bg="bg.bg3Alpha20"
      borderRadius="base"
      mx="2"
      px="2"
      h="6"
      minH="6"
      my="auto"
    >
      {props.children}
      <Icon as={ChevronDownIcon} ml="2" />
    </Button>
  ));

  const itemRender = (_, type) => {
    if (type === "pageSize") {
      return PageSizeSelector
    }
  };

  const goToPage = (e) => {
    e.preventDefault();
    const page = Math.max(0, Math.min(parseInt(pageJumper), totalPages));
    setCurPage(page);
    onPageChange(page);
  };

  return (
    <HStack
      w="full"
      py="4"
    >
      <Pagination
        current={curPage}
        defaultCurrent={defaultPage}
        defaultPage={defaultPage}
        defaultPageSize={defaultSize}
        total={total}
        itemRender={itemRender}
        paginationProps={paginationProps}
        baseStyles={baseStyles}
        activeStyles={activeStyles}
        hoverStyles={activeStyles}
        pageNeighbours={1}
        showSizeChanger
        onChange={(currentPage, totalPages, pageSize, total) => {
          onPageChange(currentPage)
        }}
        onShowSizeChange={(currentPage, size) => {
          onSizeChange(size)
        }}
      />

      <HStack
        as='form'
        userSelect='none'
        fontSize='sm'
        fontFamily='dmSans'
        color='gray.2'
        onSubmit={goToPage}
      >
        <Text wordBreak='unset'>{lang.t('go_to')}:</Text>
        <Input
          w='12'
          h='6'
          border='none'
          bg='bg.bg3Alpha20'
          borderRadius="base"
          px='1.5'
          type='number'
          onChange={e => setPageJumper(e.target.value)}
        />
      </HStack>
    </HStack>
  );
});
