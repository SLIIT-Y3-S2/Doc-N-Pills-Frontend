import React from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";

const UpdateMedicineForm = () => {
  const [validated, setvalidated] = useState(false);
  const [bname, setBrandName] = useState("");
  const [mterm, setMedicalTerm] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [dose, setDose] = useState("");

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
          onPress={() => console.log(bname)}
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
  },
  button: {
    margin: 12,
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
