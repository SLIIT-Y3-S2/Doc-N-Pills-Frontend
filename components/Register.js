import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
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
import RNPickerSelect from "react-native-picker-select";

// const API_URL = "https://doc-n-pills.herokuapp.com/";

const Register = ({ route, navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState(null);
  const [location, setLocation] = useState(null);
  const [openHours, setOpenHours] = useState(null);
  const [legacyValidation, setLegacyValidation] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
 
  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  

  const onSignUpPressed = async () => {
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

    if(
      name != null &&
      email != null &&
      telephone != null &&
      location != null &&
      openHours != null &&
      legacyValidation != null &&
      availabilityStatus != null &&
      type != null &&
      password != null &&
      passwordCheck != null
    ){

    await axios.post('https://doc-n-pills.herokuapp.com/users/register',payload)
    .then(() => {
      setRefresh(!refresh);
      Alert.alert("Registration Successfull")

      if(payload.type == 'Pharmacy Agent'){
        navigation.push('View pharmacy')
      }else if(payload.type == 'Channeling Center Agent'){
        navigation.push('View Channeling Centers')
      }
    })
    .catch((err) => {Alert.alert(err.response.data.msg)})

    }else{
      Alert.alert("Please fill all the fields")
    }
  };

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `;
    return status + message;
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.form}>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Add Agents</Header>
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

      <View
      style={{
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
      }}>
      <RNPickerSelect
        placeholder={{label: 'Availability Status', value: null}}
        onValueChange={(availabilityStatus) => setAvailabilityStatus(availabilityStatus)}
        value={availabilityStatus}
        items={[
          { label: 'Available', value: 'Available' },
          { label: 'Not Available', value: 'Not Available' },
        ]}
      />
      </View>

      {/* <TextInput
        label="Availability Status"
        returnKeyType="next"
        value={availabilityStatus}
        onChangeText={(text) => setAvailabilityStatus(text)}
      /> */}
      
      <View
      style={{
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
      }}>
      <RNPickerSelect
        placeholder={{label: 'User Type', value: null}}
        onValueChange={(type) => setType(type)}
        value={type}
        items={[
          { label: 'Pharmacy Agent', value: 'Pharmacy Agent' },
          { label: 'Channeling Center Agent', value: 'Channeling Center Agent' },
        ]}
      />
      </View>

      {/* <TextInput
        label="User Type"
        returnKeyType="next"
        value={type}
        onChangeText={(text) => setType(text)}
      /> */}
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
        style={{ backgroundColor: "#1e90ff" , marginTop: 24 }}
        onPress={onSignUpPressed}
      >
        Register
      </Button>
    </Background>
    </SafeAreaView>
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
  form: {
    padding: 5,
  },
});

export default Register;