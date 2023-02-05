import { StyleSheet } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';
import { Colors } from '../../../../../../../styles';

import type { ViewStyle } from 'react-native';

type IndicatorProps = {
  animatedStyle: ViewStyle;
};

const Indicator: React.FC<IndicatorProps> = ({ animatedStyle }) => (
  <Animated.View style={[styles.indicator, animatedStyle]} layout={Layout} />
);

export default Indicator;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 8,
    height: 3,
    width: 0,
    left: 0,
    backgroundColor: Colors.white,
    borderRadius: 1,
  },
});
