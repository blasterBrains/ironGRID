import { red, white, yellow, green } from './colors';
import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';

// https://chakra-ui.com/docs/styled-system/customize-theme
// https://chakra-ui.com/docs/components/button/theming

const variants = {
  solid: defineStyle({
    color: 'green.500',
    backgroundColor: 'white',
    _hover: {
      opacity: 0.8,
      color: 'green.500',
    },
  }),
  outline: defineStyle({
    color: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: 'green.500',
    _hover: {
      backgroundColor: 'green.400',
    },
  }),
  ghost: defineStyle({
    backgroundColor: 'green.500',
    color: 'white',
    _hover: {
      color: 'green.500',
      backgroundColor: 'white',
    },
  }),
};

const sizes = {
  xl: defineStyle({
    fontSize: 'xl',
    h: '4rem',
    width: '14em',
    borderRadius: '1rem',
  }),
};

const buttons = defineStyleConfig({
  variants,
  sizes,
  baseStyle: defineStyle({
    height: 100,
    marginX: 3,
    marginY: 3,
    fontWeight: 800,
  }),
});

export default buttons;
