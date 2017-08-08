import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import { addUser } from '../actions';

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

    componentDidMount() {
        this.props.addUser(this.props.facebook_id);
    }

    componentDidUpdate() {
        // get list here
    }

    render() {
        return (
            <View>
                <Text>{this.props.facebook_id}</Text>
                <Text>{this.props.userId}</Text>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
                <Text>ListsScreen</Text>
            </View>
        )
    }
}

function mapStateToProps({ auth, user }) {
    return {
        facebook_id: auth.facebook_id,
        userId: user.userId
    };
}

export default connect(mapStateToProps, { addUser })(ListsScreen);