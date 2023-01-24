import { extendTheme } from '@chakra-ui/react';
import * as colors from './colors';
import global from './global';
import Button from './buttons';
import Card from './cards';

// https://chakra-ui.com/docs/styled-system/customize-theme

const customTheme = extendTheme({
  colors,
  fonts: {
    heading: 'Futura',
    body: 'Futura',
  },
  styles: {
    global,
  },
  components: {
    Button,
    Card,
  },
});

export default customTheme;
