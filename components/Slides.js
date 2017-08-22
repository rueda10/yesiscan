import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { SocialIcon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    scrollX = new Animated.Value(0);

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
                   <Image
                       style={styles.imageStyle}
                       source={{ uri: slide.image }}
                   />
                   <Text style={styles.titleStyle}>{slide.title}</Text>
                   <Text style={styles.textStyle}>{slide.text}</Text>
               </View>
           )
        });
    }

    renderDots() {
        let position = Animated.divide(this.scrollX, SCREEN_WIDTH);

        return this.props.data.map((slide, index) => {
            let opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
            });
            return (
                <Animated.View
                    key={index}
                    style={[styles.dotStyle, { opacity }]}
                />
            )
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    style={styles.containerStyle}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event (
                        [{ nativeEvent: { contentOffset: { x: this.scrollX }}}]
                    )}
                    scrollEventThrottle={16}
                >
                    {this.renderSlides()}
                </ScrollView>
                <View style={styles.dotsStyle}>
                    {this.renderDots()}
                </View>
                <SocialIcon
                    title="Sign In With Facebook"
                    button
                    raised
                    type="facebook"
                    onPress={this.props.onComplete}
                />
            </View>
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
        marginRight: 30,
        marginTop: 80
    },
    titleStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: '#F97C2C',
        marginBottom: 20
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        marginBottom: 100
    },
    buttonStyle: {
        marginTop: 40
    },
    imageStyle: {
        width: 300,
        height: 300,
    },
    dotStyle: {
        height: 8,
        width: 8,
        backgroundColor: '#595959',
        margin: 5,
        borderRadius: 5
    },
    dotsStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50
    },
    facebookButtonStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default Slides;