import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import Card from './Card'
import { cards as cardArray } from '../../assets/data/cards'
import { DARK_BLACK } from '../../assets/styles';

const News = () => {
  const [cards, setCards] = useState(cardArray);
  return (
    <View style={styles.container}>{cards.map(({ name, codeSource }, index) => {
      const isFirst = index === 0;
      return (
        <Card key={name} name={name} source={codeSource} isFirst={isFirst}/>
      )
    }).reverse()
    }</View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BLACK,
    alignItems:'center'
  },
});
