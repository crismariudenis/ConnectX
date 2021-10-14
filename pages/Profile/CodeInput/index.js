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
import ImageUploader from "./ImageUploader";
import * as ImagePicker from "expo-image-picker";
//import CardFetcher from "./CardFetcher";
const CodeInput = ({ name, picture, email }) => {
  const [showUrl, setshowUrl] = useState(false);
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("material");
  const [imageUrl, setImageUrl] = useState("https://carbon.now.sh/");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("fetcher");
  const [test, setTest] = useState(false);
  const resetValue = () => {
    setMessage("");
    // setType("fetcher");
    setCode("");
    setImage(null);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [6, 9],
      quality: 0.2,
    }).catch((err) => console.log(err));
    // console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  function getUrl(code, theme) {
    ///Set height to 40 rows
    if (code.split(/\r\n|\r|\n/).length < 40) {
      var rows = 40 - code.split(/\r\n|\r|\n/).length;
      for (var i = 1; i <= rows; i++) code += "\n";
    }
    if (code.split(/\r\n|\r|\n/).length > 40) {
      var rows = code.split(/\r\n|\r|\n/).length - 40;
      var contor = 0;
      var poz;
      for (var i = code.length - 1; i >= 0; i--) {
        if (code[i] === "\n") contor++;
        poz = i;
        if (contor === rows) break;
      }
      code = code.slice(0, poz);
    }
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
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
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
          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={[styles.text, { textAlign: "center", paddingTop: 0 }]}>
              Upload Image
            </Text>
          </Pressable>
        </View>
        <Text style={styles.text}>Type</Text>
        <TypeButton passType={passType} />
        <Text style={styles.text}>Message {message.length}/80</Text>
        <TextInput
          //  showSoftInputOnFocus={true}
          maxLength={80}
          numberOfLines={4}
          onChangeText={(text) => setMessage(text)}
          value={message}
          color={COLORS.PURPLE}
          style={[{}, styles.textinput]}
        />
        <ImageUploader
          imageUri={{ uri: image }}
          //theme={theme}
          message={message}
          picture={picture}
          type={type}
          name={name}
          email={email}
          resetValue={resetValue}
        />
          {/* <CardFetcher /> */}
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
