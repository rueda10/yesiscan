import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

class ScanScreen extends Component {
    state = {
        hasCameraPermission: null
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted'});
    }

    _handleBarCodeRead = (data) => {
        alert(JSON.stringify(data));
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            );
        }
    }
}

export default ScanScreen;