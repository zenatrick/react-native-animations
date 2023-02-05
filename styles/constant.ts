import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('screen');

/**
 * Source: https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/reanimated-2/src/components/StyleGuide.ts
 */
export const StyleGuide = {
  spacing: 8,
  palette: {
    primary: '#3884ff',
    secondary: '#FF6584',
    tertiary: '#38ffb3',
    backgroundPrimary: '#d5e5ff', // === rgba(primary, 0.1)
    background: '#f2f2f2',
    border: '#f2f2f2',
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      color: '#999999',
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
    },
  },
};

export const Colors = {
  white: 'rgb(255, 255, 255)',
  lightGray: 'rgb(235, 235, 235)',
  black: 'rgb(0, 0, 0)',
  black95: 'rgba(0, 0, 0, 0.95)',
  black90: 'rgba(0, 0, 0, 0.9)',
  black85: 'rgba(0, 0, 0, 0.85)',
  black80: 'rgba(0, 0, 0, 0.8)',
  black75: 'rgba(0, 0, 0, 0.75)',
  black70: 'rgba(0, 0, 0, 0.7)',
  black65: 'rgba(0, 0, 0, 0.65)',
  black60: 'rgba(0, 0, 0, 0.6)',
  black55: 'rgba(0, 0, 0, 0.55)',
  black50: 'rgba(0, 0, 0, 0.5)',
  black30: 'rgba(0, 0, 0, 0.3)',

  charcoal: '#394053',
  darkLiver: '#4e4a59',
  dimGray: '#6e6362',
  artichoke: '#839073',
  asparagus: '#7cae7a',

  kombuGreen: '#363e27',
  rifleGreen: '#484c2c',
  spanishBistre: '#84823e',
  appleGreen: '#95b22c',
  honeyYellow: '#ffb217',
};
