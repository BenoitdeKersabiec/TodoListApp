import React from 'react';
import { 
    StyleSheet,
    Modal,
    View, 
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity
} from 'react-native';



export default function ConfirmationMenu ({ openConfirmation, toggleConfirmation, deleteList, todoList}) {

   
    const handleDelete = () => {
        toggleConfirmation(false)
        deleteList(todoList.id)
    }

    return (
        <Modal transparent={true} visible={openConfirmation} animationType='fade'>
            <TouchableWithoutFeedback onPress={() => toggleConfirmation(false)}>
                <View style={styles.darkbg}>
                    <View style={styles.popup}>
                        <Text style={styles.header}>Do you want to delete this To-Do List?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.button} onPress={() => toggleConfirmation(false)}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>
                            <View style={styles.lineH} />
                            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                                <Text style={[styles.text, {color: 'red'}]}>Delete</Text>
                            </TouchableOpacity>
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
        justifyContent: 'center',
        padding: 40
    },
    popup: {
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: 7,
        paddingTop: 0,
        
    },
    button: {
        paddingVertical: 12,
        flex: 1,
    },
    text: {
        textAlign: 'center',
        fontSize: 16

    },
    lineH: {
        borderRightColor: '#EEEEEE',
        borderRightWidth: 1,
    },
    header: {
        textAlign: 'center',
        paddingVertical: 12,
        fontSize: 16,
        borderBottomColor: "#EEEEEE",
        borderBottomWidth: 1
    }
    
})