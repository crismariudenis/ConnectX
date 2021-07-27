import React from "react";
import { StyleSheet, Text, View } from "react-native";

const News = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>News</Text>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
});
