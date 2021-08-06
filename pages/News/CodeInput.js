import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { SafeAreaView } from "react-native";
import { COLORS } from '../../assets/styles/'

const CodeInput = () => {
  const [value, setValue] = React.useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        "backgroundColor": "rgba(144, 19, 254, 100)",
        "code": "Made with Love in India by Sumanjay",
        "theme": "dracula"
      }
    };
    fetch('https://carbonnowsh.herokuapp.com/', requestOptions)
      .then(response => response.jpg())
      .then(data => console.log(data));
  
  }, []);
  console.log(data);
  const sendCode = () => {
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
