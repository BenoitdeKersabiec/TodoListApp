import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing } from 'react-native';

const arrow = require('../../assets/down-arrow.png');
const IMAGE_SIZE = 15

export default function Completed({ length, showCompleted, toggleCompleted }) {

    let spinValue = new Animated.Value(showCompleted ? 1 : 0);

    const spinArrow = (toValue) => {
        Animated.timing(
            spinValue,
            {
                toValue: toValue,
                duration: 150,
                easing: Easing.cubic,
                useNativeDriver: true
            }
        ).start(() => toggleCompleted(!showCompleted))
    }

    const rotateData = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const handleReveal = () => {
        spinArrow(showCompleted ? 0 : 1)
    }


    return (
        <View>
            <TouchableOpacity onPress={handleReveal}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Completed {`(${length})`}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Animated.View style={{transform: [{rotate: rotateData}]}}>
                            <Image style={styles.arrow} source={arrow} resizeMode="contain"/>
                        </Animated.View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        alignItems: "center",
        paddingTop: 7,
    },
    title: {
      textAlign: 'left',
      fontSize: 22,
      paddingLeft: 6,
      color: '#000000',
    },
    arrowContainer: {
        marginRight: 10,
        marginTop: 5,
        flex: 1,
        flexDirection: 'row-reverse'
    },
    arrow: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
    }
});
