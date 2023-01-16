import { theme } from '@chakra-ui/react';
import type { Theme } from '@chakra-ui/react';
import { black } from './palette';
import global from './global';

const customTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    black,
  },
  styles: {
    global,
  },
};

export default customTheme;
