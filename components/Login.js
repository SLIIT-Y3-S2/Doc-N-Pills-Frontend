import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text, ActivityIndicator, Snackbar } from "react-native-paper";
import Background from "./Assets/Background";
import Logo from "./Assets/Logo";
import Header from "./Assets/Header";
import Button from "./Assets/Button";
import TextInput from "./Assets/TextInput";
import BackButton from "./Assets/BackButton";
import { theme } from "./core/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const API_URL = "https://doc-n-pills.herokuapp.com/";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false);
    if (userData.data.user.type == "Pharmacy Agent") {
      navigation.push("DocNPills");
    } else if (userData.data.user.type == "Channeling Center Agent") {
      navigation.push("ChCenterNavbar");
    } else if (userData.data.user.type == "Patient") {
      navigation.push("PatientNavBar");
    } else if (userData.data.user.type == "System Admin") {
      navigation.push("AdminNavBar");
    } else {
      alert(" You have to signup first ");
    }
  };

  const onToggleErrorSnackBar = () => {
    setVisibleError(!visibleError);
  };

  const onDismissErrorSnackBar = () => {
    setVisibleError(false);
    setLoading(false);
  };

  const loginNavi = async () => {
    setLoading(true);
    if (email.length == 0 || password.length == 0) {
      alert("Please fill all the fields");
    } else {
      const loginUser = { email, password };
      console.log(loginUser);
      await axios
        .post("https://doc-n-pills.herokuapp.com/users/login", loginUser)
        .then((data) => {
          setLoading(false);
          setUserData(data);
          if (data.data.user.email == "Invalid") {
            // alert("Login Error", "Invalid Credeintials ");
            onToggleErrorSnackBar();
          } else {
            AsyncStorage.setItem("id", JSON.stringify(data.data.user));
            AsyncStorage.setItem("token", data.data.token);
            onToggleSuccessSnackBar();
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.msg);
          onToggleErrorSnackBar();
        });

      //navigation.push('Home')
      console.log("email", email);
      console.log("password", password);
    }
  };

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
        mode="outlined"
        outlineColor="black"
        activeOutlineColor="#1e90ff"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
        mode="outlined"
        outlineColor="black"
        activeOutlineColor="#1e90ff"
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color={"#1e90ff"}
          // style={{ marginTop: "50%" }}
        />
      ) : (
        <Button
          mode="contained"
          style={{ backgroundColor: "#1e90ff" }}
          onPress={loginNavi}
        >
          Login
        </Button>
      )}
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("User Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={visibleError}
        onDismiss={onDismissErrorSnackBar}
        duration={2000}
        elevation={5}
      >
        {errorMsg}
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        elevation={5}
      >
        Login Successfully. Redirecting...
      </Snackbar>
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
