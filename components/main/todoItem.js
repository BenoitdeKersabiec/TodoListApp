import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function TodoItem({ item, pressHandler, is_done, toggleEditMenu, setEditedItem }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(is_done);

    const handleCheckBox = (newValue) => {
        setToggleCheckBox(newValue);
        pressHandler(item.key);
    };

    const handlePress = () => {
        setEditedItem(item);
        toggleEditMenu(true);
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        value={toggleCheckBox}
                        onValueChange={handleCheckBox}
                    />
                    <Text style={is_done? styles.striked_through_item : styles.item}>{item.text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 16,
        marginTop: 5,
        // borderColor: '#EEEEEE',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    item:{
        paddingLeft: 15,
        fontSize: 16,
    },
    striked_through_item: {
        paddingLeft: 15,
        color: "#999999",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        fontSize: 16,
    }
})