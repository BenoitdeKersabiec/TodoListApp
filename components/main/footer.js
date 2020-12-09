import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import ListMenu from "../menus/listMenu"

export default function Footer({ navigation, deleteList, todoList }) {
    const [openMenu, setOpenMenu] = useState(false)


    return (
        <View style={styles.header}>
            <ListMenu openMenu={openMenu} setOpenMenu={setOpenMenu} deleteList={deleteList} todoList={todoList}/>
            <TouchableOpacity style={styles.touchable} onPress={() => navigation.openDrawer()}>
                <FontAwesome5 name="bars" size={24} style={styles.menuButton}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable} onPress={() => setOpenMenu(true)}>
                <FontAwesome5 name="ellipsis-v" size={24} style={styles.menuButton}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'coral',
        zIndex: -10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    touchable: {
        // backgroundColor: 'blue',
    },
    menuButton: {
        padding: 17,
        paddingHorizontal: 25,
        color: "#FFFFFF"
    }
});
