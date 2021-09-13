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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../../assets/styles";
import { tagsCode, tagsValue, BASE_URL, themes } from "./Parameters";
import ThemePicker from "./ThemePicker";
import TypeButton from "./TypeButton";
//import * as ImagePicker from "@react-native-picker/picker";
//import { launchCameraAsync, launchImageLibraryAsync} from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
const CodeInput = ({ name, picture, email }) => {
  const [showUrl, setshowUrl] = useState(false);
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("material");
  const [imageUrl, setImageUrl] = useState("https://carbon.now.sh/");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("fetcher");
  const resetValue = () => {
    setMessage("");
    setType("fetcher");
    setCode('');
  }
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
   //console.log(pickerResult.uri)
  };
  const submitData = () => {
    fetch("http://192.168.1.241:3000/send-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        picture,
        message,
        type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    resetValue();
  };
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
    // console.log(BASE_URL + queryString);
  }
  const passTheme = (theme) => {
    setTheme(theme);
  };
  const passType = (type) => {
    setType(type);
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
        <View style={{ alignItems: "center" ,justifyContent:'space-evenly',flexDirection:'row'}}>
          {showUrl && (
            <Pressable
              style={styles.button}
              onPress={() => Linking.openURL(imageUrl)}
            >
              <Text
                style={[styles.text, { textAlign: "center", paddingTop: 0 }]}
              >
                Code Image
              </Text>
            </Pressable>
          )}
          <Pressable style={styles.button} onPress={openImagePickerAsync}>
            <Text style={[styles.text, { textAlign: "center", paddingTop: 0 }]}>
              Upload Image
            </Text>
          </Pressable>
        </View>
        <Text style={styles.text}>Type</Text>
        <TypeButton passType={passType} />
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
          <Button
            onPress={() => {
              submitData();
            }}
            title="Send Data"
            color={COLORS.PURPLE}
          />
        </View>
        <View style={styles.container2}>
          <Image source={picture} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
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
    width: 100,
  },
  image: {
    borderRadius: 100,
    width: 70,
    height: 70,
  },
  name: {
    color: "#9AA5CE",
  },
});

export default CodeInput;
