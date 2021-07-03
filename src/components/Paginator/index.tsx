import React, { forwardRef } from "react";
import { Box, Button, Icon, BoxProps, Center } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";
import { observer } from 'mobx-react-lite';

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
  minH: "1.5rem",
  minW: "1.5rem",
  w: "1.5rem",
  h: "1.5rem",
  p: "0",
  fontSize: "0.875rem",
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

  const PageSizeSelector = forwardRef<HTMLButtonElement>((props, ref) => (
    <Button
      ref={ref}
      {...props}
      bg="gray.bg3"
      borderRadius="1"
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

  return (
    <Box
      w="full"
      py="4"
    >
      <Pagination
        defaultCurrent={defaultPage}
        defaultPage={defaultPage}
        defaultPageSize={defaultSize}
        total={total}
        paginationProps={paginationProps}
        baseStyles={baseStyles}
        activeStyles={activeStyles}
        hoverStyles={activeStyles}
        pageNeighbours={1}
        showSizeChanger
        showQuickJumper
        itemRender={itemRender}
        onChange={(currentPage, totalPages, pageSize, total) => {
          onPageChange(currentPage)
        }}
        onShowSizeChange={(currentPage, size) => {
          onSizeChange(size)
        }}
      />
    </Box>
  );
});
