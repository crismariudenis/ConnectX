import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Logo from "../../components/Logo";
const Chat = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo/>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
