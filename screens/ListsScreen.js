import React, { Component } from 'react';
import { View, Text, Button, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { addUser, getLists, selectList } from '../actions';

import MyList from '../components/MyList';

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
            ),
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="list-ol" type="font-awesome" size={30} color={tintColor} />
            }
        });
    }

    async componentWillMount() {
        await this.props.addUser(this.props.facebook_id);
        await this.props.getLists(this.props.userId);
        DeviceEventEmitter.addListener('LIST_CREATED', (e) => {this.forceUpdate()});
    }

    onListSelected = (listId) => {
        this.props.selectList(listId);
        this.props.navigation.navigate('items');
    }

    render() {
        if (!this.props.lists.lists) {
            return <View></View>
        }

        return (
            <MyList list={this.props.lists.lists} onListSelected={this.onListSelected} />
        )
    }
}

function mapStateToProps({ auth, user, lists }) {
    return {
        facebook_id: auth.facebook_id,
        userId: user.userId,
        lists: lists
    };
}

export default connect(mapStateToProps, { addUser, getLists, selectList })(ListsScreen);