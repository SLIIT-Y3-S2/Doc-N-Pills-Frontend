import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Alert
} from "react-native";
import { TextInput, Button, RadioButton, Text } from "react-native-paper";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import RNPickerSelect from "react-native-picker-select";

// const API_URL = "https://doc-n-pills.herokuapp.com/";

const CONTACT_NUMBER_REGEX = /^[0-9]{10}$/;

export default function Register({ route, navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState(null);
  const [location, setLocation] = useState(null);
  const [openHours, setOpenHours] = useState(null);
  const [legacyValidation, setLegacyValidation] = useState(null);
  const [availabilityStatus, setAvailabilityStatus] = React.useState("Available");
  const [type, setType] = React.useState("Pharmacy Agent");
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);

  const [checked, setChecked] = React.useState("first");

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

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

    if (
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
    ) {
      await axios
        .post("https://doc-n-pills.herokuapp.com/users/register", payload)
        .then(() => {
          setRefresh(!refresh);
          Alert.alert("Registration Successfull");

          // if(payload.type == 'Pharmacy Agent'){
          //   navigation.push('View pharmacy')
          // }else if(payload.type == 'Channeling Center Agent'){
          //   navigation.push('View Channeling Centers')
          // }
        })
        .catch((err) => {
          Alert.alert(err.response.data.msg);
        });
    } else {
      Alert.alert("Please fill all the fields");
    }
  };

  return (
    <ScrollView style={styles.view}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 230, height: 230, marginLeft: "18%" }}
      />
      <SafeAreaView style={styles.form}>
        {/* <BackButton goBack={navigation.goBack} /> */}
        {/* <Logo /> */}
        {/* <Header>Add Agents</Header> */}
        <TextInput
          label="Name"
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Email"
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Telephone"
          keyboardType="numeric"
          returnKeyType="next"
          value={telephone}
          style={styles.input}
          onChangeText={(text) => setTelephone(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Location"
          returnKeyType="next"
          value={location}
          style={styles.input}
          onChangeText={(text) => setLocation(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Open Hours"
          returnKeyType="next"
          value={openHours}
          style={styles.input}
          onChangeText={(text) => setOpenHours(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Legacy Validation"
          returnKeyType="next"
          value={legacyValidation}
          style={styles.input}
          onChangeText={(text) => setLegacyValidation(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <View style={styles.input}>
        <Text>Availability Status</Text>

        <RadioButton.Group
          onValueChange={(newValue) => setAvailabilityStatus(newValue)}
          value={availabilityStatus}
        >
          <View>
            <Text>Available</Text>
            <RadioButton value="Available" />
          </View>
          <View>
            <Text>Not Available</Text>
            <RadioButton value="NotAvailable" />
          </View>
        </RadioButton.Group>
        </View>

        <View style={styles.input}>
        <Text>User Type</Text>

        <RadioButton.Group
          onValueChange={(newValue) => setType(newValue)}
          value={type}
        >
          <View>
            <Text>Pharmacy Agent</Text>
            <RadioButton value="Pharmacy Agent" />
          </View>
          <View>
            <Text>Channeling Center Agent</Text>
            <RadioButton value="Channeling Center Agent" />
          </View>
        </RadioButton.Group>
        </View>
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Re-enter Password"
          returnKeyType="done"
          value={passwordCheck}
          style={styles.input}
          onChangeText={(text) => setPasswordCheck(text)}
          secureTextEntry
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <Button
          mode="contained"
          style={{ backgroundColor: "#1e90ff", marginTop: 24 }}
          onPress={() => {
            onSignUpPressed(), navigation.navigate("AdminNavBar");
          }}
        >
          Register
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    backgroundColor: "white",
  },
  button: {
    margin: 12,
    borderRadius: 5,
  },
  label: {
    fontWeight: "bold",
    padding: 5,
  },
  view: {
    backgroundColor: "white",
    padding: 10,
  },
  form: {
    padding: 5,
  },
  root: {
    alignItems: "center",
    padding: 20,
  },
});
