import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { COLORS } from "../../../assets/styles";

const TypeButton = ({ type }) => {
  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <View
          style={[
            {
              borderColor:
                type === "fetcher" ? COLORS.FETCH_GREEN : COLORS.CATCH_ORANGE,
              backgroundColor:
                type === "fetcher" ? COLORS.FETCH_GREEN : COLORS.CATCH_ORANGE,
            },
            styles.button,
          ]}
        ></View>
        <Text
          style={[
            {
              color:
                type === "fetcher" ? COLORS.FETCH_GREEN : COLORS.CATCH_ORANGE,
            },
            styles.text,
          ]}
        >
          {type}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
   // backgroundColor: "red",
    //alignItems: "center",
    //alignContent: "center",
    // justifyContent: "center",
  },
  smallContainer: {
    flexDirection: "row",
    padding: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: 20,
    height: 20,
    borderRadius: 100,
    //borderStyle: "solid",
    //borderWidth: 3,
    // padding: 10,
    // borderColor:'red',
    // backgroundColor: "transparent",
    //  margin: 10,
  },
  buttonMargin: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "red",
    margin: 10,
    borderEndColor: "yellow",
  },
  text: {
    fontSize: 15,
    paddingLeft: 10,
  },
});

export default TypeButton;
