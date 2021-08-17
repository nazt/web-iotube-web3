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

export const SwitchNetworkDialog = observer(() => {
  const { god, lang } = useStore();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={() => god.confirmDialogClose()}
        isOpen={god.confirmDialogOpen.value}
        isCentered
        leastDestructiveRef={null}>
        <AlertDialogOverlay/>

        <AlertDialogContent>
          <AlertDialogHeader>{lang.t('switch_network.header', {network_name: god.destChain?.name})}</AlertDialogHeader>
          <AlertDialogCloseButton/>
          <AlertDialogBody>
            {lang.t('switch_network.confirm.content',{network_name: god.destChain?.name})}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => god.confirmDialogClose()}>
              {lang.t('button.cancel')}
            </Button>
            <Button variant="green" ml={3}
                    onClick={() => {
                      god.onConfirm();
            }}>
              {lang.t('button.switch')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
