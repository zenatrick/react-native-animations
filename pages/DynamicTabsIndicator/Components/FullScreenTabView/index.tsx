import React, { useCallback, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../styles';
import Tabs from './Components/Tabs';

import type {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

type DataPoint = { key: string; title: string; imageUri: string };

export type FullScreenTabViewProps = {
  data: Array<DataPoint>;
};

const renderListItem: ListRenderItem<DataPoint> = ({ item }) => (
  <View>
    <Image
      source={{ uri: item.imageUri }}
      style={styles.imageContainer}
      resizeMode="cover"
    />
    <View style={styles.overlay} />
  </View>
);

const keyExtractor = (item: DataPoint) => item.key;

const FullScreenTabView: React.FC<FullScreenTabViewProps> = ({ data }) => {
  const flatListRef = useRef<FlatList<DataPoint>>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectIndex = useCallback(
    (index: number) => {
      flatListRef.current?.scrollToIndex({ index });
    },
    [flatListRef]
  );

  const onScroll = useCallback(
    ({
      nativeEvent: { contentOffset, layoutMeasurement },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      setSelectedIndex(Math.floor(contentOffset.x / layoutMeasurement.width));
    },
    [setSelectedIndex]
  );

  return (
    <>
      <FlatList<DataPoint>
        ref={flatListRef}
        data={data}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        scrollEventThrottle={1}
        renderItem={renderListItem}
        onScroll={onScroll}
      />
      <Tabs
        data={data}
        selectedIndex={selectedIndex}
        selectIndex={selectIndex}
      />
    </>
  );
};

export default FullScreenTabView;

const styles = StyleSheet.create({
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black30,
  },
});
