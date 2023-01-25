import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

// https://chakra-ui.com/docs/components/card/theming

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  elevated: definePartsStyle({
    container: {
      padding: '10px',
      my: '20px',
      alignItems: 'center',
      minWidth: 320,
    },
    header: {
      color: 'green.500',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    body: {
      display: 'flex',
      flex: 'auto',
      color: 'green.500',
      width: '100%',
      justifyContent: 'center',
    },
    footer: {
      color: 'green.500',
      width: '100%',
    },
  }),
  selected: definePartsStyle({
    container: {
      padding: '10px',
      my: '20px',
      alignItems: 'center',
      minWidth: 320,
      outlineStyle: 'solid',
      outlineColor: 'yellow.500',
      outlineWidth: 5,
    },
    header: {
      color: 'green.500',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    body: {
      display: 'flex',
      flex: 'auto',
      color: 'green.500',
      width: '100%',
      justifyContent: 'center',
    },
    footer: {
      color: 'green.500',
      width: '100%',
    },
  }),
};

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: '36px',
      padding: '40px',
    },
    header: {},
    body: {},
    footer: {},
  }),
};

const cards = defineMultiStyleConfig({
  variants,
  sizes,
});

export default cards;
