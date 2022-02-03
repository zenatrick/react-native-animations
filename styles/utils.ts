import { ColorValue, ViewStyle } from 'react-native';

import { Colors } from '.';

export const getCircleStyle = ({
  diameter,
  color = Colors.black,
}: {
  diameter: number;
  color: ColorValue;
}): ViewStyle => ({
  width: diameter,
  height: diameter,
  borderRadius: diameter / 2,
  backgroundColor: color,
});
