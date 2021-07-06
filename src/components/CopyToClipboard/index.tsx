import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { helper } from '@/lib/helper';
import * as clipboard from 'clipboard-polyfill/text';

const CopyToClipboard = ({ text, children }) => {
  const store = useLocalObservable(() => ({
    isTipOpen: false,
    toggleTipOpen(val: boolean) {
      this.isTipOpen = val;
    }
  }));
  const copyText = async (text: string) => {
    await clipboard.writeText(text)
    store.toggleTipOpen(true);
    setTimeout(() => {
      store.toggleTipOpen(false);
    }, 500);
  };
  return (
    <Tooltip label='Copied' placement='bottom' isOpen={store.isTipOpen}>
      <span
        onClick={() => copyText(text)}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default observer(CopyToClipboard);
