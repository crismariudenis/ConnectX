import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';
import Choice from './Choice';
import { PURPLE } from '../../assets/styles'

import { LinearGradient } from 'react-native-svg';
import { CARD_HEIGHT, CARD_WIDTH, ACTION_OFFSET } from './style';
// Image width 500
//30 lines
const Card = ({ name, source, isFirst, swipe, tiltSign, ...rest }) => {
    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg'],
    });
    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, ACTION_OFFSET],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-ACTION_OFFSET, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }],
    };
    // const renderChoice = useCallback(() => {
    //     return <>
    //         <Animated.View style={[styles.choiceContainer, styles.likeContainer, { opacity: likeOpacity }]}>
    //             <Choice type='like' />
    //         </Animated.View>
    //         <Animated.View style={[styles.choiceContainer, styles.nopeContainer, { opacity: nopeOpacity }]}>
    //             <Choice type='nope' />
    //         </Animated.View>
    //     </>
    // }, [likeOpacity, nopeOpacity])
    return (
        <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>
            <Image source={source} style={styles.img} />
            <LinearGradient colors={['transparent', 'rbga(0,0,8,9)']} style={styles.gradient} />
            {/* <Text style={styles.name}>{name}</Text>
            {
                isFirst && renderChoice()
            } */}
        </Animated.View>  
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 45,
        flex: 1,
        //  justifyContent: "center",
       //  alignItems: "center",
       // backgroundColor:'yellow'
    },
    img: {
        bottom:45,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,//change in gradient to
       // backgroundColor: 'red',
        //resizeMode:"center"
        resizeMode:'stretch'
    },
    tinyLogo: {
        width: 50,
        height: 50,
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
        transform: [{ rotate: '30deg' }],
    }
})

export default Card;
