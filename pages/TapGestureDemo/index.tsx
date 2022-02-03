import { StyleSheet, Text, View } from 'react-native';

const title = 'Tap Gesture Demo';
const TapGestureDemo: React.FC = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>Tap Gesture Demo</Text>
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
