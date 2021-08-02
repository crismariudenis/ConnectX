import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Choice from './Choice';
import { PURPLE } from '../../assets/styles'
import { Dimensions } from 'react-native';
import { LinearGradient } from 'react-native-svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// Image width 500
const Card = ({ name, source, isFirst }) => {
    const renderChoice = useCallback(() => {
        return <>
            <View style={[styles.choiceContainer, styles.likeContainer]}>
                <Choice type='like' />
            </View>
            <View style={[styles.choiceContainer, styles.nopeContainer]}>
                <Choice type='nope' />
            </View>
        </>
    }, [])
    return (<View style={styles.container}>
        <Image source={source} style={styles.img} />
        <LinearGradient colors={['transparent', 'rbga(0,0,8,9)']} style={styles.gradient} />
        <Text style={styles.name}>{name}</Text>
        {
            isFirst && renderChoice()
        }
    </View>)
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 45,
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    img: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.5,
        borderRadius: 20,//change in gradient to
        resizeMode: 'stretch',
    },
    name: {
        position: 'absolute',
        bottom: 22,
        left: 22,
        fontSize: 36,
        fontWeight: 'bold',
        color: PURPLE
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        borderRadius: 20,
    },
    choiceContainer: {
        position: 'absolute',
        top: 100,
    },
    likeContainer: {
        transform: [{ rotate: '-30deg' }],
        left: 45,
    },
    nopeContainer: {
        right: 45,
        transform:[{rotate:'30deg'}],
    }
})

export default Card;
