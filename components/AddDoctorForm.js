import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, View, Platform, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from "react-native-picker-select";

const AddDoctorForm = ({route, navigation }) => {
  //const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'));
  const [validated, setvalidated] = useState(false);
  const [dname, setDoctorName] = useState(null);
  const [splze, setSpecialization] = useState(null);
  const [adate, setDates] = useState(null);
  const [fee, setFee] = useState(null);
  const [limit, setLimit] = useState(null);

  const [atime, setTime1] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(' ');

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  
  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;
  

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
    setText(ftime1)
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
      arrivalTime: text,
      channelingFee: fee,
      noofPatients: limit,
      channelingCenterName: name,
      channelingCenterId: id,
    };

  //   await axios
  //     .post("https://doc-n-pills.herokuapp.com/doctor", newDoctor)
  //     .then(() => {
  //       alert("Doctor Added Successfully");
  //     })
  //     .catch((err) => {
  //       alert("Error");
  //     });
  // };

  if (
    dname != null &&
    splze != null &&
    text != null &&
    fee != null &&
    limit != null 
  ) {
    await axios
      .post("https://doc-n-pills.herokuapp.com/doctor", newDoctor)
      .then(() => {
        setRefresh(!refresh);
        alert("Doctor Added Successfully");
      })
      .catch((err) => {
        alert("Error");
      });
  } else {
    alert("Please fill all the fields");
  }
};

useEffect(() => {
  const getUser = async () => {
    try {
      AsyncStorage.getItem("id").then((data) => {
        console.log("data", data);
        let user = JSON.parse(data);
        setName(user.name);
        setId(user.id);
      });
    } catch (err) {
      console.log(err);
    }
  };
  getUser();
}, []);

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

        {/* <TextInput
          label="AvailableDate"
          placeholder="Enter Available Date"
          value={adate}
          style={styles.input}
          onChangeText={(text) => setDates(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        /> */}

<View
          style={{
            margin: 12,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
          }}
        >
          <RNPickerSelect
            placeholder={{ label: "Select date ", value: null }}
            onValueChange={(type) => setDates(type)}
            value={adate}
            items={[
              { label: "Monday", value: "Monday" },
              { label: "Tuesday", value: "Tuesday" },
              { label: "Wednesday", value: "Wednesday" },
              { label: "Thursday", value: "Thursday" },
              { label: "Friday", value: "Friday" },
              { label: "Saturday", value: "Saturday" },
              { label: "Sunday", value: "Sunday" },
            ]}
          />
        </View>

        <TextInput
          label="Arrival Time"
          placeholder="Select Arrival Time"
          value={text}
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
