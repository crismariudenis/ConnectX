import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DB from "./DB";
const Chat = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <DB/>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
