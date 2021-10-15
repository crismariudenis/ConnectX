import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { COLORS } from "../../assets/styles/";
import CodeInput from "./CodeInput/";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { profile } from "../../assets/data/profile";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../components/Context";
import Logo from "../../components/Logo";
const AlertNotification = () => {
  Alert.alert("Option unavailable", "Please wait for the full version.", [
    { text: "OK" },
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
      <CodeInput
        name={profile.username}
        picture={profile.profileSource}
        email={profile.email}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  const { signOut, signIn, user } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user.profile !== "" ? (
          <Image
            source={{
              uri: user.profile,
            }}
            style={styles.image}
          />
        ) : (
          <Logo
            profileName={user.username}
            color1={user.avatarColor1}
            color2={user.avatarColor2}
          />
        )}

        <Text style={styles.text_header}>{user.username}</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.button}>
          <Pressable
            style={[
              styles.signIn,
              {
                borderColor: COLORS.PURPLE,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              navigation.push("Card");
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.PURPLE,
                },
              ]}
            >
              Create code pic
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.signIn,
              {
                borderColor: COLORS.PURPLE,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              AlertNotification();
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.PURPLE,
                },
              ]}
            >
              Edit Profile
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.signIn,
              {
                borderColor: COLORS.PURPLE,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              AlertNotification();
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.PURPLE,
                },
              ]}
            >
              Report a bug
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.signIn,
              {
                borderColor: COLORS.PURPLE,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              signOut();
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.PURPLE,
                },
              ]}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </Animatable.View>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_BLACK,
  },
  container1: {
    flex: 4,
    backgroundColor: COLORS.BLACK,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  container2: {
    flex: 2,
    alignItems: "center",
    textAlign: "center",
    top: "10%",
  },
  button: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    height: "80%",
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
  signIn: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    color: COLORS.BLACK,
    fontWeight: "bold",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.BLACK,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: COLORS.LIGHT_PURPLE,
    fontWeight: "bold",
    fontSize: 30,
  },
});
