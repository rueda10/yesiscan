import React, { Component } from 'react';
import { DeviceEventEmitter, Picker } from 'react-native';
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
            listId: '',
            itemName: ''
        }

        this.addItem = this.addItem.bind(this);
        this.setItemName = this.setItemName.bind(this);
    }

    componentWillMount() {
        this.setState({
            listId: this.props.list.id
        });
    }
    async addItem() {
        await this.props.addItem(this.props.list.id, this.state.itemName);
        this.props.navigation.goBack();
        DeviceEventEmitter.emit('ITEM_CREATED', {});
    }

    setItemName(itemName) {
        this.setState({
            itemName: itemName
        })
    }

    populatePicker() {
        return this.props.lists.lists.map(list => {
            return <Picker.Item key={list.id} label={list.name} value={list.id} />
        });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.listId}
                        onValueChange={(itemValue, itemIndex) => this.setState({ listId: itemValue })}
                    >
                        {this.populatePicker()}
                    </Picker>
                </CardSection>
                <CardSection>
                    <Input label="Item name" onChangeText={this.setItemName} />
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    pickerStyle: {
        flex: 1,
        alignSelf: 'stretch'
    }
}

function mapStateToProps({ currentList, lists }) {
    return {
        list: currentList,
        lists: lists
    };
}

export default connect(mapStateToProps, { addItem })(CreateItemScreen);