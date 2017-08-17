import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

import { getItems, modifyItem, selectItem } from '../actions';

import ItemList from '../components/ItemList';
import { Spinner } from '../components/common';

class ItemsScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: navigation.state.params.name,
            headerRight: (
                <Button
                    title="Add"
                    onPress={() => navigation.navigate('createItem')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="#FCFDFD"
                />
            ),
            headerTitleStyle: {
                // title/text
                color: '#FCFDFD',
                fontSize: 20
            },
            headerTintColor: '#FCFDFD', // buttons/arrows
            headerStyle: {
                // header itself
                shadowColor: '#FCFDFD',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                elevation: 2,
                height: 60,
                backgroundColor: '#87B6D8'
            }
        });
    }

    async componentWillMount() {
        await this.props.getItems(this.props.list.id);
    }

    onItemSelected = (item) => {
        this.props.selectItem(item);
        this.props.navigation.navigate('editItem');
    }

    onItemDeleted = async (listId) => {
        // await this.props.deleteList(this.props.userId, listId);
    }

    onIncrementItem = async (item) => {
        if (item.quantity < 100) {
            await this.props.modifyItem(this.props.list.id, item.id, {quantity: item.quantity + 1});
        }
    }

    onDecrementItem = async (item) => {
        if (item.quantity > 0) {
            await this.props.modifyItem(this.props.list.id, item.id, {quantity: item.quantity - 1});
        }
    }

    render() {
        if (!this.props.items.currentItems) {
            return <Spinner />;
        }

        if (this.props.items.currentItems.length < 1) {
            return <View></View>
        }

        return (
            <ItemList
                items={this.props.items.currentItems}
                list={this.props.list}
                onItemSelected={this.onItemSelected}
                onItemDeleted={this.onItemDeleted}
                onIncrementItem={this.onIncrementItem}
                onDecrementItem={this.onDecrementItem}
            />
        )
    }
}

function mapStateToProps({ current, currentItems }) {
    return {
        list: current.list,
        items: currentItems
    };
}

export default connect(mapStateToProps, { getItems, modifyItem, selectItem })(ItemsScreen);