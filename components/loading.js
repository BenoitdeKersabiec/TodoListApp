import React from 'react'

import {
    View,
    Text
} from 'react-native';

export default function LoadingScreen() {
    return (
        <View style={{flex: 1, backgroundColor: 'blue'}}>
            <Text style={{padding:50}}>Loading</Text>
        </View>
    )
}