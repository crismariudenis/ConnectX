import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { COLORS } from "../../../assets/styles";

const TypeButton = () => {
  const [type, setType] = React.useState("fetcher");
  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <Pressable
          onPress={() => setType("fetcher")}
          style={[
            {
              borderColor: COLORS.FETCH_GREEN,
              backgroundColor:
                type == "fetcher" ? COLORS.FETCH_GREEN : "transparent",
            },
            styles.button,
          ]}
        ></Pressable>
        <Text style={[{ color: COLORS.FETCH_GREEN }, styles.text]}>fetcher</Text>
      </View>
      <View style={styles.smallContainer}>
        <Pressable
          onPress={() => setType("catcher")}
          style={[
            {
              borderColor: COLORS.CATCH_ORANGE,
              backgroundColor:
                type == "catcher" ? COLORS.CATCH_ORANGE : "transparent",
            },
            styles.button,
          ]}
        ></Pressable>
        <Text style={[{ color: COLORS.CATCH_ORANGE }, styles.text]}>catcher</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  smallContainer: {
    flexDirection: "row",
    padding: 10,
  },
  button: {
    width: 5,
    height: 5,
    borderRadius: 100,
    borderStyle: "solid",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
    fontSize: 20,
    paddingLeft: 10,
  },
});

export default TypeButton;
