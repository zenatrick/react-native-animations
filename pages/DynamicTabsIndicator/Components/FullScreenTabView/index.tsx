import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../styles';
import Tabs from './Components/Tabs';

type DataPoint = { key: string; title: string; imageUri: string };

export type FullScreenTabViewProps = {
  data: Array<DataPoint>;
};

const FullScreenTabView: React.FC<FullScreenTabViewProps> = ({ data }) => {
  const flatListRef = React.createRef<FlatList<DataPoint>>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectIndex = useCallback(
    (index: number) => {
      flatListRef.current?.scrollToIndex({ index });
    },
    [flatListRef]
  );

  return (
    <>
      <FlatList<DataPoint>
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.imageUri }}
              style={styles.imageContainer}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
          </View>
        )}
        onScroll={({ nativeEvent: { contentOffset, layoutMeasurement } }) => {
          setSelectedIndex(
            Math.floor(contentOffset.x / layoutMeasurement.width)
          );
        }}
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
