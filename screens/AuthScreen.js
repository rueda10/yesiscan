import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { facebookLogin } from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // just about to rerender
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('lists');
        }
    }

    render() {
        return (
            <View />
        )
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, { facebookLogin })(AuthScreen);