import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { addUser, getLists } from '../actions';

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

    async componentDidMount() {
        await this.props.addUser(this.props.facebook_id);
        this.props.getLists(this.props.userId);
    }

    renderLists() {
        return this.props.lists.lists.map((list, index) => {
            return <Text key={list._id} >{list.name}</Text>;
        });
    }

    render() {
        if (this.props.lists.length < 1) {
            return <View></View>
        }

        return (
            <View>
                {this.renderLists()}
            </View>
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

export default connect(mapStateToProps, { addUser, getLists })(ListsScreen);