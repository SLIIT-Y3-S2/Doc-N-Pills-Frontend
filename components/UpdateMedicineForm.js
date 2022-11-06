import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";

const UpdateMedicineForm = ({ route, navigation }) => {
  const medicine = route.params.params.medicine;
  const [validated, setvalidated] = useState(false);
  const [bname, setBrandName] = useState(medicine.brandName);
  const [mterm, setMedicalTerm] = useState(medicine.medicalTerm);
  const [type, setType] = useState(medicine.type);
  const [stock, setStock] = useState(medicine.qty);
  const [price, setPrice] = useState(medicine.price);
  const [dose, setDose] = useState(medicine.dose);

  const checkSubmit = () => {
    const newMedicine = {
      brandName: bname,
      medicalTerm: mterm,
      price: price,
      qty: stock,
      type: type,
      dose: dose,
      pharmacyName: "Pharmacy 1",
    };

    axios
      .put(
        `https://doc-n-pills.herokuapp.com/medicine/${medicine._id}`,
        newMedicine
      )
      .then(() => {
        alert("Medicine Updated Successfully");
      })
      .catch((err) => {
        alert("Error");
      });
  };

  return (
    <ScrollView style={styles.view}>
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

        <TextInput
          label="Type"
          placeholder="Enter Type"
          value={type}
          style={styles.input}
          onChangeText={(text) => setType(text)}
          mode="outlined"
          outlineColor="black"
          activeOutlineColor="#1e90ff"
        />

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
          onPress={() => {
            checkSubmit(), navigation.navigate("DocNPills");
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

export default UpdateMedicineForm;
