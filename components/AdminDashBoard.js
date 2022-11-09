import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const AdminDashBoard = ({ navigation }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          textColor="white"
          backgroundColor={"#87cefa"}
          borderRadius={5}
          mode="elevated"
          style={styles.button}
          onPress={() =>
            navigation.navigate("AdminNavBar", { screen: "Channeling Centers" })
          }
        >
          Medicines{"  "}
          <Ionicons name="navigate" size={15} color="white" />
        </Button>

        <Button
          icon="doctor"
          textColor="white"
          backgroundColor={"#87cefa"}
          borderRadius={5}
          size={50}
          mode="elevated"
          style={styles.button}
          onPress={() =>
            navigation.navigate("PatientNavBar", { screen: "Search Doctor" })
          }
        >
          Doctors
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "40%",
    paddingTop: 50,
    paddingBottom: 50,
    color: "white",
    backgroundColor: "#87cefa",
    borderRadius: 10,
    marginTop: 100,
    backgroundColor: "#1e90ff",
    marginLeft: 10,
    marginRight: 10,
  },
});

export default AdminDashBoard;
