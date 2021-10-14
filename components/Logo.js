import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Logo = ({ profileName, logoColor }) => {
  const initialGenerator = (str) => {
    let name=str[0];
    for (var i = 1; i < str.length; i++) {
      if (str[i] === '')
        str += str[i + 1];
    }
    return name;
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{initialGenerator('Paul Gay')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Logo;
