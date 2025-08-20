import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      size="md"
      variant="ghost"
      colorScheme="blue"
      _hover={{ bg: colorMode === 'light' ? 'gray.100' : 'gray.700' }}
    />
  );
}

export default ColorModeToggle;
