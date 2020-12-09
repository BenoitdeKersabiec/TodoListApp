import { StatusBar as SB } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  View,
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
import Completed from "./completed";
import Title from "./title"


export default function MainPage({ saveData, todoList }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [nextKey, changeNextKey] = useState(0)

  useEffect(() => {
    setTodos(todoList.todos);
    setTitle(todoList.title);
    const max_key = Math.max(...todoList.todos.map(item => parseInt(item.key))) + 1;
    if (Number.isNaN(max_key) || max_key == null || max_key == -Infinity){
      changeNextKey(0);
    } else {
      changeNextKey(max_key);
    }
    setIsLoaded(true);

  }, [todoList])

  useEffect(() => {
    if (isLoaded) {
      handleUpdate();
    }
  }, [title, todos])

  // Setting states

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

    handleUpdate();
  }

  const handleUpdate = () => {
    const updatedTodoList = {
      title: title,
      id: todoList.id,
      todos: todos
    }
    saveData(updatedTodoList)
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

    handleUpdate();
  };


  const submitHandler = (text) => {
    setTodos((prevTodos) => {
      return [
        {text: text, key: nextKey, is_done: false},
        ...prevTodos
      ]
    });
    changeNextKey(nextKey + 1);
  };

  const deleteItem = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const updateTitle = (text) => {
    setTitle(text);

  }


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView style={styles.list}>
            <Title title={title} setTitle={updateTitle}/>
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
        <AddButton submitHandler={submitHandler}/>
        <EditMenu 
          showEditMenu={showEditMenu} 
          toggleEditMenu={toggleEditMenu} 
          editedItem={editedItem} 
          editHandler={editHandler}
          deleteItem={deleteItem}
        />
        <Footer handleUpdate={handleUpdate} />
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

