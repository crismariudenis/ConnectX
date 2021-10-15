import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Logo = ({ profileName,color1,color2}) => {
  const initialGenerator = (str) => {
    let name = str[0];
    for (var i = 1; i < str.length - 1; i++) {
      if (str[i] === " ") {
        name += str[i + 1];
        break;
      }
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
      <View style={[styles.container, { backgroundColor: color1 }]}>
        <Text style={[styles.text, { color: color2 }]}>
          {initialGenerator(profileName)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
 
  },
});

export default Logo;
