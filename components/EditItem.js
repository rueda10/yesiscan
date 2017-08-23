import React, { Component } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Image,
    TextInput,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    Modal
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import ActionSheet from 'react-native-actionsheet';

import { Card, CardSection, Input, Header } from '../components/common';

import { addList } from '../actions';

const CANCEL_INDEX = 0;
const TAKE_PICTURE_INDEX = 1;
const CHOOSE_FROM_LIBRARY_INDEX = 2;
const DESTRUCTIVE_INDEX = 3;

const IMAGE_PLACEHOLDER = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder-300x300.png';

class CreateItemScreen extends Component {
    constructor(props) {
        super(props);

        const listId = props.newlyCreatedList ? props.newlyCreatedList.id : props.currentListId;

        this.state = {
            listId,
            name: props.currentItem.name,
            image: props.currentItem.image,
            description: props.currentItem.description,
            modalVisible: false,
            newListName: ''
        }

        this.setItemName = this.setItemName.bind(this);
        this.setItemDescription = this.setItemDescription.bind(this);
        this.handleImagePress = this.handleImagePress.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.createNewList = this.createNewList.bind(this);
    }

    // SETTERS
    setItemName(name) {
        this.setState({ name });
        this.props.setItemName(name);
    }

    setItemDescription(description) {
        this.setState({ description });
        this.props.setItemDescription(description);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            this.props.setItemImage(result.uri);
        }
    }

    takePicture = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4,3]
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    // HELPERS
    populatePicker() {
        return this.props.lists.map(list => {
            return <Picker.Item key={list.id} label={list.name} value={list.id} />
        });
    }

    showActionSheet() {
        this.ActionSheet.show();
    }

    createNewList = async () => {
        if (this.state.newListName && this.state.newListName.length !== 0) {
            await this.props.addList(this.props.userId, this.state.newListName);
            this.setState({ listId: this.props.newlyCreatedList.id });
            this.props.setListId(this.props.newlyCreatedList.id);
            this.setModalVisible(!this.state.modalVisible);
        }
    }

    // HANDLERS
    handleImagePress(index) {
        if (index === TAKE_PICTURE_INDEX) {
            this.takePicture();
        } else if (index === CHOOSE_FROM_LIBRARY_INDEX) {
            this.pickImage();
        }
    }

    handleValueChange(itemValue, itemIndex) {
        this.setState({
            listId: itemValue
        });
        this.props.setListId(itemValue);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior="position"
                        style={styles.containerStyle}
                        keyboardVerticalOffset={0}
                    >
                        <Card>
                            <CardSection>
                                <View style={styles.pickerContainerStyle}>
                                    <Text style={styles.pickerLabelStyle}>List:</Text>
                                    <View style={styles.pickerViewStyle}>
                                        <Picker
                                            style={styles.pickerStyle}
                                            selectedValue={this.state.listId}
                                            onValueChange={this.handleValueChange}
                                            mode="modal"
                                        >
                                            {this.populatePicker()}
                                        </Picker>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => {this.setModalVisible(true)}} style={styles.newButtonStyle}>
                                            <Text style={styles.newButtonTextStyle}>
                                                New
                                            </Text>
                                        </TouchableOpacity>
                                        <Modal
                                            animationType={'slide'}
                                            transparent={false}
                                            visible={this.state.modalVisible}
                                        >
                                            <View style={{ flex: 1, alignItems: 'stretch' }}>
                                                <Header headerText="Create New List" />
                                                <Card style={styles.newListCardStyle}>
                                                    <CardSection>
                                                        <Input label="List Name:" placeholder="List Name" onChangeText={(newListName) => { this.setState({ newListName }) }} />
                                                    </CardSection>
                                                    <CardSection>
                                                        <TouchableOpacity onPress={this.createNewList} style={styles.newListButtonStyle}>
                                                            <Text style={styles.newListButtonTextStyle}>
                                                                Create List
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible) }} style={styles.newListButtonStyle}>
                                                            <Text style={styles.newListButtonTextStyle}>
                                                                Cancel
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </CardSection>
                                                </Card>
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
                            </CardSection>
                            <CardSection>
                                <TouchableWithoutFeedback onPress={this.showActionSheet}>
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
                                <ActionSheet
                                    ref={o => this.ActionSheet = o}
                                    options={['Cancel', 'Take a Picture', 'Choose from Library']}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                    onPress={this.handleImagePress}
                                />
                            </CardSection>
                            <CardSection>
                                <Input label="Name:" value={ this.state.name ? this.state.name : '' } placeholder="Item Name" onChangeText={this.setItemName}/>
                            </CardSection>
                            <CardSection>
                                <View style={styles.descriptionContainerStyle}>
                                    <Text style={styles.descriptionLabelStyle}>Description:</Text>
                                    <TextInput
                                        style={styles.descriptionStyle}
                                        placeholder="Item Description"
                                        multiline
                                        blurOnSubmit
                                        onChangeText={this.setItemDescription}
                                        autoCorrect={false}
                                        value={ this.state.description ? this.state.description : '' }
                                    />
                                </View>
                            </CardSection>
                        </Card>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
    },
    pickerContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 5,
        flex: 1
    },
    pickerViewStyle: {
        flex: 4,
        alignSelf: 'stretch'
    },
    pickerStyle: {
        alignSelf: 'stretch',
        fontSize: 18,
        height: 30,
        borderColor: '#D9DFDF',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 8
    },
    newButtonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#002f6c',
        marginLeft: 10,
        marginRight: 5,
        width: 50,
    },
    newButtonTextStyle: {
        alignSelf: 'center',
        color: '#002f6c',
        fontSize: 14,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5
    },
    newListButtonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#002f6c',
        marginLeft: 10,
        marginRight: 5,
        width: 200,
        height: 30
    },
    newListButtonTextStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#002f6c',
        fontSize: 14,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5
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
        flexDirection: 'row'
    },
    descriptionLabelStyle: {
        fontSize: 18,
        paddingLeft: 5,
        flex: 1
    },
    descriptionStyle: {
        height: 90,
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        marginLeft: 10,
        fontSize: 18,
        flex: 2,
        borderColor: '#D9DFDF',
        borderWidth: 1
    }
}

function mapStateToProps({ user, lists }) {
    return {
        lists: lists.lists,
        userId: user.userId,
        newlyCreatedList: lists.newlyCreatedList
    };
}

export default connect(mapStateToProps, { addList })(CreateItemScreen);