import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'


export default function Button({name, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={{textAlign:'center'}}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height:40,
        width:'50%',
        borderRadius:10,
        backgroundColor:'orange',
        padding:10,
        
    }
})
