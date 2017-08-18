import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import { addItem } from '../actions';

import EditItem from '../components/EditItem';

class CreateItemScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: 'Add Item',
            headerRight: (
                <Button
                    title="Save"
                    onPress={() => {navigation.state.params.addItem()}}
                    backgroundColor="rgba(0,0,0,0)"
                    color="#FCFDFD"
                />
            ),
            headerTitleStyle: {
                color: '#FCFDFD',
                fontSize: 20
            },
            headerTintColor: '#FCFDFD',
            headerStyle: {
                shadowColor: '#FCFDFD',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.3,
                elevation: 2,
                height: 60,
                backgroundColor: '#87B6D8'
            }
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            listId: '',
            name: '',
            image: '',
            description: ''
        }

        this.addItem = this.addItem.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.setItemDescription = this.setItemDescription.bind(this);
        this.setItemImage = this.setItemImage.bind(this);
        this.setListId = this.setListId.bind(this);
    }

    // LIFECYCLE METHODS
    componentWillMount() {
        this.setState({
            listId: this.props.list.id
        });
    }

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
        await this.props.addItem(this.props.list.id, itemObject);
        this.props.navigation.goBack();
    }

    // RENDER
    render() {
        return (
            <EditItem
                currentListId={this.props.list.id}
                currentItem={{}}
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
        list: current.list
    };
}

export default connect(mapStateToProps, { addItem })(CreateItemScreen);