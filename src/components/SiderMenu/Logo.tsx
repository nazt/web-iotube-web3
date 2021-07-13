import { observer } from 'mobx-react-lite';
import { Box } from '@chakra-ui/layout';
import { Icon, useColorModeValue, useTheme, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { IotubeIcon, IotubeMobileIcon } from '@/components/Icon';

const Logo = (props)=>{
  const theme = useTheme();

  return(
    <Box {...props}>
      <Icon
        as={useBreakpointValue({base: IotubeMobileIcon, md: IotubeIcon})}
        color={useColorModeValue(theme.colors.darkLightGreen,theme.colors.lightGreen)}
        w={useBreakpointValue({base: 12, md: 32})}
        h={useBreakpointValue({base: 12, md: 8})}/>
    </Box>
  )
}

export default observer(Logo)
