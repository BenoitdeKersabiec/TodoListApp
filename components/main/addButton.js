import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, Animated, Easing, TouchableOpacity} from 'react-native';

import AddMenu from '../menus/addMenu'

const plus = require('../../assets/plus.png');
const plusBG = require('../../assets/plus_background.png');
const IMAGE_SIZE = 70;


export default function AddButton({ submitHandler }) {
    const [showAddMenu, toggleAddMenu] = useState(false)
    let spinValue = new Animated.Value(0);

    const forwardSpinning = () => {
        spinValue.setValue(0)
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 150,
                easing: Easing.cubic,
                useNativeDriver: true
            }
        ).start(() => toggleAddMenu(true))
    }

    const rotateData = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const hideAddMenu = (text, submit) => {
        spinValue.setValue(0)
        Animated.timing(
            spinValue,
            {
                toValue: -1,
                duration: 150,
                easing: Easing.cubic,
                useNativeDriver: true
            }
        ).start(() => {
            toggleAddMenu(false);
            if (submit) {
                submitHandler(text);
            }
        })
    }

    return (
        <View style = {styles.absolute_container}>
            <AddMenu showAddMenu={showAddMenu} hideAddMenu={hideAddMenu}/>
            <TouchableOpacity style={styles.touchable} onPress={forwardSpinning}>
                <Animated.View style={{transform: [{rotate: rotateData}]}}>
                    <Image source={plus} style={styles.addButton} resizeMode="contain"/>
                </Animated.View>
            </TouchableOpacity>
                <Image source={plusBG} style={styles.addButtonBG} resizeMode="contain"/>
        </View>
    )
}

const styles = StyleSheet.create({
    absolute_container: {
        position: "absolute",
    },
    touchable: {
        left: (Dimensions.get('window').width / 2) - (IMAGE_SIZE) / 2,
        top: (Dimensions.get('window').height) - (IMAGE_SIZE)/2 - 30,
    },
    addButton: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        tintColor: 'coral',
        zIndex: 1,
    },
    addButtonBG: {
        height: (IMAGE_SIZE + 10),
        width: (IMAGE_SIZE + 10),
        top: (Dimensions.get('window').height) - (IMAGE_SIZE)/2 - 30,
        left: (Dimensions.get('window').width / 2) - (IMAGE_SIZE + 10) / 2 +10,
        marginTop: -IMAGE_SIZE-5,
        marginLeft: -10,
        zIndex: -1,
    },
});
