import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Button, Input } from '../components/common';

import { addItem } from '../actions';

class CreateItemScreen extends Component {
    static navigationOptions = {
        title: 'Add Item'
    }

    constructor(props) {
        super(props);

        this.state = {
            itemName: ''
        }

        this.addItem = this.addItem.bind(this);
        this.setItemName = this.setItemName.bind(this);
    }

    async addItem() {
        await this.props.addItem(this.props.listId, this.state.itemName);
        this.props.navigation.goBack();
        DeviceEventEmitter.emit('ITEM_CREATED', {});
    }

    setItemName(itemName) {
        this.setState({
            itemName: itemName
        })
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input label="Item name" onChangeText={this.setItemName} />
                </CardSection>
            </Card>
        )
    }
}

function mapStateToProps({ currentList }) {
    return { listId: currentList };
}

export default connect(mapStateToProps, { addItem })(CreateItemScreen);