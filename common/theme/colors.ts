import { Theme } from '@chakra-ui/react';
import Values from 'values.js';

const shades = (color: string, p = 20) =>
  new Values(color).all(p).reduce((prev, curr, currentIndex) => {
    if (currentIndex === 0) {
      return { ...prev, 50: curr.hexString() };
    }
    return { ...prev, [currentIndex * 100]: curr.hexString() };
  }, {});

export const gray = shades('#d9d9d9') as Theme['colors']['gray'];
export const black = '#373A36';
export const white = '#FFFFFC';
export const red = shades('#E53124') as Theme['colors']['red'];
export const yellow = shades('#FCAB10') as Theme['colors']['yellow'];
export const green = shades('#4DA167') as Theme['colors']['green'];
