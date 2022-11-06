import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const SysAdmin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topic}>Welcome Driver</Text>
      </View>

      <View style={styles.btn}>
        <Button color={"#00008b"} padding={10} title="Scan QR" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  topic: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    height: 150,
    width: 120,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});

export default SysAdmin;
