import React, { Component } from 'react';
import { DeviceEventEmitter, TouchableWithoutFeedback, View, Image, Button, TextInput, Text } from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';

import { Card, CardSection, Input } from '../components/common';

import { addItem } from '../actions';

const IMAGE_PLACEHOLDER = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder-300x300.png';

class CreateItemScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: 'Add Item',
            headerRight: (
                <Button
                    title="Save"
                    onPress={() => {}}
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
            itemName: '',
            image: null,
            itemDescription: ''
        }

        this.addItem = this.addItem.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.setItemDescription = this.setItemDescription.bind(this);
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
            itemName
        })
    }

    setItemDescription(itemDescription) {
        this.setState({
            itemDescription
        })
    }

    populatePicker() {
        return this.props.lists.lists.map(list => {
            return <Picker.Item key={list.id} label={list.name} value={list.id} />
        });
    }

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <View style={styles.pickerContainerStyle}>
                        <View style={styles.pickerViewStyle}>
                            <Picker
                                style={styles.pickerStyle}
                                selectedValue={this.state.listId}
                                onValueChange={(itemValue, itemIndex) => this.setState({ listId: itemValue })}
                                mode="modal"
                            >
                                {this.populatePicker()}
                            </Picker>
                        </View>
                    </View>
                </CardSection>
                <CardSection>
                    <TouchableWithoutFeedback onPress={this.pickImage}>
                        { this.state.image ?
                            <Image
                                style={styles.thumbnailStyle}
                                source={{uri: this.state.image}}
                            />
                                :
                            <Image
                                style={styles.thumbnailStyle}
                                source={{uri: IMAGE_PLACEHOLDER}}
                            />
                        }
                    </TouchableWithoutFeedback>
                </CardSection>
                <CardSection>
                    <Input label="Name:" placeholder="Item Name" onChangeText={this.setItemName} />
                </CardSection>
                <CardSection>
                    <View style={styles.descriptionContainerStyle}>
                        <Text style={styles.descriptionLabelStyle}>Description:</Text>
                        <TextInput style={styles.descriptionStyle} placeholder="Item Description" multiline onChangeText={this.setItemDescription} />
                    </View>
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    pickerContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerViewStyle: {
        alignSelf: 'stretch'
    },
    pickerStyle: {
        alignSelf: 'stretch',
        fontSize: 18,
        height: 30
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    thumbnailStyle: {
        height: 250,
        flex: 1,
        width: null
    },
    descriptionContainerStyle: {
        height: 100,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    descriptionLabelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    descriptionStyle: {
        height: 80,
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        flex: 2
    }
}

function mapStateToProps({ currentList, lists }) {
    return {
        list: currentList,
        lists: lists
    };
}

export default connect(mapStateToProps, { addItem })(CreateItemScreen);