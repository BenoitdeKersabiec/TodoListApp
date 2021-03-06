import React, { useEffect, useState, useRef } from 'react';
import { 
    StyleSheet,
    Modal,
    View, 
    TouchableWithoutFeedback, 
    TextInput,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';



export default function EditMenu ({ showEditMenu, toggleEditMenu, editedItem, editHandler, deleteItem }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (showEditMenu) {
            Platform.OS === 'ios'
               ? inputRef.current.focus()
               : setTimeout(() => inputRef.current.focus(), 40);

        }
     }, [showEditMenu]);

    const [text, setText] = useState('');

    useEffect(() => {
        setText(editedItem.text)
    }, [showEditMenu])

    const handleChange = (value) => {
        setText(value);
    }

    const submitEdit = () => {
        editHandler(editedItem.key, text);
        setText('');
        toggleEditMenu(false);

    }

    const submitDelete = () => {
        deleteItem(editedItem.key);
        toggleEditMenu(false);
    }

    return (
        <Modal transparent={true} visible={showEditMenu} animationType='fade'>
            <TouchableWithoutFeedback onPress={() => toggleEditMenu(false)}>
                <View style={styles.darkbg}>
                    <View style={styles.popup}>
                        <View style={{flexDirection: 'row', paddingLeft: 5, alignItems:'center', paddingBottom: 8}}>
                            <Text style={styles.text}>Edit this item</Text>
                            <View style={{flexDirection: 'row-reverse', flex: 1, paddingLeft: 2}}>
                                <TouchableOpacity onPress={submitDelete}>
                                    <Text style={[styles.text, {color: 'red'}]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                style={styles.input}
                                placeholder="Edit ToDo..."
                                defaultValue={text}
                                onChangeText={handleChange}
                                onSubmitEditing={submitEdit}
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
        padding: 15
        
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
        fontWeight: 'bold',
    }
    
})