import { ColorValue, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const title = 'Tap Gesture Demo';
const TapGestureDemo: React.FC = () => {
  const backgroundColor = useSharedValue<ColorValue>('transparent');
  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));
  const tapGesture = Gesture.Tap().onFinalize(({ state }) => {
    switch (state) {
      case State.END:
        backgroundColor.value = 'lightgreen';
        return;
      case State.FAILED:
        backgroundColor.value = 'pink';
        return;
      default:
        backgroundColor.value = 'lightgrey';
        return;
    }
  });

  return (
    <View style={styles.pageContainer}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={containerStyle}>
          <Text>Tap Me!</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export { title, TapGestureDemo as PageComponent };

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
