import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { green, white } from './colors';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const outline = definePartsStyle({
  field: {
    color: 'white',
    _invalid: {
      borderWidth: 2,
      borderColor: 'red.500!important',
      boxShadow: 'none',
    },
    _focusVisible: {
      borderWidth: 2,
      borderColor: 'yellow.500',
      boxShadow: 'none',
    },
    _autofill: {
      background: 'green.500',
      WebkitTextFillColor: white,
      WebkitBoxShadow: `0 0 0px 1000px ${green['500']} inset`,
    },
  },
});

const inputs = defineMultiStyleConfig({
  variants: { outline },
});

export default inputs;
