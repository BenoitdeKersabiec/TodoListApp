import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainPage from './components/main/mainPage';

export default function App() {
	const [lists, setLists] = useState([{"id": 0, "title": "", "todos": []}])

	const readData = async () => {
		console.log("###### READING ######")
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

		lists[index] = todoList;

		saveData(lists)
		
	}

	useEffect(() => {
		readData()
	}, [])

    
    return (
        <SafeAreaView style={{flex: 1}}>
            <MainPage saveData={updateList} readData={readData} todoList={lists[0]}/>
        </SafeAreaView>
    )
}
