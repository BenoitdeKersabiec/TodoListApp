import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';


export default function Title ({ title, setTitle }) {
    const [input, toggleInput] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
        setText(title)
    }, [input])

    const handleChange = (value) => {
        setText(value)
    }
    
    const handleSumbit = () => {
        if (text.length > 3){
            setTitle(text);
            toggleInput(false);
        } else {
            Alert.alert("Name too short", "Name must be over 2 chars long", [
              {title: "OK", color: 'coral'}
            ])
        }
    }
    
    return (
        <View>
            <TouchableOpacity onPress={() => toggleInput(true)}>
                {input ? 
                <TextInput 
                    style={[styles.input, styles.title]}
                    placeholder="Insert Title..."
                    defaultValue={ text}
                    autoFocus={true}
                    onSubmitEditing={handleSumbit}
                    onChangeText={handleChange}
                /> :
                <Text style={styles.title}>{title}</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
      color: 'coral',
      fontSize: 35,
      fontWeight: 'bold',
      textAlign: "center"
    },
    input: {
        paddingHorizontal: 8,
        flex: 1,
    },
})