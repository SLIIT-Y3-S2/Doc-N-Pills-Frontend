import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateDoctorForm = ({ route, navigation }) => {
  const doctor = route.params.params.doctor;
  const [validated, setvalidated] = useState(false);
  const [dname, setDoctorName] = useState(doctor.name);
  const [splze, setSpecialization] = useState(doctor.specialization);
  const [adate, setDate] = useState(doctor.availableDate);
  // const [atime, setTime] = useState(doctor.availableTime);
  const [fee, setFee] = useState(doctor.channelingFee);
  const [limit, setLimit] = useState(doctor.noofPatients);

  const [utime, setTime] = useState(doctor.arrivalTime);
  const [atime, setTime1] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  //const [text, setText] = useState(' ');
  
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || atime;
    setShow(Platform.OS === 'ios');
    setTime1(currentDate);
    console.log(currentDate.getHours() + ":" + currentDate.getMinutes());
    console.log("atime",atime)
    let tempDate1 = new Date(currentDate)
    let ftime1 =  tempDate1.getHours() + '.' + tempDate1.getMinutes();
    const time = (currentDate.getHours() + ":" + currentDate.getMinutes());
    console.log("time",time)
    console.log("ftime",ftime1)
    setTime(ftime1)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
  };



  const checkSubmit = () => {
    const newDoctor = {
      name: dname,
      specialization: splze,
      availableDate: adate,
      arrivalTime: utime,
      channelingFee: fee,
      noofPatients: limit,
    };

    if (
      dname != null &&
      splze != null &&
      utime != null &&
      fee != null &&
      limit != null 
    ) {
    axios
      .put(`https://doc-n-pills.herokuapp.com/doctor/${doctor._id}`, newDoctor)
      .then(() => {
        alert("Doctor Updated Successfully");
      })
      .catch((err) => {
        alert("Error");
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <ScrollView style={styles.view}>
       <Image
        source={require("../assets/logo.png")}
        style={{ width: 50, height: 50, marginLeft: "42%" }}
      />
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

        {/* <TextInput
          label="AvailableTime"
          placeholder="Enter Available Time"
          value={atime}
          style={styles.input}
          onChangeText={(text) => setTime1(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        /> */}

<TextInput
          label="Arrival Time"
          placeholder="Select Arrival Time"
          value={utime}
          style={styles.input}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
          // onChange={(selectedtime) => setTime(selectedtime)}
          right={<TextInput.Icon icon="clock" onPress={showTimepicker} />}
        />
        
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={atime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange1}
        />
        )}

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
