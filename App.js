import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

// Screens
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ListsScreen from './screens/ListsScreen';
import CreateListScreen from './screens/CreateListScreen';
import ScanScreen from './screens/ScanScreen';
import ItemsScreen from './screens/ItemsScreen';
import CreateItemScreen from './screens/CreateItemScreen';
import EditItemScreen from './screens/EditItemScreen';
import ScannedItemScreen from './screens/ScannedItemScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator ({
              lists: {
                screen: StackNavigator ({
                    listsScreen: { screen: ListsScreen },
                    createList: {
                        screen: CreateListScreen,
                        navigationOptions: {
                            tabBarVisible: false
                        }
                    },
                    items: {
                        screen: ItemsScreen,
                        navigationOptions: {
                            tabBarVisible: false
                        }
                    },
                    createItem: {
                        screen: CreateItemScreen,
                        navigationOptions: {
                            tabBarVisible: false
                        }
                    },
                    editItem: {
                        screen: EditItemScreen,
                        navigationOptions: {
                            tabBarVisible: false
                        }
                    }
                })
              },
              scan: {
                  screen: StackNavigator ({
                      scanScreen: {
                          screen: ScanScreen,
                          navigationOptions: {
                              header: null
                          }
                      },
                      scannedItem: {
                          screen: ScannedItemScreen,
                          navigationOptions: {
                              tabBarVisible: false
                          }
                      }
                  }, {
                      lazy: true
                  })
              }
          }, {
              tabBarOptions: {
                  showLabel: false,
                  style: {
                      backgroundColor: '#01579b'
                  },
                  activeTintColor: '#fdd835',
                  inactiveTintColor: '#FFFFFF'
              }
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
                <StatusBar
                    barStyle="light-content"
                />
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
