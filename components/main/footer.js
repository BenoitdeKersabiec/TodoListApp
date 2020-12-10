import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as RootNavigation from '.././utils/rootNavigation';

import ListMenu from "../menus/listMenu"

export default function Footer({ ...props }) {
    const [openMenu, setOpenMenu] = useState(false)


    return (
        <View style={styles.footer}>
            <ListMenu openMenu={openMenu} setOpenMenu={setOpenMenu} deleteList={props.deleteList} todoList={props.todoList}/>
            <TouchableOpacity style={styles.touchable} onPress={() => RootNavigation.openDrawer()}>
                <FontAwesome5 name="bars" size={24} style={styles.menuButton}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchable, {flexDirection: 'row-reverse'}]} onPress={() => setOpenMenu(true)}>
                <FontAwesome5 name="ellipsis-v" size={24} style={styles.menuButton}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        height: 60,
        backgroundColor: 'coral',
        zIndex: -10,
        flexDirection: "row",
        alignItems: "center",
        
        justifyContent: 'space-between'
    },
    touchable: {
        flex: 1
    },
    menuButton: {
        padding: 17,
        paddingHorizontal: 25,
        color: "#FFFFFF"
    }
});
