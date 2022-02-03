import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const title = 'Pan Gesture Demo';
const PanGestureDemo = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>Pan Gesture Demo</Text>
    </View>
  );
};

export { title, PanGestureDemo as PageComponent };

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
