import React, { Component } from 'react';
import { ListView, TouchableWithoutFeedback, View, Text } from 'react-native';
import { CardSection } from './common';

class MyList extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.list)
        }

        this.listSelected = this.listSelected.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(this.props.list)
        })
    }

    listSelected(listId) {
        this.props.onListSelected(listId);
    }


    renderRow(list) {
        return (
            <TouchableWithoutFeedback onPress={() => {this.listSelected(list._id)}}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {list.name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default MyList;