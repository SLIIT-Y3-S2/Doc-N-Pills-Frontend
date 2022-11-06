import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "./Assets/Background";
import Logo from "./Assets/Logo";
import Header from "./Assets/Header";
import Button from "./Assets/Button";
import TextInput from "./Assets/TextInput";
import BackButton from "./Assets/BackButton";
import { theme } from "./core/theme";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


//const API_URL = "https://doc-n-pills.herokuapp.com/";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginNavi = async () => {
    const loginUser = { email, password };
    console.log(loginUser);
    await axios.post('https://doc-n-pills.herokuapp.com/users/login', loginUser)
    //console.log("loginUser")
     .then((data) => {
       console.log(data.data.user.email);
       if (data.data.user.email == 'Invalid') {
         Alert.alert(
           "Login Error",
           "Invalid Credeintials "
         )
       } else {
         AsyncStorage.setItem('id',data.data.user.email)
         if (data.data.user.type == 'Pharmacy Agent') {
           navigation.push('SysAdmin')
         } else {
           navigation.push('Register')
         }
           
         }  
       
     }).catch((err) => {
       console.log(err)
   })
     
   

       //navigation.push('Home')
   console.log("email",email)
   console.log("password",password)
   }


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry = {true}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={loginNavi}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
