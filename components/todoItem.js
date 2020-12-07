import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function TodoItem({ item, pressHandler, is_done }) {
    return (
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text style={is_done? styles.striked_through_item : styles.item}>{item.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 5,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
    },
    striked_through_item: {
        padding: 16,
        marginTop: 5,
        color: "#999999",
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
    }
})