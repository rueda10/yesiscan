import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import { connect } from 'react-redux';

import { getFacebookId } from '../actions';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    {
        title: 'Welcome to Yes I Scan!',
        text: 'Keep track of your stuff with Yes I Scan by creating lists of items you own',
        color: '#03A9F4',
        image: '/Users/rueda10/yesiscan/assets/images/handyman-yesiscan.jpg'
    },
    {
        title: 'Inventory',
        text: 'Keep lists of products for future reference',
        color: '#009688',
        image: '/Users/rueda10/yesiscan/assets/images/handyman-inventory.jpg'
    },
    {
        title: 'Scan it',
        text: 'Scan products to add them to your lists, or add them manually, whatever is easier',
        color: '#03A9F4',
        image: '/Users/rueda10/yesiscan/assets/images/handyman-scan.jpg'
    }
];

class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        // AsyncStorage.removeItem('fb_token');
        let token = await AsyncStorage.getItem('fb_token');

        if (token) {
            await this.props.getFacebookId(token);
            this.setState({ token });
            this.props.navigation.navigate('lists');
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />
        }

        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        )
    }
}

export default connect(null, { getFacebookId })(WelcomeScreen);