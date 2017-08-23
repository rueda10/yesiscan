import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import { modifyItem } from '../actions';

import EditItem from '../components/EditItem';

class EditItemScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: 'Edit Item',
            headerRight: (
                <Button
                    title="Save"
                    onPress={() => {navigation.state.params.modifyItem()}}
                    backgroundColor="rgba(0,0,0,0)"
                    color="#FFFFFF"
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

        this.state = {
            listId: this.props.list.id,
            name: this.props.item.name,
            image: this.props.item.image,
            description: this.props.item.description
        }

        this.modifyItem = this.modifyItem.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.setItemDescription = this.setItemDescription.bind(this);
        this.setItemImage = this.setItemImage.bind(this);
        this.setListId = this.setListId.bind(this);
    }

    // LIFECYCLE METHODS
    componentDidMount() {
        this.props.navigation.setParams({ modifyItem: this.modifyItem });
    }

    async modifyItem() {
        const itemObject = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.description
        }
        await this.props.modifyItem(this.state.listId, this.props.item.id, itemObject);
        this.props.navigation.goBack();
    }

    // SETTERS
    setItemName(name) { this.setState({ name })}

    setItemDescription(description) { this.setState({ description })}

    setItemImage(image) { this.setState({ image })}

    setListId(listId) { this.setState({ listId })}

    // ACTION CREATOR
    async modifyItem() {
        const itemObject = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
            listId: this.state.listId
        }
        await this.props.modifyItem(this.props.list.id, this.props.item.id, itemObject);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <EditItem
                currentListId={this.props.list.id}
                currentItem={this.props.item}
                setItemName={this.setItemName}
                setItemDescription={this.setItemDescription}
                setItemImage={this.setItemImage}
                setListId={this.setListId}
            />
        )
    }
}

function mapStateToProps({ current }) {
    return {
        list: current.list,
        item: current.item
    };
}

export default connect(mapStateToProps, { modifyItem })(EditItemScreen);