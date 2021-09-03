import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../../assets/styles";
import { tagsCode, tagsValue, BASE_URL, themes } from "./Parameters";
import ThemePicker from "./ThemePicker";
import TypeButton from "./TypeButton";
const CodeInput = () => {
  const [showUrl, setshowUrl] = useState(false);
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("material");
  const [imageUrl, setImageUrl] = useState("https://carbon.now.sh/");
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   const finalUrl = BASE_URL + '?code=' + "import { COLORS } from '../../assets/styles/'" + '&bg=' + '#FFA07A' + '&l=' + 'auto';
  //   var request = new XMLHttpRequest();
  //   request.onreadystatechange = (e) => {
  //     if (request.readyState !== 4) {
  //       return;
  //     }
  //     if (request.status === 200) {
  //       console.log('success', request.text);
  //     } else {
  //       console.warn('error');
  //     }
  //   };

  //   request.open('GET', finalUrl);
  //   request.send();
  // }, []);
  function getUrl(code, theme) {
    code = encodeURIComponent(code);
    tagsValue[1] = theme;
    let url = "";
    for (let i = 0; i < tagsValue.length; i++) {
      let key = tagsCode[i];
      let value = tagsValue[i];
      url += key + "=" + value + "&";
    }
    const queryString = url + "code=" + (code || "Code Missing");
    setImageUrl(BASE_URL + queryString);
    console.log(BASE_URL + queryString);
  }
  const passTheme = (theme) => {
    setTheme(theme);
  };

  const sendCode = () => {
    getUrl(code, theme);
    setCode("");
    setshowUrl(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Code {code.length}/600</Text>
        <TextInput
          multiline
          maxLength={600}
          numberOfLines={4}
          onChangeText={(text) => setCode(text)}
          value={code}
          color={COLORS.PURPLE}
          style={styles.textinput}
        />
        <Button
          onPress={() => sendCode()}
          title="Create Link"
          color={COLORS.PURPLE}
        />
        <Text style={styles.text}>Theme</Text>
        <ThemePicker
          themes={themes}
          passTheme={passTheme}
          style={styles.themepicker}
        />
        <View style={{ alignItems: "center" }}>
          {showUrl && (
            <Pressable
              style={styles.button}
              onPress={() => Linking.openURL(imageUrl)}
            >
              <Text
                style={[styles.text, { textAlign: "center", paddingTop: 0 }]}
              >Image</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.text}>Type</Text>
        <TypeButton />
        <Text style={styles.text}>Message {message.length}/60</Text>
        <TextInput
          //  showSoftInputOnFocus={true}
          maxLength={60}
          numberOfLines={4}
          onChangeText={(text) => setMessage(text)}
          value={message}
          color={COLORS.PURPLE}
          style={[{}, styles.textinput]}
        />
        <View style={{ alignItems: "center" }}>
          
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //top: 30,
    width: "90%",
    // height: 1000,
    //backgroundColor: 'red'
   // paddingTop: 30,
   // bottom:70,
  },
  text: {
    // paddingVertical:10,
    paddingTop: 10,
    color: COLORS.PURPLE,
    fontSize: 20,
  },
  textinput: {
    backgroundColor: COLORS.BLACK,
  },
  themepicker: {
    width: 20,
    height: 20,
  },
  button: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#393D4E",
    borderRadius: 10,
    padding: 0,
    height: 50,
    width:100,
  },
});

export default CodeInput;
