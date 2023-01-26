import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const simple = definePartsStyle({
  th: {
    py: 5,
    px: 2,
    color: 'yellow.500',
    textAlign: 'center',
  },
  td: {
    py: 5,
    px: 2,
    color: 'white',
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    fontSize: 12,
    width: 62,
    height: 62,
  },
});

const tables = defineMultiStyleConfig({
  variants: { simple },
  defaultProps: {
    variant: 'simple',
  },
});

export default tables;
