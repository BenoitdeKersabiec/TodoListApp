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


export default function AddMenu ({showAddMenu, hideAddMenu}) {
    const [text, setText] = useState('');

    const handleChange = (value) => {
        setText(value);
    }

    const handleSubmit = () => {
        hideAddMenu(text, true); 
        setText('');
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
                            />
                            <Button onPress={handleSubmit} title='Add' color='coral'/>
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
        justifyContent: 'center'
    },
    popup: {
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        margin: 40,
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