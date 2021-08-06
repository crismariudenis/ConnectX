import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ChatIcon from "../img/Icons/icon.chat.js";
import CodeIcon from "../img/Icons/icon.code.js";
import PersonIcon from "../img/Icons/icon.person.js";
import {COLORS} from '../assets/styles'
const TabBarIcon = ({ focused, iconName, text, color }) => {
  color = focused ? COLORS.PURPLE : COLORS.LIGHT_PURPLE;
  return (
    <View>
      {iconName == "code" && <CodeIcon color={color} />}
      {iconName == "person" && <PersonIcon color={color} />}
      {iconName == "chat" && <ChatIcon color={color} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor:COLORS.DARK_BLACK,
  },
});

export default TabBarIcon;