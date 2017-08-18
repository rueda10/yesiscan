import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import _ from 'lodash';

import { selectItem } from '../actions';

class ScanScreen extends Component {
    static navigationOptions = {
        title: 'Scan',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="barcode" type="font-awesome" size={30} color={tintColor} />
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            hasCameraPermission: null,
            scanned: false
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted'});
    }

    componentDidUpdate() {
        // alert('2');
        // this.setState({ scanned: false});
    }

    _handleBarCodeRead = async (data) => {
        if (!this.state.scanned) {
            this.setState({ scanned: true });
            const item = {
                name: 'test'
            }
            alert('Item scanned!');
            await this.props.selectItem(item);
            // alert(JSON.stringify(data));
            this.props.navigation.navigate('scannedItem');
            // this.setState({ scanned: false });
        }
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
                        onBarCodeRead={_.debounce(this._handleBarCodeRead, 500, { 'leading': true })}
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
        width: 50,
        height: 50,
        borderWidth: 4,
        borderRadius: 5,
        borderColor: 'transparent'
    },
    topLeftStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopColor: '#F97C2C',
        borderLeftColor: '#F97C2C'
    },
    bottomLeftStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomColor: '#F97C2C',
        borderLeftColor: '#F97C2C'
    },
    topRightStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopColor: '#F97C2C',
        borderRightColor: '#F97C2C'
    },
    bottomRightStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomColor: '#F97C2C',
        borderRightColor: '#F97C2C'
    }
};

export default connect(null, { selectItem })(ScanScreen);