import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Button, Image } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <View style={{ marginTop: 30 }}>
                    <Button
                        title="Let's get started!"
                        raised
                        buttonStyle={styles.buttonStyle}
                        onPress={this.props.onComplete}
                    />
                </View>
            )
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
           return (
               <View
                   key={slide.text}
                   style={[styles.slideStyle, {backgroundColor: 'white'}]}
               >
                   <Text style={styles.textStyle}>{slide.text}</Text>
                   <Image
                       style={styles.imageStyle}
                       source={{ uri: slide.image }}
                   />
                   {this.renderLastSlide(index)}
               </View>
           )
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={styles.containerStyle}
            >
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 60,
        marginLeft: 30,
        marginRight: 30
    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 40
    },
    imageStyle: {
        width: 200,
        height: 200
    }
};

export default Slides;