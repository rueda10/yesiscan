import React, { Component } from 'react';
import { Button } from 'react-native';
import { Button as ButtonElement } from 'react-native-elements';
import { connect } from 'react-redux';

import { addItem } from '../actions';

import EditItem from '../components/EditItem';

class ScannedItemScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: 'Add Item',
            headerRight: (
                <Button
                    title="Save"
                    onPress={() => {navigation.state.params.addItem()}}
                    backgroundColor="rgba(0,0,0,0)"
                    color="#FFFFFF"
                />
            ),
            headerLeft: (
                <ButtonElement
                    icon={{ name: 'chevron-left', size: 40, style: { marginLeft: -30, marginRight: -10 } }}
                    title="Scan"
                    onPress={() => {navigation.state.params.onGoBack(); navigation.goBack()}}
                    backgroundColor="rgba(0,0,0,0)"
                    color="#FFFFFF"
                    fontSize={18}
                />
            ),
            headerTitleStyle: {
                color: '#FFFFFF',
                fontSize: 20
            },
            headerTintColor: '#FFFFFF',
            headerStyle: {
                shadowColor: '#4f83cc',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                elevation: 2,
                height: 60,
                backgroundColor: '#01579b'
            }
        });
    }

    constructor(props) {
        super(props);

        let listId = '';
        if (props.lists.lists && props.lists.lists.length > 0) {
            listId = props.lists.lists[0].id
        }

        this.state = {
            listId,
            name: this.props.item.name,
            image: this.props.item.image,
            description: this.props.item.description
        }

        this.addItem = this.addItem.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.setItemDescription = this.setItemDescription.bind(this);
        this.setItemImage = this.setItemImage.bind(this);
        this.setListId = this.setListId.bind(this);
    }

    // LIFECYCLE METHODS
    componentDidMount() {
        this.props.navigation.setParams({ addItem: this.addItem });
    }

    // SETTERS
    setItemName(name) { this.setState({ name })}

    setItemDescription(description) { this.setState({ description })}

    setItemImage(image) { this.setState({ image })}

    setListId(listId) { this.setState({ listId })}

    // ACTION CREATOR
    async addItem() {
        const itemObject = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
            listId: this.state.listId
        }

        await this.props.addItem(this.state.listId, itemObject);
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
    }

    render() {
        return (
            <EditItem
                currentListId={this.state.listId}
                currentItem={this.props.item}
                setItemName={this.setItemName}
                setItemDescription={this.setItemDescription}
                setItemImage={this.setItemImage}
                setListId={this.setListId}
            />
        )
    }
}

function mapStateToProps({ current, lists }) {
    return {
        item: current.item,
        lists: lists
    };
}

export default connect(mapStateToProps, { addItem })(ScannedItemScreen);