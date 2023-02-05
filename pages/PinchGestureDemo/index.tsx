import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Card, Cards } from '../../components';

const MAX_SCALE = 2;

const pageOptions = {
  title: 'Pinch Gesture Demo',
};
const PinchGestureDemo: React.FC = () => {
  const cardSize = useSharedValue({ width: 0, height: 0 });
  const pinchScale = useSharedValue(1);
  const scaleOffset = useSharedValue(1);
  const origin = useSharedValue({ x: 0, y: 0 });

  const pinchGesture = Gesture.Pinch()
    .onStart(({ focalX, focalY }) => {
      scaleOffset.value = pinchScale.value;
      origin.value = {
        x: focalX - cardSize.value.width / 2,
        y: focalY - cardSize.value.height / 2,
      };
    })
    .onChange(({ scale }) => {
      let result = scale * scaleOffset.value;
      if (result > MAX_SCALE) {
        result = MAX_SCALE;
      }
      pinchScale.value = result;
    })
    .onEnd(() => {
      pinchScale.value = withSpring(1, { damping: 100 });
    });

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: origin.value.x },
      { translateY: origin.value.y },
      { scale: pinchScale.value },
      { translateY: -origin.value.y },
      { translateX: -origin.value.x },
    ],
  }));

  return (
    <View style={styles.pageContainer}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { width, height },
            },
          }) => {
            cardSize.value = { width, height };
          }}
          style={scaleStyle}
        >
          <Card card={Cards.Card1} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export { pageOptions, PinchGestureDemo as PageComponent };

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
