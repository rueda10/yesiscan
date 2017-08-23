import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { addUser, getLists, selectList, deleteList, resetNewlyCreatedList } from '../actions';

import MyList from '../components/MyList';
import { Spinner } from '../components/common';

class ListsScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: 'Lists',
            headerRight: (
                <Button
                    title="Add"
                    onPress={() => navigation.navigate('createList')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="#FFFFFF"
                />
            ),
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="home" type="font-awesome" size={30} color={tintColor} />
            },
            headerTitleStyle: {
                // title/text
                color: '#FFFFFF',
                fontSize: 20
                // fontFamily: 'HelveticaNeue-CondensedBold'
            },
            headerTintColor: '#FFFFFF', // buttons/arrows
            headerStyle: {
                // header itself
                shadowColor: '#4f83cc',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                elevation: 2,
                height: 60,
                backgroundColor: '#01579b'
            }
        });
    }

    async componentWillMount() {
        await this.props.addUser(this.props.facebook_id);
        await this.props.getLists(this.props.userId);
    }

    onListSelected = async (list) => {
        await this.props.selectList(list);
        this.props.resetNewlyCreatedList();
        this.props.navigation.navigate('items', { name: list.name });
    }

    onListDeleted = async (listId) => {
        await this.props.deleteList(this.props.userId, listId);
    }

    render() {
        if (!this.props.lists) {
            return <Spinner />;
        }

        if (this.props.lists.length < 1) {
            return <View></View>
        }

        return (
            <MyList
                list={this.props.lists}
                onListSelected={this.onListSelected}
                onListDeleted={this.onListDeleted}
            />
        )
    }
}

function mapStateToProps({ auth, user, lists }) {
    return {
        facebook_id: auth.facebook_id,
        userId: user.userId,
        lists: lists.lists
    };
}

export default connect(mapStateToProps, { addUser, getLists, selectList, deleteList, resetNewlyCreatedList })(ListsScreen);