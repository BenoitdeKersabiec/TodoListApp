import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';

import MainPage from './components/mainPage';
import SideBar from './components/sideBar'
import LoadingScreen from './components/loading'
import Blank from './components/blank'
import { navigationRef } from './utils/rootNavigation';
import * as RootNavigation from './utils/rootNavigation';




const ListPage = (todoList, updateList, deleteList) => {
	const displayPage = () => {
	
		return (
			<SafeAreaView style={{flex: 1}}>
				<MainPage
					todoList={todoList}
                    saveData={updateList}
                    deleteList={deleteList}
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
    const [lists, setLists] = useState([]);
    const loadingList = {id: '-1', title: 'E', todos: []}
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
        RootNavigation.closeDrawer()
        setLists((prevLists) => {
            const newLists = prevLists.filter(list => list.id !== id)
            if (newLists.length == 0) {
                RootNavigation.navigate("Blank", setCurrentScreen)
            } else {
                RootNavigation.navigate(newLists[0].title, setCurrentScreen)
            }
            return newLists
        });
        
    };

    const getListTitleandIds = () => {
        return lists.map(list => {return({title: list.title, id: list.id})})
    }

	useEffect(() => {
		readData();
    }, [])

    useEffect(() => {
        saveData(lists);
        setPages(lists.map(list => ListPage(list, updateList, deleteList)));

    }, [lists])

    useEffect(() => {
        if (lists.length==0) {
            RootNavigation.navigate("Blank", setCurrentScreen)
        }
    }, [lists.length==0])
    
    
    const CustomDrawerContent = () => {
        return (
            <View style={styles.drawerContainer}>
                <SideBar 
                    getData={getListTitleandIds} 
                    addList={addList} 
                    setCurrentScreen={setCurrentScreen}
                    currentScreen={currentScreen}
                    deleteList={deleteList}
                />
            </View>
        );
      }
    
    return (
		<NavigationContainer ref={navigationRef}>
			<Drawer.Navigator 
                initialRouteName={"Blank"}
                edgeWidth={150}
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
				{Pages.map(
                    page =><Drawer.Screen name={page.title} component={page.page} key={page.id}/>
                    
                ).concat([
                    <Drawer.Screen name={"Loading"} component={LoadingScreen} key={"Loading"}/>,
                    <Drawer.Screen name={"Blank"} component={Blank} key={"Blank"}/>
                ])}

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

