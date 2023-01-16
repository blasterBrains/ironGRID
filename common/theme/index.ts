import { theme } from '@chakra-ui/react';
import type { Theme } from '@chakra-ui/react';
import * as palette from './palette';
import global from './global';

const customTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    ...palette,
  },
  styles: {
    global,
  },
};

export default customTheme;
