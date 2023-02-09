/**
 * Trying idea from video: https://youtu.be/dQVQQ6LKdwc
 * Video Title: Reanimated 2 Transitions
 * Source Code: https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/reanimated-2/src/Transitions/Transitions.tsx
 */
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Card, cards as allCards } from '../../components';
import { Colors, SCREEN_WIDTH, StyleGuide } from '../../styles';

const pageOptions = {
  title: 'Card Transition',
};

const useSpring = (state: boolean) => {
  const value = useSharedValue(state ? 1 : 0);
  useEffect(() => {
    value.value = withSpring(state ? 1 : 0);
  }, [state, value]);

  return value;
};

const cards = allCards.slice(0, 5);

const CardTransition: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const transition = useSpring(toggle);
  return (
    <View style={styles.pageContainer}>
      {cards.map((card, index) => {
        const transformStyle = useAnimatedStyle(() => {
          const rotate =
            (index - Math.floor(cards.length / 2)) *
            (Math.PI / 6) *
            transition.value;

          return {
            transform: [
              { translateX: -SCREEN_WIDTH / 2 },
              { rotate: `${rotate}rad` },
              { translateX: SCREEN_WIDTH / 2 },
            ],
          };
        });
        return (
          <Animated.View style={[styles.cardContainer, transformStyle]}>
            <Card card={card} />
          </Animated.View>
        );
      })}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => setToggle((currToggle) => !currToggle)}
        >
          <Text style={styles.buttonText}>{toggle ? 'Reset' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { pageOptions, CardTransition as PageComponent };

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 0,
    backgroundColor: Colors.artichoke,
  },
  buttonTouchable: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...StyleGuide.typography.headline,
    fontWeight: '600',
    color: Colors.white,
  },
  cardContainer: {
    position: 'absolute',
  },
});
