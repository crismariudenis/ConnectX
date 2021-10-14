import React, { useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  Platform,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { COLORS } from "../../assets/styles";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react/cjs/react.development";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [users, setUsers] = useState([]);
  const textInputChange = (val) => {
    //console.log(val);
    if (val.length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = ({ val }) => {
    setData({
      ...data,
      password: val,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = ({ val }) => {
    setData({
      ...data,
      password: val,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const submitData = (username, password) => {
    fetch("http://192.168.1.241:3001/send-data-profile", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
        userToken: new Date().getTime().toString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        Alert.alert(`Something went wrong ${err}`);
        console.log(err);
      });
  };
  const signHandle = (username, password, confirm_password) => {
    if (data.isValidPassword && data.isValidUser) {
      const foundUser = users.filter((item) => {
        //  console.log(username, item.username);
        return username == item.username;
      });
      //console.log(foundUser,foundUser.length);
      if (foundUser.length === 0) {
        if (data.isValidPassword && password === confirm_password) {
          submitData(username, password);
          setData({
            username: "",
            password: "",
            confirm_password: "",
            check_textInputChange: false,
            secureTextEntry: true,
            confirm_secureTextEntry: true,
            isValidUser: true,
            isValidPassword: true,
          });
        }
        navigation.goBack();
      } else {
        Alert.alert("Error", "An account with the given name already exists.", [
          { text: "OK" },
        ]);
      }
    }
  };
  useEffect(() => {
    fetch("http://192.168.1.241:3001/profile")
      .then((res) => res.json())
      .then((results) => {
        setUsers(results);
        // console.log(results);
      })
      .catch((err) => {
        Alert.alert(`Something went wrong ${err}`);
      });
  }, []);
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={COLORS.DARK_BLACK} barStyle="dark-content" /> */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Register now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={COLORS.PURPLE} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor={COLORS.PURPLE}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />

          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color={COLORS.GREEN} size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={COLORS.PURPLE} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor={COLORS.PURPLE}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => {
              handlePasswordChange(val);
            }}
          />
          <Pressable onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color={COLORS.LIGHT_PURPLE} size={20} />
            ) : (
              <Feather name="eye" color={COLORS.LIGHT_PURPLE} size={20} />
            )}
          </Pressable>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Confirm Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={COLORS.PURPLE} size={20} />
          <TextInput
            placeholder="Confirm Your Password"
            placeholderTextColor={COLORS.PURPLE}
            secureTextEntry={data.confirm_secureTextEntry}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <Pressable onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color={COLORS.LIGHT_PURPLE} size={20} />
            ) : (
              <Feather name="eye" color={COLORS.LIGHT_PURPLE} size={20} />
            )}
          </Pressable>
        </View>
        {data.password === data.confirm_password ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Must match the previous entry.</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <Pressable
            style={styles.signIn}
            onPress={() =>
              signHandle(data.username, data.password, data.confirm_password)
            }
          >
            <LinearGradient
              colors={[COLORS.LIGHT_PURPLE, COLORS.PURPLE]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Sign Up</Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            style={[
              styles.signIn,
              {
                borderColor: COLORS.PURPLE,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.PURPLE,
                },
              ]}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_BLACK,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.BLACK,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text: {
    color: COLORS.PURPLE,
  },
  title: {
    color: COLORS.LIGHT_PURPLE,
    fontSize: 30,
    fontWeight: "bold",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    color: COLORS.BLACK,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.PURPLE,
  },
  text_header: {
    color: COLORS.LIGHT_PURPLE,
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: COLORS.LIGHT_PURPLE,
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_PURPLE,
    paddingBottom: 5,
  },
  errorMsg: {
    color: "#FF0000",
    //color:COLORS.RED,
    fontSize: 14,
  },
});
