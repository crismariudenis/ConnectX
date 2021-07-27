import React from "react";
import News from "../pages/News";
import { StyleSheet, Text, View, Image } from "react-native";
import ChatIcon from "../img/icon.chat.js";
import CodeIcon from "../img/icon.code.js";
import PersonIcon from "../img/icon.person.js";
import {DARK_BLACK} from '../assets/styles'
const Icon = ({ color, name, size }) => {
  return (
    <View >
      {name == "code" && <CodeIcon size={size} color={color} />}
      {name == "person" && <PersonIcon size={size} color={color} />}
      {name == "chat" && <ChatIcon size={size} color={color} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor:DARK_BLACK,
  },
});

export default Icon;
