import axios from "axios";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, Button ,Snackbar,ActivityIndicator} from "react-native-paper";
import { theme } from "./core/theme";

const PatientRegisterForm = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  }

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false)
    navigation.navigate("Login");
  };

  const onToggleSnackBar = () => {
    setVisible(!visible);
  }

  const onDismissSnackBar = () => {
    setVisible(false); 
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newPatient = {
        name,
        email,
        mobile,
        address,
        password,
        confirmPassword,
      };
      const result = await axios.post(
        "https://doc-n-pills.herokuapp.com/patient",
        newPatient
      );
      onToggleSuccessSnackBar();
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.msg);
      setErrorMsg(err.response.data.msg);
      onToggleSnackBar();
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName(null);
    setEmail(null);
    setMobile(null);
    setAddress(null);
    setPassword(null);
    setConfirmPassword(null);
  };
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <Image
        source={require("../assets/logoNoBG.png")}
        style={{
          height: 120,
          width: "40%",
          alignSelf: "center",
          marginTop: 10,
        }}
      />
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
        {loading ? (
          <ActivityIndicator animating={true} size="large" color={"#1e90ff"} />
        ) : (
          <Button
            onPress={handleSubmit}
            mode="contained"
            buttonColor="#1e90ff"
            style={styles.button}
          >
            Sign Up
          </Button>
        )}

        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        elevation={5}
      >
        {errorMsg}
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        action={{ label: "Login", onPress: () => navigation.replace("Login") }}
        elevation={5}
      >
        Registered Successfully
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 5,
    width: "90%",
    alignSelf: "center",
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
    height: "100%",
  },
  form: {
    padding: 5,
    height: "100%",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default PatientRegisterForm;
