import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Provider,
  Dialog,
  Portal,
} from "react-native-paper";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

const PatientProfile = ({ navigation }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => {
    setVisible(false);
  };

  const showDialogDelete = () => {
    setVisibleDelete(true);
  };

  const hideDialogDelete = () => {
    setVisibleDelete(false);
  };

  const getUser = async () => {
    try {
      AsyncStorage.getItem("id").then((data) => {
        console.log("data", data);
        let user = JSON.parse(data);
        setName(user.name);
        setId(user.id);
        setMobile(user.mobile);
        setEmail(user.email);
        setAddress(user.address);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [refresh]);

  const deleteAccount = async () => {
    await axios
      .delete(`https://doc-n-pills.herokuapp.com/patient/${id}`)
      .then((res) => {
        console.log(res.data);
        setVisibleDelete(false);
        navigation.navigate("Welcome Admin");
      })
      .catch((err) => {
        alert("Account not deleted");
        console.log(err);
      });
  };

  const handlelogout = () => {
    AsyncStorage.removeItem("id");
    navigation.navigate("Welcome Admin");
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          source={require("../assets/patient.png")}
          style={{
            width: "60%",
            height: 250,
            marginBottom: 10,
            borderRadius: 10,
            borderColor: "#1e90ff",
            borderWidth: 1,
          }}
        />
      </View>
      <Card>
        <Card.Content>
          <Title style={{ textAlign: "center", fontWeight: "bold" }}>
            {name}
          </Title>
          <Button
            mode="contained"
            style={{
              backgroundColor: "#87cefa",
              borderRadius: 10,
              margin: 10,
              borderColor: "#1e90ff",
              borderWidth: 2,
            }}
            textColor="black"
            onPress={showDialog}
          >
            Log out
          </Button>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="card-outline" size={20} color="#1e90ff" />
            {"    "}
            {id}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="call-outline" size={20} color="#1e90ff" />
            {"    "}
            {mobile}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="mail-outline" size={20} color="#1e90ff" />
            {"    "}
            {email}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="location-outline" size={20} color="#1e90ff" />
            {"    "}
            {address}
          </Paragraph>
        </Card.Content>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "5%",
        }}
      >
        <Button
          icon="pencil"
          mode="elevated"
          textColor="#1e90ff"
          style={styles.button}
          onPress={() =>
            navigation.navigate("Update Patient", {
              params: { id, name, email, mobile, address, refresh, setRefresh },
            })
          }
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="elevated"
          textColor="red"
          style={styles.button}
          onPress={showDialogDelete}
        >
          Delete
        </Button>
      </View>
      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Log Out</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are you sure want to sign out ?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    handlelogout(), hideDialog();
                  }}
                  textColor={"red"}
                >
                  Log out
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      <Provider>
        <View>
          <Portal>
            <Dialog visible={visibleDelete} onDismiss={hideDialogDelete}>
              <Dialog.Title>Delete Account</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Are you sure want to delete your Account?
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialogDelete} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    deleteAccount()
                  }}
                  textColor={"red"}
                >
                  Delete
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "40%",
    padding: 3,
    color: "white",
    backgroundColor: "#ffffff",
    borderColor: "#1e90ff",
    borderWidth: 2,
  },
});

export default PatientProfile;
