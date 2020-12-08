import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';


export default function Title ({ title, setTitle }) {
    const [input, toggleInput] = useState(false)
    const [text, setText] = useState(title)

    const handleChange = (value) => {
        setText(value)
    }
    
    const handleSumbit = () => {
        toggleInput(false);
        console.log(text)
        setTitle(text);
    }
    
    return (
        <View>
            <TouchableOpacity onPress={() => toggleInput(true)}>
                {input ? 
                <TextInput 
                    style={[styles.input, styles.title]}
                    placeholder="Insert Title..."
                    defaultValue={text}
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
        // marginBottom: 10,
        paddingHorizontal: 8,
        flex: 1
    },
})