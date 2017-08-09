import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Icon } from 'react-native-elements';

class ScanScreen extends Component {
    static navigationOptions = {
        title: 'Scan',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="barcode" type="font-awesome" size={30} color={tintColor} />
        }
    }

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
                    <View style={styles.overlayStyle}>
                        <View style={styles.containerStyle}>
                            <View style={styles.leftStyle}>
                                <View style={[styles.rectangleStyle, styles.topLeftStyle]}></View>
                                <View style={[styles.rectangleStyle, styles.bottomLeftStyle]}></View>
                            </View>
                            <View style={styles.rightStyle}>
                                <View style={[styles.rectangleStyle, styles.topRightStyle]}></View>
                                <View style={[styles.rectangleStyle, styles.bottomRightStyle]}></View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = {
    overlayStyle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    containerStyle: {
        width: 280,
        height: 130,
        flexDirection: 'row'
    },
    leftStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    rightStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rectangleStyle: {
        width: 100,
        height: 50,
        borderWidth: 4,
        borderRadius: 5,
        borderColor: 'transparent'
    },
    topLeftStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopColor: '#8C1232',
        borderLeftColor: '#8C1232'
    },
    bottomLeftStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomColor: '#8C1232',
        borderLeftColor: '#8C1232'
    },
    topRightStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopColor: '#8C1232',
        borderRightColor: '#8C1232'
    },
    bottomRightStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomColor: '#8C1232',
        borderRightColor: '#8C1232'
    }
};

export default ScanScreen;