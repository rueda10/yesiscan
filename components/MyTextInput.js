import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MyTextInput extends Component {
    constructor(props) {
        super(props);

        this.state = { text: '' };

        this.onChangeText = this.onChangeText.bind(this);
    }

    async onChangeText(text) {
        await this.setState({ text });
        this.props.setTerm(this.state.text);
    }

    render() {
        return (
            <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => this.onChangeText(text)}
                value={this.state.text}
            />
        )
    }
}

const styles = {
    inputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 60,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10
    }
};

export default MyTextInput;