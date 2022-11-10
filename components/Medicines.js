import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import axios from "axios";

const Medicines = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const [medicines, setMedicine] = React.useState([]);
  const [deletemed, setDeleteMed] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const [id, setId] = React.useState(null);

  const [refresh, setRefresh] = React.useState(false);

  const [visibleError, setVisibleError] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const onToggleSuccessSnackBar = () => {
    setVisibleSuccess(!visibleSuccess);
  };

  const onDismissSuccessSnackBar = () => {
    setVisibleSuccess(false);
  };

  const onToggleErrorSnackBar = () => {
    setVisibleError(!visibleError);
  };

  const onDismissErrorSnackBar = () => {
    setVisibleError(false);
  };

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  const getMedicines = () => {
    if (searchQuery === "") {
      setLoading(true);
      axios
        .get("https://doc-n-pills.herokuapp.com/medicine")
        .then((res) => {
          setMedicine(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.msg);
        });
    } else {
      handleTextSearch();
    }
  };

  useEffect(
    () => {
      getMedicines();
    },
    [searchQuery,refresh]   
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        AsyncStorage.getItem("id").then((data) => {
          let user = JSON.parse(data);
          setId(user.id);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const deleteMedicine = () => {
    axios
      .delete(`https://doc-n-pills.herokuapp.com/medicine/${deletemed}`)
      .then(() => {
        setRefresh(!refresh);
        // alert("Medicine Deleted Successfully");
        onToggleSuccessSnackBar();
      })
      .catch((err) => {
        // alert("Not Successful");
        onToggleErrorSnackBar();
      });
  };

  const filterContent = (medicines, searchTerm) => {
    const result = medicines.filter(
      (medicine) =>
        medicine.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.medicalTerm.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMedicine(result);
  };

  const handleTextSearch = async () => {
    await axios
      .get("https://doc-n-pills.herokuapp.com/medicine")
      .then((res) => {
        if (res.data) {
          filterContent(res.data, searchQuery);
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
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color={"#1e90ff"}
          style={{ marginTop: "50%" }}
        />
      ) : (
        <ScrollView>
          {medicines
            .filter((pharmacyId) => pharmacyId.pharmacyId === id)
            .map((medicine) => (
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
                  <Title style={{ fontWeight: "bold" }}>
                    {medicine.brandName}
                  </Title>
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
                        params: { medicine, refresh, setRefresh },
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
      )}

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
          onPress={() => {
            navigation.navigate("Add Medicine", {
              params: { refresh, setRefresh },
            });
          }}
        />
      </View>

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
        Medicine Deleted Successfully
      </Snackbar>
    </>
  );
};

export default Medicines;
