import React from 'react';
import { 
    StyleSheet,
    Modal,
    View, 
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity
} from 'react-native';
import * as RootNavigation from '../../utils/rootNavigation.js';



export default function ListMenu ({ openMenu, setOpenMenu, deleteList, todoList}) {

   
    const handleDelete = () => {
        setOpenMenu(false)
        deleteList(todoList.id)
    }

    return (
        <Modal transparent={true} visible={openMenu} animationType='fade'>
            <TouchableWithoutFeedback onPress={() => setOpenMenu(false)}>
                <View style={styles.darkbg}>
                    <View style={styles.popup}>
                        <TouchableOpacity style={styles.button} onPress={() => RootNavigation.navigate("Loading")}>
                            <Text style={styles.text}>Loading Page</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Edit Receipient List</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Send Update</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity style={styles.button} onPress={handleDelete}>
                            <Text style={[styles.text, {color: 'red'}]}>Delete To-Do List</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
    
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
        paddingTop: 0
        
    },
    button: {
        paddingVertical: 12,
    },
    text: {
        textAlign: 'center',
        fontSize: 16

    },
    line: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    }
    
})