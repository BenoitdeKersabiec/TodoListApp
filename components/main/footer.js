import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.header}>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'coral',
        zIndex: -10
    },
});
