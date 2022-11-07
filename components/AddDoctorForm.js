import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";

const AddDoctorForm = ({ navigation }) => {
  const [validated, setvalidated] = useState(false);
  const [dname, setDoctorName] = useState(null);
  const [splze, setSpecialization] = useState(null);
  const [adate, setDate] = useState(null);
  const [atime, setTime] = useState(null);
  const [fee, setFee] = useState(null);
  const [limit, setLimit] = useState(null);

  const checkSubmit = async () => {
    const newDoctor = {
      name: dname,
      specialization: splze,
      availableDate: adate,
      availableTime: atime,
      channelingFee: fee,
      noofPatients: limit,
      channelingCenterName: "Channeling Center 1",
    };

    await axios
      .post("https://doc-n-pills.herokuapp.com/doctor", newDoctor)
      .then(() => {
        alert("Doctor Added Successfully");
      })
      .catch((err) => {
        alert("Error");
      });
  };

  return (
    <ScrollView style={styles.view}>
      <SafeAreaView style={styles.form}>
        <TextInput
          label="Doctor Name"
          placeholder="Enter Doctor Name"
          value={dname}
          style={styles.input}
          onChangeText={(text) => setDoctorName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Specialization"
          placeholder="Enter Doctor's Specialization"
          value={splze}
          style={styles.input}
          onChangeText={(text) => setSpecialization(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="AvailableDate"
          placeholder="Enter Available Date"
          value={adate}
          style={styles.input}
          onChangeText={(text) => setDate(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="AvailableTime"
          placeholder="Enter Available Time"
          value={atime}
          style={styles.input}
          onChangeText={(text) => setTime(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="ChannelingFee"
          placeholder="LKR 0.00"
          value={fee}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setFee(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="NoofPatients"
          placeholder="Enter Daily patients checking limit"
          value={limit}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setLimit(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <Button
          mode="contained"
          buttonColor="#1e90ff"
          style={styles.button}
          onPress={() => {
            checkSubmit(), navigation.navigate("DocNPills");
          }}
        >
          ADD
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
};

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
});

export default AddDoctorForm;
