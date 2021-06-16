import { observer } from 'mobx-react-lite';
import { Box } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import React from 'react';

const Logo = (props)=>{
  return(
    <Box {...props}>
      <Image src='images/logo_iotube.png'/>
    </Box>
  )
}

export default observer(Logo)
