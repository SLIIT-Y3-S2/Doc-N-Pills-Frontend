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
import { TextInput, Button, Snackbar } from "react-native-paper";

const PatientUpdateForm = ({ navigation, route }) => {
  const [newname, setName] = useState(route.params.params.name);
  const [newemail, setEmail] = useState(route.params.params.email);
  const [newmobile, setMobile] = useState(route.params.params.mobile);
  const [newaddress, setAddress] = useState(route.params.params.address);
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
      setVisibleSuccess(false);
      setRefresh(!refresh);
      navigation.navigate("PatientNavBar", { screen: "Profile" });
  };

  const onToggleSnackBar = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const newPatient = {
        name:newname,
        email:newemail,
        mobile:newmobile,
        address:newaddress,
        };
      const result = await axios.put(
        `https://doc-n-pills.herokuapp.com/patient/${route.params.params.id}`,
        newPatient
      );
      onToggleSuccessSnackBar();
    } catch (err) {
        console.log(err);
      onToggleSnackBar();
    }
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
          value={newname}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Email Address"
          placeholder="Enter Your Email"
          value={newemail}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Mobile Number"
          placeholder="Enter Your Mobile Number"
          value={newmobile}
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
          value={newaddress}
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <Button
          onPress={handleSubmit}
          mode="contained"
          buttonColor="#1e90ff"
          style={styles.button}
        >
          Save Changes
        </Button>
      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        elevation={5}
      >
        Profile Not Updated
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        elevation={5}
      >
        Profile Update Successfully
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
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
});

export default PatientUpdateForm;
