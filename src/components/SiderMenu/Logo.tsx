import { observer } from 'mobx-react-lite';
import { Box } from '@chakra-ui/layout';
import { Icon, Image, useColorModeValue, useTheme } from '@chakra-ui/react';
import React from 'react';
import { IotubeIcon } from '@/components/Icon';

const Logo = (props)=>{
  const theme = useTheme();
  return(
    <Box {...props}>
      <Icon as={IotubeIcon} color={useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)} w={32} h={8}/>
    </Box>
  )
}

export default observer(Logo)
