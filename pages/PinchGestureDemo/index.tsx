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
  const prevFocal = useSharedValue({ x: 0, y: 0 });

  /**
   * Used to determine the focal point of the zoom in the original image grid.
   */
  const zoomFocal = useSharedValue({ x: 0, y: 0 });

  /**
   * Used to translate the image on subsequent zooms.
   */
  const originShift = useSharedValue({ x: 0, y: 0 });

  /**
   * zoomFocal's origin is at the top left corner of the image
   * but zooming happens relative to the center of the image.
   *
   * Therefore, we need to transform the zoomFocal's origin the
   * center of the image.
   */
  const translatedZoomFocal = useDerivedValue(() => ({
    x: zoomFocal.value.x - imageSize.value.width / 2,
    y: zoomFocal.value.y - imageSize.value.height / 2,
  }));

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translatedZoomFocal.value.x + originShift.value.x },
      { translateY: translatedZoomFocal.value.y + originShift.value.y },
      { scale: scale.value },
      { translateY: -translatedZoomFocal.value.y },
      { translateX: -translatedZoomFocal.value.x },
    ],
  }));

  const pinchGesture = Gesture.Pinch()
    .onStart(({ focalX, focalY }) => {
      startScale.value = scale.value;

      const zoomFocalRelativeToLastZoom = {
        x: prevFocal.value.x + (focalX - prevFocal.value.x) / scale.value,
        y: prevFocal.value.y + (focalY - prevFocal.value.y) / scale.value,
      };

      zoomFocal.value = {
        x: zoomFocalRelativeToLastZoom.x - originShift.value.x,
        y: zoomFocalRelativeToLastZoom.y - originShift.value.y,
      };

      originShift.value = {
        x: focalX - zoomFocalRelativeToLastZoom.x + originShift.value.x,
        y: focalY - zoomFocalRelativeToLastZoom.y + originShift.value.y,
      };

      prevFocal.value = { x: focalX, y: focalY };
    })
    .onChange(({ scale: newScale }) => {
      let result = newScale * startScale.value;
      if (result > MAX_SCALE) {
        result = MAX_SCALE;
      }
      scale.value = result;
    })
    .onEnd(() => {
      // TODO: Move this into a reset button
      scale.value = withSpring(1, { damping: 100 }, () => {
        prevFocal.value = { x: 0, y: 0 };
        zoomFocal.value = { x: 0, y: 0 };
        originShift.value = { x: 0, y: 0 };
      });
    });

  return (
    <View style={styles.pageContainer}>
      <GestureDetector gesture={pinchGesture}>
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
