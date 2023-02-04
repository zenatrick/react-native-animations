import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as pages from './pages';
import { Colors } from './styles';

import type { PageName } from './pages';

type RootStackParamList = Record<PageName | 'Home', undefined>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const pageList = Object.entries(pages).map(
  ([key, { title, PageComponent }]) => ({
    pageName: key as PageName,
    title,
    PageComponent,
  })
);

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => (
  <FlatList
    style={styles.pageContainer}
    data={pageList}
    keyExtractor={(item) => item.pageName}
    renderItem={({ item: { pageName, title } }) => (
      <TouchableHighlight
        underlayColor={Colors.darkLiver}
        style={styles.pageListItemContainer}
        onPress={() => navigation.navigate(pageName)}
      >
        <Text style={styles.pageListItemText}>{title}</Text>
      </TouchableHighlight>
    )}
    ItemSeparatorComponent={() => <View style={styles.pageListItemSeparator} />}
  />
);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator initialRouteName="Home">
          <Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: styles.headerContainer,
              headerTintColor: Colors.white,
            }}
          />
          {pageList.map(({ pageName, title, PageComponent }) => (
            <Screen
              key={pageName}
              name={pageName}
              component={PageComponent}
              options={{
                title,
                headerStyle: styles.headerContainer,
                headerTintColor: Colors.white,
              }}
            />
          ))}
        </Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
export default App;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.charcoal,
    paddingVertical: 20,
  },
  pageListItemContainer: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.dimGray,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  pageListItemText: {
    fontSize: 15,
    color: Colors.lightGray,
  },
  pageListItemSeparator: {
    height: 2,
  },
  headerContainer: {
    backgroundColor: Colors.darkLiver,
  },
});
