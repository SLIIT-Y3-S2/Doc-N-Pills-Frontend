import React from "react";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Dialog,
  Portal,
  Provider,
  Button,
  FAB,
} from "react-native-paper";
import { useEffect } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const Doctors = ({ navigation }) => {


  const [searchQuery, setSearchQuery] = React.useState("");

  const [doctors, setDoctor] = React.useState([]);
  const [deletemed, setDeleteMed] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const [id, setId] = React.useState(null);

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);


  useEffect(() => {
    const getDoctors = () => {
      setLoading(true);
      axios
        .get("https://doc-n-pills.herokuapp.com/doctor")
        .then((res) => {
          setDoctor(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getDoctors();
  }, [searchQuery]);

  useEffect(() => {
    const getUser = async () => {
      try {
        AsyncStorage.getItem("id").then((data) => {
          console.log("data", data);
          let user = JSON.parse(data);
          setId(user.id);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);


  const deleteDoctor = () => {
    axios
      .delete(`https://doc-n-pills.herokuapp.com/doctor/${deletemed}`)
      .then(() => {
        alert("Doctor Deleted Successfully");
      })
      .catch((err) => {
        alert("Not Successful");
      });
  };

  const filterContent = (doctors, searchTerm) => {
    const result = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialization.toLowerCase().includes(searchTerm)
    );
    setDoctor(result);
  };

  const handleTextSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    axios.get("https://doc-n-pills.herokuapp.com/doctor").then((res) => {
      if (res.data) {
        filterContent(res.data, searchTerm);
      }
    });
  };



  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(searchTerm) => {
          setSearchQuery(searchTerm);
        }}
        value={searchQuery}
      />
      {loading ? (<ActivityIndicator animating={true} size='large' color={'#1e90ff'} style={{marginTop:'50%'}} />):(
      <ScrollView>
        {doctors.map((doctor) => (
          <Card
            key={doctor._id}
            style={{
              backgroundColor: "#87cefa",
              margin: 10,
              borderRadius: 5,
              display: "flex",
            }}
          >
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>{doctor.name}</Title>
              <Paragraph>{doctor.specialization}</Paragraph>
              <Paragraph>
                 {doctor.availableDate} | {doctor.arrivalTime}
              </Paragraph>
              <Paragraph>Rs. {doctor.channelingFee}</Paragraph>
              <Paragraph style={{ fontWeight: "bold" }}>
                No. of Patients per day :- {doctor.noofPatients}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <FAB
                icon="pencil"
                color={"#1e90ff"}
                size="small"
                variant="surface"
                onPress={() => {
                  navigation.navigate("Update Doctor", {
                    params: { doctor },
                  });
                }}
              />
              <FAB
                icon="delete"
                color={"#1e90ff"}
                size="small"
                variant="surface"
                onPress={() => {
                  showDialog(), setDeleteMed(doctor._id);
                }}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      )}

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Delete Doctor</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are you sure want to delete this doctor ?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    deleteDoctor(), hideDialog();
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

      <View style={{ marginLeft: "75%", marginBottom: "1%" }}>
        <IconButton
          icon="plus"
          iconColor={"white"}
          size={40}
          backgroundColor={"#1e90ff"}
          borderRadius={10}
          onPress={() => navigation.navigate("Add Doctor")}
        />
      </View>
    </>
  );
};

export default Doctors;
