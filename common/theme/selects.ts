import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

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
  },
  icon: {
    color: 'white',
  },
});

const selects = defineMultiStyleConfig({
  variants: { outline },
});

export default selects;
