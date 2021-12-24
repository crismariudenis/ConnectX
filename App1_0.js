import React from "react";
import { StyleSheet, Text, View } from "react-native";
import App from "./App";
import { AuthProvider, useAuth } from "./components/AuthContext";
const App1_0 = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default App1_0;

const styles = StyleSheet.create({});
