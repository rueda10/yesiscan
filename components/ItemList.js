import React, { Component } from 'react';
import { ListView, TouchableWithoutFeedback, View, Text, Image } from 'react-native';
import { CardSection, Spinner } from './common';
import Swipeout from 'react-native-swipeout';
import { Icon } from 'react-native-elements';
import _ from 'lodash';

const IMAGE_PLACEHOLDER = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder-300x300.png';

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: this.ds.cloneWithRows(props.items)
        }

        this.renderRow = this.renderRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.items)
        })
    }

    renderRow(item) {
        if (_.isNull(this.props.items)) {
            return <Spinner />;
        }

        let swipeButtons = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 0.6)',
            borderBottomWidth: 1,
            borderColor: '#FCFDFD',
            onPress: () => { this.props.onItemDeleted(item) }
        }];

        if (!item.image) {
            item.image = IMAGE_PLACEHOLDER;
        }

        return (
            <Swipeout right={swipeButtons}
                      autoClose
                      backgroundColor= 'transparent'>
                <TouchableWithoutFeedback onPress={() => {this.props.onItemSelected(item)}}>
                    <View>
                        <CardSection>
                            <View style={styles.cellContainerStyle}>
                                <View style={styles.thumbnailContainerStyle}>
                                    <Image
                                        style={styles.thumbnailStyle}
                                        source={{ uri: item.image }}
                                    />
                                </View>
                                <View style={styles.titleContainerStyle}>
                                    <Text style={styles.titleStyle}>
                                        { item.name && (item.name.length > 15) ? item.name.substr(0, 14) + '...' : item.name }
                                    </Text>
                                    <Text style={styles.descriptionStyle}>
                                        { item.description && (item.description.length > 20) ? item.description.substr(0, 19) + '...' : item.description }
                                    </Text>
                                </View>
                                <View style={styles.quantityContainerStyle}>
                                    <Text style={styles.quantityStyle}>
                                        {item.quantity}
                                    </Text>
                                </View>
                                <View style={styles.quantityButtonStyle}>
                                    <Icon name="plus" type="font-awesome" size={30} color="#8BCF62" onPress={() => { this.props.onIncrementItem(item) }} />
                                </View>
                                <View style={styles.quantityButtonStyle}>
                                    <Icon name="minus" type="font-awesome" size={30} color="#F97C2C" onPress={() => { this.props.onDecrementItem(item) }} />
                                </View>
                            </View>
                        </CardSection>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeout>
        )
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                style={styles.listStyle}
                removeClippedSubviews={false}
            />
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18
    },
    listStyle: {
        marginTop: 3
    },
    cellContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        height: 40
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        flex: 2
    },
    titleContainerStyle: {
        flex: 6
    },
    descriptionStyle: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#5B5A62'
    },
    quantityContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityStyle: {
        fontSize: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        flex: 1
    }
}

export default ItemList;