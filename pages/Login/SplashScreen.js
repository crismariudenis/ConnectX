import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { COLORS } from "../../assets/styles";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="rotate"
          //duration='1500'
          source={require("../../img/logo.png")}
          // source={require('../../img/icon.logo/')}
          style={styles.logo}
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Search for coders!</Text>
        <Text style={styles.text}>Sign in with your account</Text>
        <Animatable.View
          style={styles.button}
          //animation="fadeInUpBig"
          animation="bounceIn"
        >
          <Pressable onPress={() => navigation.navigate("SignInScreen")}>
            {/* <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text style={styles.textSign}>Get Started</Text>
          </LinearGradient>  */}
            <LinearGradient
              // Button Linear Gradient
              // colors={[COLORS.PURPLE, COLORS.LIGHT_PURPLE]}
              colors={[COLORS.LIGHT_PURPLE, COLORS.PURPLE]}
              style={styles.signIn}
            >
              <Text style={[styles.text, { color: COLORS.DARK_BLACK }]}>
                Get Started
              </Text>
              <MaterialIcons
                name="navigate-next"
                size={20}
                color={COLORS.DARK_BLACK}
              />
            </LinearGradient>
          </Pressable>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.48;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_BLACK,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  text: {
    color: COLORS.PURPLE,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
  },
  title: {
    color: COLORS.LIGHT_PURPLE,
    fontSize: 30,
    fontWeight: "bold",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
});
