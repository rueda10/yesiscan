import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';

import { getItems } from '../actions';

import { Spineer } from '../components/common';

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

    async componentWillUpdate() {
        await this.props.getItems(this.props.listsSelection);
    }

    render() {
        if (!this.props.items) {
            return <Spinner />;
        }

        if (this.props.items.length < 1) {
            return <View></View>
        }

        return (
            <MyList
                list={this.props.items}
                onListSelected={this.onListSelected}
                onListDeleted={this.onListDeleted}
            />
        )
    }
}

function mapStateToProps({ currentList, currentItems }) {
    return {
        listId: currentList,
        items: currentItems
    };
}

export default connect(mapStateToProps, { getItems })(ItemsScreen);