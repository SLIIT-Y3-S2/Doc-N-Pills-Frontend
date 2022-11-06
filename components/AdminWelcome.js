import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "./Assets/Background";
import Header from "./Assets/Header";
import Logo from "./Assets/Logo";
import Button from "./Assets/Button";

const AdminWelcome = () => {
  return (
    <Background>
      <Logo />
      <Header>Welcome!</Header>
      <Button mode="contained">Login</Button>
      <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5
  }}
/>
    </Background>
  );
};

export default AdminWelcome;
