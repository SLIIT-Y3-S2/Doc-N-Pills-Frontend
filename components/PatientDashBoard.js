import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const PatientDashboard = ({navigation}) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          icon="pill"
          textColor="white"
          backgroundColor={"#1e90ff"}
          borderRadius={5}
          mode="elevated"
          style={styles.button}
          onPress={() =>
            navigation.navigate("PatientNavBar", { screen: "Search Medicine" })
          }
        >
          Medicines
        </Button>
        <Button
          icon="doctor"
          textColor="white"
          backgroundColor={"#1e90ff"}
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
}

const styles = StyleSheet.create({
  button: {
    width: "40%",
    paddingTop: 50,
    paddingBottom: 50,
    color: "white",
    backgroundColor: "#1e90ff",
 },
});

export default PatientDashboard