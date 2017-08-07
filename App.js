import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

// Screens
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ListsScreen from './screens/ListsScreen';
import CreateListScreen from './screens/CreateListScreen';
import ScanScreen from './screens/ScanScreen';
import CreateItemScreen from './screens/CreateItemScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator ({
              lists: {
                screen: StackNavigator({
                    listsScreen: { screen: ListsScreen },
                    createList: { screen: CreateListScreen }
                })
              },
              scan: { screen: ScanScreen },
              createItem: { screen: CreateItemScreen }

          })
        }
    }, {
        navigationOptions: {
            tabBarVisible: false
        },
        lazy: true
    });

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <MainNavigator/>
            </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});