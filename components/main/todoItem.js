import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function TodoItem({ item, pressHandler, is_done }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(is_done);

    const handleCheckBox = (newValue) => {
        setToggleCheckBox(newValue);
        pressHandler(item.key);
    };

    return (
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <View style={styles.container}>
                <CheckBox
                    value={toggleCheckBox}
                    onValueChange={handleCheckBox}
                />
                <Text style={is_done? styles.striked_through_item : styles.item}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 5,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    item:{
        paddingLeft: 15,
    },
    striked_through_item: {
        paddingLeft: 15,
        color: "#999999",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
    }
})