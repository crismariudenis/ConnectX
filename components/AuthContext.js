import React, {
  createContext,
  useEffect,
  useState,
  Alert,
  useReducer,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
const sleep = (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
};

///default value
const AuthContext = createContext({});
const ACTIONS = {
  RETRIEVE_TOKEN: "RETRIEVE_TOKEN",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
};
const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    profile:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    avatarColor1: "",
    avatarColor2: "",
  });
  const [users, setUsers] = useState([]);
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    console.log(result);
  }
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        console.log(users);
        //  console.log(action.token)
        const foundUser = users.filter((item) => {
          //console.log(item);
          return action.token == item.userToken;
        });
           console.log(foundUser[0],"foundUser[0]");
        // setUser({
        //   username: foundUser[0].username,
        //   email: foundUser[0].email,
        //   profile: foundUser[0].profile,
        //   avatarColor1: foundUser[0].avatarColor1,
        //   avatarColor2: foundUser[0].avatarColor2,
        // });
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
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const login = async (foundUser) => {
    sleep(1000).then(() => setLoggedIn(true));
    // console.log(foundUser[0]);
    const userToken = String(foundUser[0].userToken);
    const userName = user.username;
    // console.log(foundUser[0][0]);
    setUser({
      username: userName,
      email: user.email,
      profile: user.profile,
      avatarColor1: user.avatarColor1,
      avatarColor2: user.avatarColor2,
    });
    console.log(user);

    save("userToken", userToken);
    dispatch({ type: "LOGIN", id: userName, token: userToken });
  };
  const logout = async () => {
    sleep(1000).then(() => setLoggedIn(false));
    try {
      await SecureStore.deleteItemAsync("userToken");
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: ACTIONS.LOGOUT });
  };

  const authContextValue = {
    login,
    loggedIn,
    logout,
    user,
    loginState,
    dispatch,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
