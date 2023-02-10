import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from '../../../../../../styles';
import Indicator from './Components/Indicator';
import Tab from './Components/Tab';

import type { TabProps } from './Components/Tab';

type TabLayout = {
  width: number;
  x: number;
};

type TabsProps = {
  data: Array<{ key: string; title: string }>;
  selectedIndex: number;
  selectIndex: (index: number) => void;
};

const emptyLayout: TabLayout = { width: 0, x: 0 };

const Tabs: React.FC<TabsProps> = ({ data, selectedIndex, selectIndex }) => {
  const [tabLayouts, setTabLayouts] = useState<TabLayout[]>(
    data.map(() => ({ ...emptyLayout }))
  );

  const indicatorAnimatedStyle = useAnimatedStyle(
    () => ({
      left: tabLayouts[selectedIndex].x,
      width: tabLayouts[selectedIndex].width,
    }),
    [tabLayouts, selectedIndex]
  );

  const handleSetLayout: TabProps['onLayout'] = useCallback(
    (
      {
        nativeEvent: {
          layout: { width, x },
        },
      },
      index: number
    ) => {
      setTabLayouts((currLayout) =>
        [...currLayout].map((tabLayout, i) =>
          index === i ? { width, x } : tabLayout
        )
      );
    },
    [setTabLayouts]
  );

  return (
    <View style={styles.container}>
      {data.map(({ key, title }, index) => {
        return (
          <Tab
            key={key}
            title={title}
            index={index}
            fontSize={84 / data.length}
            onLayout={handleSetLayout}
            onPress={selectIndex}
          />
        );
      })}
      <Indicator animatedStyle={indicatorAnimatedStyle} />
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.black30,
    paddingTop: 10,
    paddingBottom: 15,
  },
});
