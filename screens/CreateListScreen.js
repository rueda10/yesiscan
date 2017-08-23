import React, { Component } from 'react';
import { View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Input } from '../components/common';

import { addList } from '../actions';

class CreateListScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            title: 'Add List',
            headerRight: (
                <Button
                    title="Save"
                    onPress={() => navigation.state.params.addList()}
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
            listName: ''
        }

        this.addList = this.addList.bind(this);
        this.setListName = this.setListName.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ addList: this.addList });
    }

    async addList() {
        if (this.state.listName) {
            await this.props.addList(this.props.userId, this.state.listName);
            this.props.navigation.goBack();
        }
    }

    setListName(listName) {
        this.setState({
            listName
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, alignItems: 'stretch' }}>
                    <Card>
                        <CardSection>
                            <Input label="Name:" placeholder="List Name" onChangeText={this.setListName} />
                        </CardSection>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
        marginTop: 20,
        marginBottom: 20
    }
};

function mapStateToProps({ user }) {
    return { userId: user.userId };
}

export default connect(mapStateToProps, { addList })(CreateListScreen);