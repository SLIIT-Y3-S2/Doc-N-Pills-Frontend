import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";

const UpdateDoctorForm = ({ route, navigation }) => {
  const doctor = route.params.params.doctor;
  const [validated, setvalidated] = useState(false);
  const [dname, setDoctorName] = useState(doctor.name);
  const [splze, setSpecialization] = useState(doctor.specialization);
  const [adate, setDate] = useState(doctor.availableDate);
  const [atime, setTime] = useState(doctor.availableTime);
  const [fee, setFee] = useState(doctor.channelingFee);
  const [limit, setLimit] = useState(doctor.noofPatients);

  const checkSubmit = () => {
    const newDoctor = {
      name: dname,
      specialization: splze,
      availableDate: adate,
      availableTime: atime,
      channelingFee: fee,
      noofPatients: limit,
      channelingCenterName: "Channeling Center 1",
    };

    axios
      .put(`https://doc-n-pills.herokuapp.com/doctor/${doctor._id}`, newDoctor)
      .then(() => {
        alert("Doctor Updated Successfully");
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
          onPress={() => {
            checkSubmit(), navigation.navigate("ChCenterNavbar");
          }}
          mode="contained"
          buttonColor="#1e90ff"
          style={styles.button}
        >
          SAVE CHANGES
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

export default UpdateDoctorForm;
