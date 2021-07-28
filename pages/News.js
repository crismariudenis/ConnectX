import React from "react";
import { StyleSheet, Text, View } from "react-native";
import  Card  from '../components/Card'
const News = () => {
  return (
    
      
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Card />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
});
