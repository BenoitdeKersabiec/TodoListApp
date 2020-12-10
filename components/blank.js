import React from 'react'
import { StatusBar as SB } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as RootNavigation from '.././utils/rootNavigation';

const Blank = () => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1.5, justifyContent: 'center'}}>
                <View style={{paddingBottom: 15}}>
                    <Text style={styles.title}>Hello There!</Text>
                </View>
                <View style={{paddingHorizontal: 40}}>
                    <Text style={styles.text}>
                        Add a To-Do List from the side menu.
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.touchable} onPress={() => RootNavigation.openDrawer()}>
                    <FontAwesome5 name="bars" size={24} style={styles.menuButton}/>
                </TouchableOpacity>
            </View>
            <SB style="auto"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    footer: {
        height: 60,
        zIndex: -10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    menuButton: {
        padding: 17,
        paddingHorizontal: 25,
        color: "#000000"
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        color: "coral"
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: "#777777"
    }
})

export default Blank