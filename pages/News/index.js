import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from "react-native";
import Card from './Card'
import { cards as cardArray } from '../../assets/data/cards'
import { COLORS } from '../../assets/styles';
import { CARD_HEIGHT, ACTION_OFFSET, OUT_OF_SCREEN } from './style';
import { useCallback } from 'react';
const News = () => {
  const [cards, setCards] = useState(cardArray);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!cards.length) {
      setCards(cardArray);
    }
  }, [cards.length])
  const panRespoder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      // console.log(y0 > CARD_HEIGHT / 2 ? 1 : -1);
      //  console.log(y0> CARD_HEIGHT / 2);
      ///---------------------------------------CHECK WHY  ONLY1
      tiltSign.setValue(y0 > CARD_HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 500,
          toValue: {
            x: direction * OUT_OF_SCREEN,
            y: dy
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      }
      else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start()
      }
    }
  });
  const removeTopCard = useCallback(() => {
    setCards((prevState) => prevState.slice(1))
    swipe.setValue({ x: 0, y: 0 })
  }, [swipe])

  return (
    <View style={styles.container}>{cards.map(({ name, codeSource }, index) => {
      const isFirst = index === 0;

      const dragHandlers = isFirst ? panRespoder.panHandlers : {};
      return (
        <Card
          key={name}
          name={name}
          source={codeSource}
          isFirst={isFirst}
          swipe={swipe}
          tiltSign={tiltSign}
          {...dragHandlers}
        />
      )
    }).reverse()
    }</View>
  );

};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_BLACK,
    alignItems: 'center',
    textAlign:'center',
   // top:45
  },

});
