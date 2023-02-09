import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../../../../../styles';

import type { Insets, TextStyle, ViewProps } from 'react-native';

export type TabProps = {
  title: string;
  fontSize: number;
  onPress: () => void;
  onLayout: ViewProps['onLayout'];
};

const tabHitSlop: Insets = {
  top: 10,
  left: 2,
  right: 2,
  bottom: 15,
};

const Tab: React.FC<TabProps> = ({ title, fontSize, onPress, onLayout }) => (
  <View onLayout={onLayout}>
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
