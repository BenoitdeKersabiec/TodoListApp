import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Title({ title }) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60
    },
    title: {
        textAlign: 'left',
        color: 'coral',
        fontSize: 35,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD"
    }
});
