import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import Background from "./Assets/Background";
import Logo from "./Assets/Logo";
import Header from "./Assets/Header";
import Button from "./Assets/Button";
import TextInput from "./Assets/TextInput";
import BackButton from "./Assets/BackButton";
import { theme } from "./core/theme";
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const API_URL = "https://doc-n-pills.herokuapp.com/";

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [location, setLocation] = useState('');
  const [openHours, setOpenHours] = useState('');
  const [legacyValidation, setLegacyValidation] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
 

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  

  const onSignUpPressed = () => {
    const payload = {
      name: name,
      email: email,
      telephone: telephone,
      location: location,
      openHours: openHours,
      legacyValidation: legacyValidation,
      availabilityStatus: availabilityStatus,
      type: type,
      password: password,
      passwordCheck: passwordCheck,
    };
    console.log(payload);
    axios.post('https://doc-n-pills.herokuapp.com/users/register', payload)
    .then((data) => {
      console.log(data.data.user.email);
    }).catch((err) => {console.log(err)})

    // fetch(`${API_URL}users/register`, {
    //   method: "POST",
    //   body: "email=value1&password=value2",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then(async (res) => {
    //     try {
    //       const data = await res.text();
    //       if (data.status !== 200) {
    //         setIsError(true);
    //         setMessage(data.message);
    //       } else {
    //         setIsError(false);
    //         setMessage(data.message);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `;
    return status + message;
  };

  return (
    <ScrollView>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Telephone"
        returnKeyType="next"
        value={telephone}
        onChangeText={(text) => setTelephone(text)}
      />
      <TextInput
        label="Location"
        returnKeyType="next"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        label="Open Hours"
        returnKeyType="next"
        value={openHours}
        onChangeText={(text) => setOpenHours(text)}
      />
      <TextInput
        label="Legacy Validation"
        returnKeyType="next"
        value={legacyValidation}
        onChangeText={(text) => setLegacyValidation(text)}
      />
      <TextInput
        label="Availability Status"
        returnKeyType="next"
        value={availabilityStatus}
        onChangeText={(text) => setAvailabilityStatus(text)}
      />
      <TextInput
        label="User Type"
        returnKeyType="next"
        value={type}
        onChangeText={(text) => setType(text)}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label="Re-enter Password"
        returnKeyType="done"
        value={passwordCheck}
        onChangeText={(text) => setPasswordCheck(text)}
        secureTextEntry
      />
      <Text style={[styles.message, { color: isError ? "red" : "green" }]}>
        {message ? getMessage() : null}
      </Text>
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
