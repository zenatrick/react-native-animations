/**
 * Trying idea from video: https://youtu.be/ZiSN9uik6OY
 * Video Title: React Native Animated Tabs & Animated Indicator using FlatList
 *
 * Video uses the React Native Animated API.
 * My version uses the React Native Reanimated 2 API.
 */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import FullScreenTabView from './Components/FullScreenTabView';
import { images } from './data';

import type { FullScreenTabViewProps } from './Components/FullScreenTabView';

const data: FullScreenTabViewProps['data'] = (
  Object.keys(images) as Array<keyof typeof images>
).map((key) => ({
  key: key,
  title: key,
  imageUri: images[key],
}));

const pageOptions = {
  title: 'Dynamic Tabs Indicators',
  header: () => null,
};

const DynamicTabsIndicator: React.FC = () => {
  return (
    <View style={styles.pageContainer}>
      <StatusBar hidden />
      <FullScreenTabView data={data} />
    </View>
  );
};

export { pageOptions, DynamicTabsIndicator as PageComponent };

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
