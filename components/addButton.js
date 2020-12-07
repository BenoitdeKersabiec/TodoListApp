import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default function AddButton() {
    return (
        <View style={{backgroundColor: 'coral'}} />
        //     <Text>Salut</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        backgroundColor: "coral",
        flex: 1
    }
})