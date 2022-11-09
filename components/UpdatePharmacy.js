import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import BackButton from "./Assets/BackButton";
import Header from "./Assets/Header";
import RNPickerSelect from "react-native-picker-select";

const UpdatePharmacy = ({ route, navigation }) => {
  const center = route.params.params.pharmacy;
  console.log("center", center);
  const [name, setName] = useState(center.name);
  const [email, setEmail] = useState(center.email);
  const [telephone, setTelephone] = useState(center.telephone);
  const [location, setLocation] = useState(center.location);
  const [openHours, setOpenHours] = useState(center.openHours);
  const [availabilityStatus, setAvailabilityStatus] = useState(
    center.availabilityStatus
  );

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const checkSubmit = () => {
    const newCenter = {
      name: name,
      email: email,
      telephone: telephone,
      location: location,
      openHours: openHours,
      availabilityStatus: availabilityStatus,
    };
    axios
      .put(`https://doc-n-pills.herokuapp.com/users/${center._id}`, newCenter)
      .then(() => {
        //navigation.navigate("Home");
        setRefresh(!refresh);
        alert("Pharmacy Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Error in Updating Center");
      });
  };

  return (
    <ScrollView style={styles.view}>
      <SafeAreaView style={styles.form}>
        <Header>Update Agents</Header>
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
          value={telephone}
          style={styles.input}
          onChangeText={(text) => setTelephone(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Location"
          value={location}
          style={styles.input}
          onChangeText={(text) => setLocation(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />
        <TextInput
          label="Open Hours"
          value={openHours}
          style={styles.input}
          onChangeText={(text) => setOpenHours(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <View
          style={{
            margin: 12,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
          }}
        >
          <RNPickerSelect
            placeholder={{ label: "Availability Status", value: null }}
            onValueChange={(availabilityStatus) =>
              setAvailabilityStatus(availabilityStatus)
            }
            value={availabilityStatus}
            items={[
              { label: "Available", value: "Available" },
              { label: "Not Available", value: "Not Available" },
            ]}
          />
        </View>

        {/* <TextInput
          label="Availability Status"
          value={availabilityStatus}
          style={styles.input}
          onChangeText={(text) => setAvailabilityStatus(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        /> */}

        <Button
          onPress={() => {
            checkSubmit(), navigation.navigate("AdminNavBar");
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

export default UpdatePharmacy;
