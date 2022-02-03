import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as pages from './pages';
import type { PageName } from './pages';
import { Colors } from './constants';

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
        underlayColor={Colors.kombuGreen}
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
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: styles.headerContainer,
            headerTitleStyle: styles.headerTitle,
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
              headerTitleStyle: styles.headerTitle,
            }}
          />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.spanishBistre,
    paddingVertical: 20,
  },
  pageListItemContainer: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.rifleGreen,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  pageListItemText: {
    fontSize: 15,
    color: 'white',
  },
  pageListItemSeparator: {
    height: 2,
  },
  headerContainer: {
    backgroundColor: Colors.honeyYellow,
  },
  headerTitle: {
    color: 'black',
  },
});
