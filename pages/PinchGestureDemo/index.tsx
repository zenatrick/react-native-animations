import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../../styles';

const MAX_SCALE = 10;

const pageOptions = {
  title: 'Pinch Gesture Demo',
};
const PinchGestureDemo: React.FC = () => {
  const imageSize = useSharedValue({ width: 0, height: 0 });

  /**
   * Used to keep track of how much to scale the image.
   */
  const scale = useSharedValue(1);

  /**
   * Used to keep track of the starting scale value to that the further scaling can be
   * applied on top of the starting scale.
   */
  const startScale = useSharedValue(1);

  /**
   * Used to keep track of the previous focalX and focalX.
   */
  const prevFocalX = useSharedValue(0);
  const prevFocalY = useSharedValue(0);

  /**
   * Used to determine the focal point of the zoom in the original image grid.
   */
  const zoomFocalX = useSharedValue(0);
  const zoomFocalY = useSharedValue(0);

  /**
   * Used to translate the image on subsequent zooms.
   */
  const originShiftX = useSharedValue(0);
  const originShiftY = useSharedValue(0);

  /**
   * zoomFocal's origin is at the top left corner of the image
   * but zooming happens relative to the center of the image.
   *
   * Therefore, we need to transform the zoomFocal's origin the
   * center of the image.
   */
  const translatedZoomFocal = useDerivedValue(() => ({
    x: zoomFocalX.value - imageSize.value.width / 2,
    y: zoomFocalY.value - imageSize.value.height / 2,
  }));

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translatedZoomFocal.value.x + originShiftX.value },
      { translateY: translatedZoomFocal.value.y + originShiftY.value },
      { scale: scale.value },
      { translateY: -translatedZoomFocal.value.y },
      { translateX: -translatedZoomFocal.value.x },
    ],
  }));

  // TODO: improve the reset zoom animation. Currently it doesnt not zoom back smoothly.
  const resetZoomTransformation = () => {
    'worklet';

    const zero = withSpring(0, { damping: 100 });
    prevFocalX.value = 0;
    prevFocalY.value = 0;
    zoomFocalX.value = zero;
    zoomFocalY.value = zero;
    originShiftX.value = zero;
    originShiftY.value = zero;
  };

  const pinchGesture = Gesture.Pinch()
    .onStart(({ focalX, focalY }) => {
      startScale.value = scale.value;

      const zoomFocalRelativeToLastZoom = {
        x: prevFocalX.value + (focalX - prevFocalX.value) / scale.value,
        y: prevFocalY.value + (focalY - prevFocalY.value) / scale.value,
      };

      zoomFocalX.value = zoomFocalRelativeToLastZoom.x - originShiftX.value;
      zoomFocalY.value = zoomFocalRelativeToLastZoom.y - originShiftY.value;

      originShiftX.value =
        focalX - zoomFocalRelativeToLastZoom.x + originShiftX.value;
      originShiftY.value =
        focalY - zoomFocalRelativeToLastZoom.y + originShiftY.value;

      prevFocalX.value = focalX;
      prevFocalY.value = focalY;
    })
    .onChange(({ scale: newScale }) => {
      let result = newScale * startScale.value;
      if (result > MAX_SCALE) {
        result = MAX_SCALE;
      }
      scale.value = result;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1, { damping: 100 }, resetZoomTransformation);
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(({ x, y }) => {
      if (scale.value === 1) {
        zoomFocalX.value = x;
        zoomFocalY.value = y;
        prevFocalX.value = x;
        prevFocalY.value = y;
        scale.value = withSpring(2, { damping: 100 });
      } else if (scale.value > 1) {
        scale.value = withSpring(1, { damping: 100 }, resetZoomTransformation);
      }
    });

  const composedGesture = Gesture.Exclusive(pinchGesture, doubleTapGesture);

  return (
    <View style={styles.pageContainer}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { width, height },
            },
          }) => {
            imageSize.value = { width, height };
          }}
        >
          <Animated.Image
            source={{
              uri: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            style={[{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }, zoomStyle]}
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
