import { sliderAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(sliderAnatomy.keys);

const round = definePartsStyle({
  mark: {
    color: 'white',
  },
  filledTrack: {
    backgroundColor: 'yellow.500',
  },
});

const sliders = defineMultiStyleConfig({
  variants: { round },
  defaultProps: {
    variant: 'round',
  },
});

export default sliders;
