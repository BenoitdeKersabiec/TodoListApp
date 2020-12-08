import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Title from "./title";
import TodoItem from "./todoItem";


export default function TodoList({ todos, dones, pressHandlerTodos, pressHandlerDones }) {
    return (
        <ScrollView style={styles.list}>
            <Title title="ToDo" />  
            {todos.map( item => {
                return (
                    <TodoItem key={item.key} item={item} pressHandler={pressHandlerTodos} is_done={false}/>
                );
            })}
            <Title title="Done" />
            {dones.map( item => {
                return (
                    <TodoItem key={item.key} item={item} pressHandler={pressHandlerDones} is_done={true}/>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
})