import React, { useState } from 'react';
import { 
    StyleSheet,
    Modal, 
    Button, 
    View, 
    TouchableWithoutFeedback, 
    TextInput,
    Text
} from 'react-native';


export default function EditMenu ({ showEditMenu, toggleEditMenu, editedItem, editHandler }) {
    const [text, setText] = useState('');

    const handleChange = (value) => {
        setText(value);
    }

    const submitEdit = () => {
        editHandler(editedItem.key, text);
        setText('');
        toggleEditMenu(false);

    }

    return (
        <Modal transparent={true} visible={showEditMenu}>
            <TouchableWithoutFeedback onPress={() => toggleEditMenu(false)}>
                <View style={styles.darkbg}>
                    <View style={styles.popup}>
                        <Text style={styles.text}>Edit ToDo item</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Edit ToDo..."
                            defaultValue={text === '' ? editedItem.text : text}
                            onChangeText={handleChange}
                        />
                        <Button onPress={submitEdit} title='Edit ToDo' color='coral'/>
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
        justifyContent: 'center'
    },
    popup: {
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        margin: 40,
        padding: 15
        
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#DDDDDD",
    },
    text: {
        textAlign: 'center',
        paddingBottom: 8,
        fontWeight: 'bold'
    }
    
})