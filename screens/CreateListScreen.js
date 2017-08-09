import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import MyTextInput from '../components/MyTextInput';

import { addList } from '../actions';

class CreateListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listName: ''
        }

        this.addList = this.addList.bind(this);
        this.setListName = this.setListName.bind(this);
    }

    async addList() {
        await this.props.addList(this.props.userId, this.state.listName);
        this.props.navigation.navigate('lists');
    }

    setListName(listName) {
        this.setState({
            listName: listName
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.textStyle}>Enter List Name</Text>
                <MyTextInput setTerm={this.setListName} />
                <Button
                    onPress={this.addList}
                    title="Add List"
                />
            </View>
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