import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.header}>
            {/* <Button title="Update" onPress={handleUpdate}/> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'coral',
        zIndex: -10,
        flexDirection: "row"
    },
});
