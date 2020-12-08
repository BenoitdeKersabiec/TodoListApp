import React from 'react';
import { View } from 'react-native';

import TodoItem from "./todoItem";

export default function TodoList({ 
    todos,
    pressHandlerTodos,
    toggleEditMenu,
    setEditedItem
}) {
    return (
        <View style={{paddingTop: 5, paddingBottom: 10}}>
            {todos.map( item => {
                return (
                    <TodoItem 
                        key={item.key} 
                        item={item} 
                        pressHandler={pressHandlerTodos} 
                        is_done={item.is_done}
                        toggleEditMenu={toggleEditMenu}
                        setEditedItem={setEditedItem}
                    />
                );
            })}
        </View>
    );
}