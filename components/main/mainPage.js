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
} from 'react-native';

import Footer from './footer';
import AddTodo from './addTodo';
import TodoList from './todoList'

export default function MainPage() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1'},
    { text: 'create an app', key: '2'},
    { text: 'play on the switch', key: '3'},
  ]);

  const [dones, setDones] = useState([
    { text: 'buy milk', key: '0'}
  ])

  const pressHandlerTodos = (key) => {
    const item = todos.find(todo => todo.key == key)

    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });

    setDones((prevDones) => {
      return [
        item,
        ...prevDones
      ]
    })
  };

  const pressHandlerDones = (key) => {
    const item = dones.find(todo => todo.key == key)

    setDones((prevDones) => {
      return prevDones.filter(done => done.key != key);
    });

    setTodos((prevTodos) => {
      return [
        item,
        ...prevTodos
      ]
    })
  };

  const submitHandler = (text) => {

    if (text.length > 3){
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString()},
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
          < TodoList 
            todos={todos} 
            dones={dones} 
            pressHandlerTodos={pressHandlerTodos}
            pressHandlerDones={pressHandlerDones}
          />
        </View>
        <SB style="auto"/> 
        <AddTodo submitHandler={submitHandler}/>
        <Footer/>
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

