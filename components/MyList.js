import React, { Component } from 'react';
import { ListView, TouchableWithoutFeedback, View, Text } from 'react-native';
import { CardSection } from './common';
import Swipeout from 'react-native-swipeout';

class MyList extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.list)
        }

        this.renderRow = this.renderRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.list)
        })
    }

    renderRow(list) {
        let swipeButtons = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 0.6)',
            borderBottomWidth: 1,
            borderColor: '#FCFDFD',
            onPress: () => { this.props.onListDeleted(list._id) }
        }];

        return (
            <Swipeout right={swipeButtons}
                      autoClose
                      backgroundColor= 'transparent'>
                <TouchableWithoutFeedback onPress={() => {this.props.onListSelected(list.id, list.name)}}>
                    <View>
                        <CardSection>
                            <Text style={styles.titleStyle}>
                                {list.name}
                            </Text>
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
    }
}

export default MyList;