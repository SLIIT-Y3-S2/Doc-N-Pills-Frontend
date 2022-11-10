import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { TextInput, Button, RadioButton, Text } from "react-native-paper";
import axios from "axios";
import BackButton from "./Assets/BackButton";
import Header from "./Assets/Header";

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
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 230, height: 230, marginLeft: "18%" }}
      />
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

        <View style={styles.input}>
          <Text>Availability Status</Text>

          <RadioButton.Group
            onValueChange={(newValue) => setAvailabilityStatus(newValue)}
            value={availabilityStatus}
          >
            <View>
              <Text>Available</Text>
              <RadioButton value="Available" />
            </View>
            <View>
              <Text>Not Available</Text>
              <RadioButton value="NotAvailable" />
            </View>
          </RadioButton.Group>
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
