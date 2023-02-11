import { extendTheme } from '@chakra-ui/react';
import * as colors from './colors';
import global from './global';
import Button from './buttons';
import Card from './cards';
import Input from './inputs';
import Select from './selects';
import Slider from './sliders';
import Switch from './switches';
import Table from './tables';
import Modal from './modals';

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
    Select,
    Slider,
    Switch,
    Table,
    Modal,
  },
});

export default customTheme;
