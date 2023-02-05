import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../../../../../styles';

import type { Insets, TextStyle } from 'react-native';

export type TabLayout = {
  width: number;
  x: number;
};

type TabProp = {
  title: string;
  fontSize: number;
  onPress: () => void;
  setLayout: ({ width, x }: { width: number; x: number }) => void;
};

const tabHitSlop: Insets = {
  top: 10,
  left: 2,
  right: 2,
  bottom: 15,
};

const Tab: React.FC<TabProp> = ({ title, fontSize, onPress, setLayout }) => (
  <View
    onLayout={({
      nativeEvent: {
        layout: { width, x },
      },
    }) => {
      setLayout({ width, x });
    }}
  >
    <TouchableOpacity onPress={onPress} hitSlop={tabHitSlop}>
      <Text
        style={StyleSheet.compose<TextStyle>(styles.titleText, { fontSize })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  </View>
);

export default Tab;

const styles = StyleSheet.create({
  titleText: {
    color: Colors.white,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
