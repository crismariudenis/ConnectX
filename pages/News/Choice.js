import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { PURPLE, RED, GREEN } from '../../assets/styles'

const Choice = ({ type }) => {
    const color = type === 'like' ? RED : GREEN;
    return (
        <View style={styles.container,{borderColor:color}}>
            <Text style={styles.text, { color }}>{type}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 7,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor:'rgba(10,10,10,2)'
    },
    text: {
        fontSize: 48,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing:4,
    },
})

export default Choice;
