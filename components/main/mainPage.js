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
} from 'react-native';

import Footer from './footer';
import AddButton from './addButton'
import TodoList from './todoList';
import EditMenu from '../menus/editMenu'
import Title from "./title";


export default function MainPage() {

  // Setting states
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1', is_done: false},
    { text: 'create an app', key: '2', is_done: false},
    { text: 'play on the switch', key: '3', is_done: false},
    { text: 'buy milk', key: '0', is_done: true}
  ]);

  
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
          {text: text, key: Math.random().toString(), is_done: false},
          ...prevTodos
        ]
      });
    } else {
      Alert.alert("Name too short", "Todos must be over 3 chars long", [
        {title: "OK", onPress: () => console.log('alert closed'), color: 'coral'}
      ])
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView style={styles.list}>
            <Title title="ToDo" />
            < TodoList 
              todos={todos.filter(todo => todo.is_done == false)}
              pressHandlerTodos={pressHandlerTodos}
              toggleEditMenu={toggleEditMenu}
              setEditedItem={setEditedItem}
            />
            <Title title="Completed" />
            < TodoList 
              todos={todos.filter(todo => todo.is_done == true)} 
              pressHandlerTodos={pressHandlerTodos}
              toggleEditMenu={toggleEditMenu}
              setEditedItem={setEditedItem}
            />
          </ScrollView>
        </View>
        <SB style="auto"/> 
        {/* <AddTodo submitHandler={submitHandler}/> */}
        <Footer/>
        <AddButton submitHandler={submitHandler}/>
        <EditMenu showEditMenu={showEditMenu} toggleEditMenu={toggleEditMenu} editedItem={editedItem} editHandler={editHandler}/>
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
});

