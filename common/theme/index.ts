import { extendTheme } from '@chakra-ui/react';
import * as colors from './colors';
import global from './global';
import Button from './buttons';
import Card from './cards';
import Input from './inputs';

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
    Input,
  },
});

export default customTheme;
