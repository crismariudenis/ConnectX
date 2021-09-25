import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "../../../assets/styles/";
import TypeButton from "./TypeButton";
const ThemePicker = ({ themes, passTheme }) => {
  const [theme, setTheme] = useState("material");
  useEffect(() => {
    passTheme(theme);
  });
  return (
    <View
      style={{
        //position: 'relative',
        top: 5,
        backgroundColor: COLORS.BLACK,
        borderRadius: 10,
      }}
    >
      <Picker
        selectedValue={theme}
        style={{
          height: 50,
          width: 200,
          backgroundColor: COLORS.DARK_BLACK,
          color: COLORS.PURPLE,
        }}
        itemStyle={{
          backgroundColor: COLORS.DARK_BLACK,
          color: "blue",
          fontFamily: "Ebrima",
          fontSize: 17,
        }}
        onValueChange={(itemValue, itemIndex) => {
          setTheme(itemValue);
        }}
      >
        {themes.map((theme, index) => (
          <Picker.Item
            label={theme.name}
            value={theme.id}
            key={index}
            color={COLORS.PURPLE}
            style={{ backgroundColor: COLORS.DARK_BLACK }}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({});
//export const theme;
export default ThemePicker;
