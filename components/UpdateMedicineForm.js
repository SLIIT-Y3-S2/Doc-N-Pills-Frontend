import React from "react";
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

const UpdateMedicineForm = ({ route, navigation }) => {
  const medicine = route.params.params.medicine;

  const refresh = route.params.params.refresh;
  const setRefresh = route.params.params.setRefresh;

  const [validated, setvalidated] = useState(false);
  const [bname, setBrandName] = useState(medicine.brandName);
  const [mterm, setMedicalTerm] = useState(medicine.medicalTerm);
  const [type, setType] = useState(medicine.type);
  const [stock, setStock] = useState(medicine.qty);
  const [price, setPrice] = useState(medicine.price);
  const [dose, setDose] = useState(medicine.dose);

  const [loading, setLoading] = React.useState(false);

  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false);
    navigation.navigate("DocNPills");
  };

  const onToggleErrorSnackBar = () => {
    setVisibleError(!visibleError);
  };

  const onDismissErrorSnackBar = () => {
    setVisibleError(false);
    setLoading(false);
  };

  const checkSubmit = () => {
    const newMedicine = {
      brandName: bname,
      medicalTerm: mterm,
      price: price,
      qty: stock,
      type: type,
      dose: dose,
    };

    if (
      bname != null &&
      mterm != null &&
      type != null &&
      stock != null &&
      price != null &&
      dose != null
    ) {
      setLoading(true);
      axios
        .put(
          `https://doc-n-pills.herokuapp.com/medicine/${medicine._id}`,
          newMedicine
        )
        .then(() => {
          setRefresh(!refresh);
          // alert("Medicine Updated Successfully");
          setLoading(false);
          onToggleSuccessSnackBar();
        })
        .catch((err) => {
          // alert("Error");
          onToggleErrorSnackBar();
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <>
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
              placeholder={{
                label: "Select type of the medicine ",
                value: null,
              }}
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

          {loading ? (
            <ActivityIndicator
              animating={true}
              size="large"
              color={"#1e90ff"}
              // style={{ marginTop: "50%" }}
            />
          ) : (
            <Button
              onPress={checkSubmit}
              mode="contained"
              buttonColor="#1e90ff"
              style={styles.button}
            >
              SAVE CHANGES
            </Button>
          )}
        </SafeAreaView>
      </ScrollView>

      <Snackbar
        visible={visibleError}
        onDismiss={onDismissErrorSnackBar}
        duration={2000}
        elevation={5}
      >
        Not Successful
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSuccessSnackBar}
        duration={2000}
        elevation={5}
      >
        Medicine Updated Successfully
      </Snackbar>
    </>
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
