import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../../styles';

const MAX_SCALE = 10;

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

      // get previous focal values from previous origin
      const oldFocalX = origin.value.x + cardSize.value.width / 2;
      const oldFocalY = origin.value.y + cardSize.value.height / 2;

      // get current point which we want to focus on
      const mappedFocalX = oldFocalX + (focalX - oldFocalX) / pinchScale.value;
      const mappedFocalY = oldFocalY + (focalY - oldFocalY) / pinchScale.value;

      // TODO: currently pinch will focus on the correct point but it will zoom into it based on the original scale.
      origin.value = {
        x: mappedFocalX - cardSize.value.width / 2,
        y: mappedFocalY - cardSize.value.height / 2,
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
        >
          <Animated.Image
            source={{
              uri: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            style={[{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }, scaleStyle]}
          />
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
