import * as React from "react";
import { Text, View, StyleSheet, Pressable, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { News, Chat, Profile } from "./pages";
import { PURPLE, LIGHT_PURPLE ,DARK_BLACK} from "./assets/styles";
import News from "./pages/News";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TabBarIcon from "./components/TabBarIcon";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        options={{ headerShown: false, animationEnabled: false }}
      >
        {() => (
          <Tab.Navigator
            tabBarOptions={{
              showLabel: false,
              keyboardHidesTabBar: true,
             
                style: {
                  backgroundColor: DARK_BLACK,
                 // backgroundColor:'#fff',
                  borderTopWidth: 0,
                  marginBottom: 0,   
                },
            }}
          >
            <Tab.Screen
              name="News"
              component={News}
              options={{
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
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    focused={focused}
                    iconName="person"
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
