import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as pages from './pages';
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
    data={pageList}
    keyExtractor={(item) => item.pageName}
    renderItem={({ item: { pageName, title } }) => (
      <TouchableOpacity onPress={() => navigation.navigate(pageName)}>
        <Text>{title}</Text>
      </TouchableOpacity>
    )}
  />
);

const App = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} />
        {pageList.map(({ pageName, title, PageComponent }) => (
          <Screen
            key={pageName}
            name={pageName}
            component={PageComponent}
            options={{ title }}
          />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
