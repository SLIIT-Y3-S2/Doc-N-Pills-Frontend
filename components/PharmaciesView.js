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
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";

const PharmaciesView = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  // const onChangeSearch = (query) => setSearchQuery(query);

  const [pharmacies, setPharmacies] = React.useState([]);
  const [deletePharmacy, setDeletePharmacy] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [userdetails, setUserdetails] = React.useState(null);
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

  useEffect(() => {
    const getPharmacies = () => {
      setLoading(true);

      axios
        .get("https://doc-n-pills.herokuapp.com/users")
        .then((res) => {
          console.log(res.data);
          setPharmacies(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    console.log("userdetails", userdetails);

    getPharmacies();
  }, [refresh]);

  const deletePharmacyUser = () => {
    axios
      .delete(
        `https://doc-n-pills.herokuapp.com/users/delete/${deletePharmacy}`
      )
      .then(() => {
        setRefresh(!refresh);
        alert("Pharmacy Deleted Successfully");
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={() => {
          onChangeSearch;
        }}
        value={searchQuery}
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={"#1e90ff"}
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView>
          {pharmacies
            .filter((userType) => userType.type == "Pharmacy Agent")
            .map((pharmacy) => (
              <Card
                key={pharmacy._id}
                style={{
                  backgroundColor: "#87cefa",
                  margin: 10,
                  borderRadius: 5,
                  display: "flex",
                }}
              >
                <Card.Content>
                  <Title style={{ fontWeight: "bold" }}>{pharmacy.name}</Title>
                  <Paragraph>{pharmacy.location}</Paragraph>
                  <Paragraph>{pharmacy.openHours}</Paragraph>
                  <Paragraph>{pharmacy.availabilityStatus}</Paragraph>
                  <Paragraph>{pharmacy.telephone}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <FAB
                    icon="pencil"
                    color={"#1e90ff"}
                    size="small"
                    variant="surface"
                    onPress={() => {
                      navigation.navigate("Update Pharmacy", {
                        params: { pharmacy, refresh, setRefresh },
                      });
                    }}
                  />
                  <FAB
                    icon="delete"
                    color={"#1e90ff"}
                    size="small"
                    variant="surface"
                    onPress={() => {
                      showDialog(), setDeletePharmacy(pharmacy._id);
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
              <Dialog.Title>Delete Pharmacy</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Are you sure want to delete this pharmacy ?
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} textColor={"#1e90ff"}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    deletePharmacyUser(), hideDialog();
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
            navigation.navigate("Register", {
              params: {refresh, setRefresh},
            });
          }}
        />
      </View>
    </>
  );
};

export default PharmaciesView;
