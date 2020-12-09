import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Platform,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import * as RootNavigation from '../utils/rootNavigation.js';
import CreateMenu from './menus/addListMenu'

const listButton = (list, sideBarCurrent, setCurrentScreen) => {
    const isCurrentScreen = list.title == sideBarCurrent

    return (
        <View key={list.id}>
            <TouchableOpacity 
                onPress={() => RootNavigation.navigate(list.title, setCurrentScreen)} 
                style={isCurrentScreen ? [styles.touchable, styles.current]: styles.touchable}>
                <Text style={isCurrentScreen ? styles.textList: {}}>{list.title}</Text>
            </TouchableOpacity>
        </View>
    )
    
}


const SideBar = ({ getData, addList, setCurrentScreen, currentScreen }) => {
    const [showCreateMenu, toggleCreateMenu] = useState(false)

    const todoLists = getData()

    const sideBarCurrent = currentScreen !== '' ? currentScreen : todoLists[0].title


    return(
        <View style={styles.drawerContainer}>
            <CreateMenu 
                showCreateMenu={showCreateMenu} 
                toggleCreateMenu={toggleCreateMenu} 
                addList={addList} 
                setCurrentScreen={setCurrentScreen}/>
            <View style={styles.drawerContainer}>
                <View style={styles.drawerHeader}>
                    <Text style={styles.text}>Your TodoLists</Text>
                </View>
                <ScrollView style={{flex: 1, paddingVertical: 5}}>
                    {todoLists.map(list => listButton(list, sideBarCurrent, setCurrentScreen))}
                </ScrollView>
            </View>

            <View style={styles.drawerFooter}>
                <TouchableOpacity onPress={() => toggleCreateMenu(true)}>
                    <Text style={styles.text}>Create TodoList</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SideBar

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
    },
    drawerHeader: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: 5,
    },
    drawerFooter: {
        borderTopWidth: 1,
        borderTopColor: "#DDDDDD",
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    text: {
        textAlign: 'center',
        color: 'coral',
        fontWeight: 'bold',
        fontSize: 22,
    },
    touchable: {
        paddingVertical: 10,
        paddingLeft: 15,
        margin: 1,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#EEEEEE"
    },
    current: {
        borderWidth: 2,
        backgroundColor: "#F7F7F7"
    },
    textList: {
        color: "black",
        fontWeight: "bold"
    }
})


{/* <View style={styles.drawerContainer}>
<CreateMenu showCreateMenu={showCreateMenu} toggleCreateMenu={toggleCreateMenu} addList={addList}/>
<View style={styles.drawerContainer}>
    <View style={styles.drawerHeader}>
        <Text style={styles.text}>Your TodoLists</Text>
    </View>
</View>
<View style={styles.drawerFooter}>
    <TouchableOpacity onPress={() => toggleCreateMenu(true)}>
        <Text style={styles.text}>Create TodoList</Text>
    </TouchableOpacity>
</View>
</View> */}