import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CodeInput from './CodeInput';
const Profile = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CodeInput />
      </View>
    );
}

export default Profile

const styles = StyleSheet.create({})
