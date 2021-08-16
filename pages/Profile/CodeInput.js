import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { SafeAreaView } from "react-native";
import { COLORS } from '../../assets/styles/'
import {tagsCode,tagsValue,BASE_URL} from './Parameters'
function getUrl(code, theme) {
  const map = new Map();
  for (let i = 0; i < tagsValue.length; i++) {
    map.set(tagsCode[i], tagsValue[i]);
  }
  map.set(theme && map.get(theme));
  code = encodeURIComponent(code);
  let newUrl = BASE_URL + 'code=' + (code || 'Code Missing') + '&';
  for (const [key, value] of map.entries()) {
    newUrl += key + '=' + value + "&";
  }
  console.log(newUrl);
}
const CodeInput = () => {
  const [value, setValue] = React.useState('');
  const [data, setData] = useState([]);
  // const params = ;

  const CARBON_URL = 'https://carbon.now.sh/';
  // useEffect(() => {
  //   const finalUrl = CARBON_URL + '?code=' + "import { COLORS } from '../../assets/styles/'" + '&bg=' + '#FFA07A' + '&l=' + 'auto';
  //   var request = new XMLHttpRequest();
  //   request.onreadystatechange = (e) => {
  //     if (request.readyState !== 4) {
  //       return;
  //     }
  //     if (request.status === 200) {
  //       console.log('success', request.responseURL);
  //     } else {
  //       console.warn('error');
  //     }
  //   };

  //   request.open('GET', finalUrl);
  //   request.send();
  // }, []);
  //  console.log(data)
  const sendCode = () => {
    let theme = 'oceanic-next';
    getUrl(value, theme)
    setValue('');
  }
  return (
    <View >
      <View style={styles.container}>
        <TextInput
          multiline
          maxLength={600}
          numberOfLines={4}
          onChangeText={text => setValue(text)}
          value={value}
          color={COLORS.PURPLE}
          style={styles.textinput}
        />
      </View>
      <Button
        onPress={() => sendCode()}
        title="Send"
        color={COLORS.PURPLE}
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 300,
    borderColor: COLORS.PURPLE,
    borderWidth: 2,
    backgroundColor: COLORS.DARK_BLACK,
  },
  textinput: {
    padding: 7,
    paddingVertical: 2
  }
});

export default CodeInput;
