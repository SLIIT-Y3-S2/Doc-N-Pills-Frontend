import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState, useEffect } from "react";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

const AddMedicineForm = ({ route, navigation }) => {
  const [validated, setvalidated] = useState(false);
  const [bname, setBrandName] = useState(null);
  const [mterm, setMedicalTerm] = useState(null);
  const [type, setType] = useState(null);
  const [stock, setStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [dose, setDose] = useState(null);

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const checkSubmit = async () => {
    const newMedicine = {
      brandName: bname,
      medicalTerm: mterm,
      price: price,
      qty: stock,
      type: type,
      dose: dose,
      pharmacyName: name,
      pharmacyId: id,
    };

    if (
      bname != null &&
      mterm != null &&
      type != null &&
      stock != null &&
      price != null &&
      dose != null
    ) {
      await axios
        .post("https://doc-n-pills.herokuapp.com/medicine", newMedicine)
        .then(() => {
          setRefresh(!refresh);
          alert("Medicine Added Successfully");
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
          label="Brand Name"
          placeholder="Enter Brand Name"
          value={bname}
          style={styles.input}
          onChangeText={(text) => setBrandName(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Medical Term"
          placeholder="Enter Medical Term"
          value={mterm}
          style={styles.input}
          onChangeText={(text) => setMedicalTerm(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        {/* <TextInput
          label="Type"
          placeholder="Enter Type"
          value={type}
          style={styles.input}
          onChangeText={(text) => setType(text)}
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
            placeholder={{ label: "Select type of the medicine ", value: null }}
            onValueChange={(type) => setType(type)}
            value={type}
            items={[
              { label: "Pill", value: "Pill" },
              { label: "Capsule", value: "Capsule" },
              { label: "Cream", value: "Cream" },
              { label: "Spray", value: "Spray" },
              { label: "Gel", value: "Gel" },
              { label: "Other", value: "Other" },
            ]}
          />
        </View>

        <TextInput
          label="Stock"
          placeholder="Enter Stock"
          value={stock}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setStock(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Price"
          placeholder="LKR 0.00"
          value={price}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

        <TextInput
          label="Dose"
          placeholder="Enter Dose"
          value={dose}
          style={styles.input}
          onChangeText={(text) => setDose(text)}
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

export default AddMedicineForm;
