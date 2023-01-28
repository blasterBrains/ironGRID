import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const round = definePartsStyle({
  track: {
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    _checked: {
      backgroundColor: 'yellow.500',
    },
  },
  container: {
    marginRight: '0!important',
  },
});

const sliders = defineMultiStyleConfig({
  variants: { round },
  defaultProps: {
    variant: 'round',
  },
});

export default sliders;
