import React, { useState } from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const PatientRegisterForm = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const clearForm = () => {
    setName(null);
    setEmail(null);
    setMobile(null);
    setAddress(null);
    setPassword(null);
    setConfirmPassword(null);
  };
  return (
    <ScrollView style={styles.view}>
      <SafeAreaView style={styles.form}>
        <TextInput
          label="Name"
          placeholder="Enter Your Name"
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Email Address"
          placeholder="Enter Your Email"
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Mobile Number"
          placeholder="Enter Your Mobile Number"
          value={mobile}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setMobile(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Address"
          placeholder="Enter Your Residential Address"
          value={address}
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Password"
          placeholder="Enter Your Password"
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Confirm Password"
          placeholder="Re-Enter Your Password"
          value={confirmPassword}
          style={styles.input}
          onChangeText={(text) => setConfirmPassword(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <Button
          onPress={() =>
            console.log(name, email, mobile, address, password, confirmPassword)
          }
          mode="contained"
          buttonColor="#1e90ff"
          style={styles.button}
        >
          ADD
        </Button>
        {/* <Button
          onPress={() => clearForm()}
          mode="contained"
          buttonColor="#87cefa"
          style={styles.button}
        >
          RESET
        </Button> */}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
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
});

export default PatientRegisterForm;
