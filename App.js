import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

import MainPage from './components/mainPage';
import SideBar from './components/sideBar'
import LoadingScreen from './components/loading'
import { navigationRef } from './utils/rootNavigation';
import * as RootNavigation from './utils/rootNavigation';




const ListPage = (todoList, updateList, deleteList) => {
	const displayPage = () => {
		const navigation = useNavigation(); 
	
		return (
			<SafeAreaView style={{flex: 1}}>
				<MainPage
					todoList={todoList}
                    saveData={updateList}
                    deleteList={deleteList}
                    navigation={navigation}
				/>
			</SafeAreaView>
		);

	}
	return (
		{page: displayPage, title: todoList.title, id: todoList.id}
	);
};

const Drawer = createDrawerNavigator();

export default function App() {
    const [lists, setLists] = useState([{"id": 0, "title": "Your TodoLists", "todos": []}]);
    const loadingList = {id: '-1', title: 'E', todos: []}
    const emptyList = {id: '0', title: 'To-Do List', todos: []}
    const [Pages, setPages] = useState([ListPage(loadingList, updateList, deleteList)])
    const [currentScreen, setCurrentScreen] = useState('')

	const readData = async () => {
		try {
			const value = await AsyncStorage.getItem("TodoListAppBSDKlists")
			const jsonValue = JSON.parse(value)
	
			if (jsonValue !== null) {
				setLists(jsonValue)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const saveData = async (todoLists) => {
		try{
			const jsonValue = JSON.stringify(todoLists)
			await AsyncStorage.setItem("TodoListAppBSDKlists", jsonValue)
		} catch (err) {
			console.log(err)
        }
	}

	const updateList = (todoList) => {
        const list = lists.find(list => list.id == todoList.id)
        const index = lists.indexOf(list)
        
        if (index !== -1) {
            lists[index] = todoList;
        } else {
            setLists([todoList])
        }

        saveData(lists);
    }
    
    const addList = (title) => {
        var max_key = Math.max(...lists.map(list => parseInt(list.id))) + 1;

        if (Number.isNaN(max_key) || max_key == null || max_key == -Infinity){
            max_key = 0;
        }

        const newList = {
            id: max_key.toString(),
            title: title,
            todos: []
        }

        setLists((prevLists) => {
            return [
                newList,
                ...prevLists
            ]
        });
    }

    const deleteList = (id) => {
        setLists((prevLists) => {
            return prevLists.filter(list => list.id !== id)
        });
        RootNavigation.navigate(lists[0].title, setCurrentScreen)
        saveData(lists)
    };

    const updatePages = () => {
        setPages(( lists.length !== 0 ?
            lists.map(list => ListPage(list, updateList, deleteList)) :
            [ListPage(emptyList, updateList, deleteList)]))
    }

    const getListTitleandIds = () => {
        return lists.map(list => {return({title: list.title, id: list.id})})
    }

	useEffect(() => {
		readData();
    }, [])

    useEffect(() => {
        updatePages()
    }, [lists])
    
    
    const CustomDrawerContent = () => {
        return (
            <View style={styles.drawerContainer}>
                <SideBar 
                    getData={getListTitleandIds} 
                    addList={addList} 
                    setCurrentScreen={setCurrentScreen}
                    currentScreen={currentScreen}
                />
            </View>
        );
      }
    
    return (
		<NavigationContainer ref={navigationRef}>
			<Drawer.Navigator 
                initialRouteName={Pages[0].title}
                edgeWidth={150}
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
				{Pages.map(
                    page => 
                        page.id !== '-1' ?
                        <Drawer.Screen name={page.title} component={page.page} key={page.id}/> :
                        <Drawer.Screen name={page.title} component={LoadingScreen} key={page.id}/>
                    
                ).concat([<Drawer.Screen name={"Loading"} component={LoadingScreen} key={"Loading"}/>])}

			</Drawer.Navigator>
		</NavigationContainer>
    )
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
    },
    drawerHeader: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: 5
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
    }
})
// <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: -15 }}>
// <DrawerItemList {...props}/>
// </DrawerContentScrollView>

