import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class ListsScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: 'Lists',
            headerRight: (
                <Button
                    title="Add"
                    onPress={() => navigation.navigate('createList')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0, 122, 255, 1)"
                />
            )
        });
    }

    render() {
        return (
            <View>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
            </View>
        )
    }
}

export default ListsScreen;