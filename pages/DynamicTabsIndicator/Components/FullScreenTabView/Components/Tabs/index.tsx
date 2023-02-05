import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';
import Indicator from './Components/Indicator';
import Tab from './Components/Tab';

import type { TabLayout } from './Components/Tab';
import { Colors } from '../../../../../../styles';

type TabProps = {
  data: Array<{ key: string; title: string }>;
  selectedIndex: number;
  selectIndex: (index: number) => void;
};

const emptyLayout = { width: 0, x: 0 };

const Tabs: React.FC<TabProps> = ({ data, selectedIndex, selectIndex }) => {
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

  return (
    <View style={styles.container}>
      {data.map(({ key, title }, index) => (
        <Tab
          key={key}
          title={title}
          fontSize={84 / data.length}
          setLayout={({ width, x }) => {
            setTabLayouts((currLayout) =>
              [...currLayout].map((tabLayout, i) =>
                index === i ? { width, x } : tabLayout
              )
            );
          }}
          onPress={() => selectIndex(index)}
        />
      ))}
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
