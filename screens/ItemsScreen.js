import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

class ItemsScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: navigation.state.params.name,
            headerRight: (
                <Button
                    title="Add"
                    onPress={() => navigation.navigate('createItem')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0, 122, 255, 1)"
                />
            )
        });
    }

    render() {
        return (
            <View>
                <Text>ItemsScreen</Text>
                <Text>ItemsScreen</Text>
                <Text>ItemsScreen</Text>
                <Text>ItemsScreen</Text>
                <Text>ItemsScreen</Text>
                <Text>ItemsScreen</Text>
            </View>
        )
    }
}

export default ItemsScreen;