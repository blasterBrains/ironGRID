import { modalAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

const basic = definePartsStyle({
  dialogContainer: {
    background: '#0000009c',
  },
  dialog: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginX: 5,
  },
});

const modals = defineMultiStyleConfig({
  variants: { basic },
  defaultProps: {
    variant: 'basic',
  },
});

export default modals;
