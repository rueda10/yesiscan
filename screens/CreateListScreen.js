import React, { Component } from 'react';
import { DeviceEventEmitter, Button } from 'react-native';
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
            listName: ''
        }

        this.addList = this.addList.bind(this);
        this.setListName = this.setListName.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ addList: this.addList });
    }

    async addList() {
        await this.props.addList(this.props.userId, this.state.listName);
        this.props.navigation.goBack();
        DeviceEventEmitter.emit('LIST_CREATED', {});
    }

    setListName(listName) {
        this.setState({
            listName: listName
        });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input label="Name:" placeholder="List Name" onChangeText={this.setListName} />
                </CardSection>
            </Card>
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