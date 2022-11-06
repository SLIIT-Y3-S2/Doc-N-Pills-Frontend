import React from "react";
import { ScrollView, View } from "react-native";
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

const Medicines = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const onChangeSearch = (query) => setSearchQuery(query);

  const [medicines, setMedicine] = React.useState([]);
  const [deletemed, setDeleteMed] = React.useState(null);

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const getMedicines = () => {
      axios
        .get("https://doc-n-pills.herokuapp.com/medicine")
        .then((res) => {
          setMedicine(res.data);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getMedicines();
  });

  const deleteMedicine = () => {
    axios
      .delete(`https://doc-n-pills.herokuapp.com/medicine/${deletemed}`)
      .then(() => {
        alert("Medicine Deleted Successfully");
      })
      .catch((err) => {
        alert("Not Successful");
      });
  };

  // const filterContent = (medicines, searchQuery) => {
  //   const result = medicines.filter(
  //     (medicine) =>
  //       medicine.brandName.toLowerCase().includes(searchQuery) ||
  //       medicine.medicalTerm.toLowerCase().includes(searchQuery)

  //   );
  //   setMedicine(result);
  // };

  // const handleTextSearch = () => {
  //   const searchQuery = e.currentTarget.value;
  //   console.log(searchQuery);
  //   axios.get("https://doc-n-pills.herokuapp.com/medicine").then((res) => {
  //     if (res.data) {
  //       filterContent(res.data, searchQuery);
  //     }
  //   });
  // };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={() => {
          onChangeSearch;
        }}
        value={searchQuery}
      />
      <ScrollView>
        {medicines.map((medicine) => (
          <Card
            key={medicine._id}
            style={{
              backgroundColor: "#87cefa",
              margin: 10,
              borderRadius: 5,
              display: "flex",
            }}
          >
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>{medicine.brandName}</Title>
              <Paragraph>{medicine.medicalTerm}</Paragraph>
              <Paragraph>
                Rs. {medicine.price} | {medicine.dose} | {medicine.type}
              </Paragraph>
              <Paragraph style={{ fontWeight: "bold" }}>
                Available Stock :- {medicine.qty}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <FAB
                icon="pencil"
                color={"#1e90ff"}
                size="small"
                variant="surface"
                onPress={() => {
                  navigation.navigate("Update Medicine", {
                    params: { medicine },
                  });
                }}
              />
              <FAB
                icon="delete"
                color={"#1e90ff"}
                size="small"
                variant="surface"
                onPress={() => {
                  showDialog(), setDeleteMed(medicine._id);
                }}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Delete Medicine</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Are you sure want to delete this medicine ?
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    deleteMedicine(), hideDialog();
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
          onPress={() => navigation.navigate("Add Medicine")}
        />
      </View>
    </>
  );
};

export default Medicines;
