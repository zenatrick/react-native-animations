import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Colors, getCircleStyle } from '../../styles';

const pageOptions = {
  title: 'Pan Gesture Demo',
};
const PanGestureDemo: React.FC = () => {
  const translation = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offset.value = { ...translation.value };
    })
    .onUpdate(({ translationX, translationY }) => {
      const { x: offsetX, y: offsetY } = offset.value;
      translation.value = {
        x: translationX + offsetX,
        y: translationY + offsetY,
      };
    });

  const translationStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translation.value.x },
      { translateY: translation.value.y },
    ],
  }));

  return (
    <View style={styles.pageContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.circle1, translationStyle]} />
      </GestureDetector>
    </View>
  );
};

export { pageOptions, PanGestureDemo as PageComponent };

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.charcoal,
  },
  circle1: {
    ...getCircleStyle({ diameter: 50, color: Colors.asparagus }),
  },
});
