import { extendTheme } from '@chakra-ui/react';
import * as colors from './colors';
import global from './global';
import Button from './buttons';

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
  },
});

export default customTheme;
