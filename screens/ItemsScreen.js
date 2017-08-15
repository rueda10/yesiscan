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

    async componentWillUpdate() {
        await this.props.getItems(this.props.listsSelection.id);
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
        list: currentList,
        items: currentItems
    };
}

export default connect(mapStateToProps, { getItems })(ItemsScreen);