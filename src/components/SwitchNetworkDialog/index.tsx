import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import {
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  Button,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter
} from '@chakra-ui/react';

interface PropsType {
  onConfirm: Function;
  isOpen: boolean;
  onClose: Function;
  destChain?: string;
}

export const SwitchNetworkDialog = observer((props: PropsType) => {
  const { lang } = useStore();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={() => props.onClose()}
        isOpen={props.isOpen}
        isCentered
        leastDestructiveRef={null}>
        <AlertDialogOverlay/>

        <AlertDialogContent>
          <AlertDialogHeader>{lang.t('switch_network.header', {network_name: props.destChain})}</AlertDialogHeader>
          <AlertDialogCloseButton/>
          <AlertDialogBody>
            {lang.t('switch_network.confirm.content',{network_name: props.destChain})}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => props.onClose()}>
              {lang.t('button.no')}
            </Button>
            <Button variant="green" ml={3}
                    onClick={() => {
              props.onConfirm();
            }}>
              {lang.t('button.yes')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
