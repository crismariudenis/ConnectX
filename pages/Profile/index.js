import React from "react";
import {StyleSheet,Text,View,Button,Pressable,Image,Alert,} from "react-native";
import { COLORS } from "../../assets/styles/";
import CodeInput from "./CodeInput/CodeInput";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { profile } from "../../assets/data/profile";
const AlertNotification = () => {
  Alert.alert("Option unavailable", "Please wait for the full version.", [
    // {
    //   text: "Ask me later",
    //   onPress: () => console.log("Ask me later pressed"),
    // },
    // {
    //   text: "Cancel",
    //   onPress: () => console.log("Cancel Pressed"),
    //   style: "cancel",
    // },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};
function CardScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.DARK_BLACK,
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CodeInput />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.DARK_BLACK,
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <View style={styles.container2}>
        <Image source={profile.profileSource} style={styles.image} />
        <Text style={styles.name}>{profile.name}</Text>
      </View>
      <View style={styles.container1}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.push("Card")}
        >
          <Text style={styles.text}>Code Pics</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            AlertNotification();
          }}
        >
          <Text style={styles.text}>Edit Profile</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => { AlertNotification();}}>
          <Text style={styles.text}>Report a Bug</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => { AlertNotification();}}>
          <Text style={styles.text}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();
const Profile = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Card"
          component={CardScreen}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: COLORS.DARK_BLACK,
            },
            
            headerTintColor: COLORS.PURPLE,
           
            //header
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: COLORS.BLACK,
    // backgroundColor: "red",
    height: "60%",
    width: "85%",
    alignItems: "center",
    textAlign: "center",
    top: "15%",
    borderRadius: 25,
    //justifyContent: "space-around",
    justifyContent: "space-evenly",
  },
  container2: {
    alignItems: "center",
    textAlign: "center",
    // backgroundColor: 'red',
    top: "10%",
  },
  button: {
    // flex:1,
    // flexBasis: "10%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    backgroundColor: "#9AA5CE",
    borderRadius: 10,
    height: "8%",
    //padding: 10,
  },
  text: {
    color: "#414868",
  },
  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  name: {
    color: "#9AA5CE",
  },
});
