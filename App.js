import * as React from "react";
import { Text, View, StyleSheet, Pressable, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { News, Chat, Profile } from "./pages";
import { COLORS } from "./assets/styles";
import News from "./pages/News/index";
import Chat from "./pages/Chat/index";
import Profile from "./pages/Profile/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TabBarIcon from "./components/TabBarIcon";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();
const App = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator
      screenOptions={{ headerShown: false, display: 'none', backgroundColor: 'red' }}
    >
      <Stack.Screen
        name="Tab"
      >
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
                    backgroundColor: 'COLORS.DARK_BLACK',
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
  </NavigationContainer>
);
export default App;
