import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {COLORS} from '../../assets//styles'
import Logo from "../../components/Logo";
const Chat = () => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BLACK,
      }}
    >
      <Logo
        profileName="Crismariu Denis"
        color1="hsla(288, 73%, 88%, 1)"
        color2="hsla(288, 73%, 25%, 1)"
      />
    </View>
  );
};
///h=val
///s=14
///b=98

export default Chat;

const styles = StyleSheet.create({});
