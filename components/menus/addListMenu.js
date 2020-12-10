import React, { useState, useEffect, useRef } from 'react';
import { 
    StyleSheet,
    Modal,
    View, 
    TouchableWithoutFeedback, 
    TextInput,
    Text,
    Alert,
    Platform
} from 'react-native';
import * as RootNavigation from '../utils/rootNavigation.js';


export default function CreateMenu ({showCreateMenu, toggleCreateMenu, addList, setCurrentScreen}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (showCreateMenu) {
            Platform.OS === 'ios'
               ? inputRef.current.focus()
               : setTimeout(() => inputRef.current.focus(), 40);

        }
     }, [showCreateMenu]);

    const [text, setText] = useState('');

    const handleChange = (value) => {
        setText(value);
    }


    const handleSubmit = () => {
        if (text.length > 2) {
            addList(text);
            setText('');
            toggleCreateMenu(false);
            setTimeout(() => RootNavigation.navigate(text, setCurrentScreen), 5);
            
        } else {
            Alert.alert("Name too short", "Todos must be over 2 chars long", [
              {title: "OK", color: 'coral'}
            ])
          }
    }

    return (
        <Modal transparent={true} visible={showCreateMenu} animationType='fade'>
            <TouchableWithoutFeedback onPress={() => toggleCreateMenu(false)}>
                <View style={styles.darkbg}>
                    <View style={styles.popup}>
                        <Text style={styles.text}>Create a new To-Do List</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                style={styles.input}
                                placeholder="List Name..."
                                defaultValue={text}
                                onChangeText={handleChange}
                                onSubmitEditing={handleSubmit}
                                ref={inputRef}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    darkbg: {
        backgroundColor: "#000000aa",
        flex: 1,
        justifyContent: 'flex-end'
    },
    popup: {
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 15,   
    },
    input: {
        // marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        flex: 1
    },
    text: {
        textAlign: 'center',
        paddingBottom: 8,
        fontWeight: 'bold'
    }
    
})