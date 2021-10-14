import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "./assets/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./components/Context";
import News from "./pages/News/index";
import Chat from "./pages/Chat/index";
import Profile from "./pages/Profile/index";
import TabBarIcon from "./components/TabBarIcon";
import LogScreen from "./pages/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ACTIONS = {
  RETRIEVE_TOKEN: "RETRIEVE_TOKEN",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    profile:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  });
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        console.log(foundUser)
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        setUser({
          name: userName,
          email: foundUser[0].email,
          profile:foundUser[0].profile,    
        });
        console.log(user);
        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }

        //console.log("user token: ", userToken);
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: ACTIONS.LOGOUT });
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("tkgfsdn");
      },
      user,
    }),
    []
  );
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.PURPLE} />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext} >
      <NavigationContainer independent={true}>
        {loginState.userToken !== null ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              display: "none",
              backgroundColor: "red",
            }}
          >
            <Stack.Screen name="Tab">
              {() => (
                <Tab.Navigator>
                  <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                      tabBarHideOnKeyboard: true,
                      headerShown: false,
                      tabBarShowLabel: false,
                      tabBarStyle: [
                        {
                          display: "flex",
                          borderTopWidth: 0,
                          marginBottom: 0,
                          backgroundColor: COLORS.DARK_BLACK,
                        },
                      ],
                      tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                          focused={focused}
                          iconName="person"
                          text="Matches"
                        />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="News"
                    component={News}
                    options={{
                      tabBarHideOnKeyboard: true,
                      headerShown: false,
                      tabBarShowLabel: false,
                      tabBarStyle: [
                        {
                          display: "flex",
                          borderTopWidth: 0,
                          marginBottom: 0,
                          backgroundColor: "COLORS.DARK_BLACK",
                        },
                      ],
                      tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                          focused={focused}
                          iconName="code"
                          text="Matches"
                        />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                      tabBarHideOnKeyboard: true,
                      headerShown: false,
                      tabBarStyle: [
                        {
                          display: "flex",
                          borderTopWidth: 0,
                          marginBottom: 0,
                          backgroundColor: COLORS.DARK_BLACK,
                        },
                      ],
                      tabBarShowLabel: false,
                      // tabBarBadge:69, //------------------------NOTIFICATIONS--->
                      tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                          focused={focused}
                          iconName="chat"
                          text="Matches"
                        />
                      ),
                    }}
                  />
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <LogScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
