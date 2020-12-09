import React, { useState, useRef, useEffect } from 'react';
import { 
    StyleSheet,
    Modal,
    View, 
    TouchableWithoutFeedback, 
    TextInput,
    Text,
    Alert,
    Platform,
} from 'react-native';


export default function AddMenu ({showAddMenu, hideAddMenu}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (showAddMenu) {
            Platform.OS === 'ios'
               ? inputRef.current.focus()
               : setTimeout(() => inputRef.current.focus(), 40);

        }
     }, [showAddMenu]);

    const [text, setText] = useState('');

    const handleChange = (value) => {
        setText(value);
    }


    const handleSubmit = () => {
        if (text.length > 2) {
            hideAddMenu(text, true); 
            setText('');
        } else {
            Alert.alert("Name too short", "Todos must be over 2 chars long", [
              {title: "OK", color: 'coral'}
            ])
          }
    }

    return (
        <Modal transparent={true} visible={showAddMenu} animationType='fade'>
            <TouchableWithoutFeedback onPress={() => hideAddMenu(text, false)}>
                <View style={styles.darkbg}>
                    <View style={styles.popup}>
                        <Text style={styles.text}>Add ToDo item</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                style={styles.input}
                                placeholder="Add ToDo..."
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