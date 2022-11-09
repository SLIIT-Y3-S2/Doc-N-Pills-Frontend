import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, View, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddDoctorForm = ({ navigation }) => {
  //const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'));
  const [validated, setvalidated] = useState(false);
  const [dname, setDoctorName] = useState(null);
  const [splze, setSpecialization] = useState(null);
  const [adate, setDates] = useState(null);
  const [fee, setFee] = useState(null);
  const [limit, setLimit] = useState(null);

  const [stime, setTime1] = useState(new Date());
  const [etime, setTime2] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [text1, setText1] = useState(' ');
  const [text2, setText2] = useState(' ');

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || stime;
    setShow(Platform.OS === 'ios');
    setTime1(currentDate);
    console.log(currentDate.getHours() + ":" + currentDate.getMinutes());
    let tempDate1 = new Date(currentDate)
    let ftime1 =  tempDate1.getHours() + '.' + tempDate1.getMinutes();
    setText1(ftime1)
  };

  
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || etime;
    setShow(Platform.OS === 'ios');
    setTime2(currentDate);
    console.log(currentDate.getHours() + ":" + currentDate.getMinutes());
    let tempDate2 = new Date(currentDate)
    let ftime2 =  tempDate2.getHours() + '.' + tempDate2.getMinutes();
    setText2(ftime2)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
  };

  const checkSubmit = async () => {
    const newDoctor = {
      name: dname,
      specialization: splze,
      availableDate: adate,
      startTime: stime,
      endTime: etime,
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
          onChangeText={(text) => setDates(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Start Time"
          placeholder="Select Start Time"
          value={text1}
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
          value={stime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange1}
        />
        )}

         <TextInput
          label="End Time"
          placeholder="Select End Time"
          value={text2}
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
          value={etime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange2}
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
          mode="contained"
          buttonColor="#1e90ff"
          style={styles.button}
          onPress={() => {
            checkSubmit(), navigation.navigate("ChCenterNavbar");
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
