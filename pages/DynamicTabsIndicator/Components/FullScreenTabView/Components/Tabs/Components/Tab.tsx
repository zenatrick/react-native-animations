import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../../../../../styles';

import type { Insets, LayoutChangeEvent, TextStyle } from 'react-native';

export type TabProps = {
  title: string;
  index: number;
  fontSize: number;
  onPress: (index: number) => void;
  onLayout: (e: LayoutChangeEvent, index: number) => void;
};

const tabHitSlop: Insets = {
  top: 10,
  left: 2,
  right: 2,
  bottom: 15,
};

const Tab: React.FC<TabProps> = ({
  title,
  index,
  fontSize,
  onPress,
  onLayout,
}) => (
  <View onLayout={(e) => onLayout(e, index)}>
    <TouchableOpacity onPress={() => onPress(index)} hitSlop={tabHitSlop}>
      <Text
        style={StyleSheet.compose<TextStyle>(styles.titleText, { fontSize })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  </View>
);

export default React.memo(Tab);

const styles = StyleSheet.create({
  titleText: {
    color: Colors.white,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
