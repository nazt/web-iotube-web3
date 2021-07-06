import { IconButton, useColorMode, useTheme } from '@chakra-ui/react';
import React  from 'react';
import { MoonDarkIcon, SunnyIcon } from '@/components/Icon';

const ToggleModeButton=()=>{
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      _focus={{}}
      variant={'unstyled'}
      fontSize={theme.iconSize.md}
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <SunnyIcon /> : <MoonDarkIcon />}
     aria-label={'toggle mode'}/>
  )
}

export default ToggleModeButton
