import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "./assets/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import News from "./pages/News/index";
import Chat from "./pages/Chat/index";
import Profile from "./pages/Profile/index";
import TabBarIcon from "./components/TabBarIcon";
import LogScreen from "./pages/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./components/AuthContext";
import * as SecureStore from "expo-secure-store";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const { loggedIn, loginState, dispatch } = useAuth();
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    console.log(result);
    dispatch({ type: "RETRIEVE_TOKEN", token: result });
  }

  // console.log(`LoggedIn ${loggedIn}`);
  //const { user } = userAuth();
  useEffect(() => {
    getValueFor("userToken");
  }, []);
   

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.PURPLE} />
      </View>
    );
  }
  return (
    <NavigationContainer independent={true}>
      {loggedIn ? (
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
  );
};
export default App;
