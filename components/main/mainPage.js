import { StatusBar as SB } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet,
  View,
  Alert, 
  TouchableWithoutFeedback, 
  Keyboard,
  Platform,
  StatusBar,
  ScrollView,
  Text
} from 'react-native';

import Footer from './footer';
import AddButton from './addButton'
import TodoList from './todoList';
import EditMenu from '../menus/editMenu'
import Completed from "./completed";


export default function MainPage() {

  const title = "ToDo List Benoit"

  // Setting states
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1', is_done: false},
    { text: 'create an app', key: '2', is_done: false},
    { text: 'play on the switch', key: '3', is_done: false},
    { text: 'buy milk', key: '0', is_done: true}
  ]);

  const [nextKey, changeNextKey] = useState(Math.max(...todos.map(item => parseInt(item.key))) + 1)

  const [showCompleted, toggleCompleted] = useState(false)
  const [showEditMenu, toggleEditMenu] = useState(false)
  const [editedItem, setEditedItem] = useState({text: '', key: ''})

  // Handlers

  const editHandler = (key, text) => {
    const item = todos.find(todo => todo.key == key);
    item.text = text;
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });

    setTodos((prevTodos) => {
      return [
        item,
        ...prevTodos
      ]
    });


  }

  const pressHandlerTodos = (key) => {
    const item = todos.find(todo => todo.key == key);
    item.is_done = !item.is_done;


    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });

    setTodos((prevTodos) => {
      return [
        item,
        ...prevTodos
      ]
    });
  };


  const submitHandler = (text) => {

    if (text.length > 3){
      setTodos((prevTodos) => {
        return [
          {text: text, key: nextKey, is_done: false},
          ...prevTodos
        ]
      });
      changeNextKey(nextKey + 1);
    } else {
      Alert.alert("Name too short", "Todos must be over 3 chars long", [
        {title: "OK", onPress: () => console.log('alert closed'), color: 'coral'}
      ])
    }
  };

  const deleteItem = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView style={styles.list}>
            <Text style={styles.title}>{title}</Text>
            < TodoList 
              todos={todos.filter(todo => todo.is_done == false)}
              pressHandlerTodos={pressHandlerTodos}
              toggleEditMenu={toggleEditMenu}
              setEditedItem={setEditedItem}
            />
            <Completed 
              length={todos.filter(todo => todo.is_done == true).length}
              showCompleted={showCompleted}
              toggleCompleted={toggleCompleted}
            />
            { showCompleted ?
            < TodoList 
              todos={todos.filter(todo => todo.is_done == true)} 
              pressHandlerTodos={pressHandlerTodos}
              toggleEditMenu={toggleEditMenu}
              setEditedItem={setEditedItem}
            /> : <View/>}
          </ScrollView>
        </View>
        <SB style="auto"/> 
        {/* <AddTodo submitHandler={submitHandler}/> */}
        <Footer/>
        <AddButton submitHandler={submitHandler}/>
        <EditMenu 
          showEditMenu={showEditMenu} 
          toggleEditMenu={toggleEditMenu} 
          editedItem={editedItem} 
          editHandler={editHandler}
          deleteItem={deleteItem}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  title: {
    color: 'coral',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: "center"
  }
});

