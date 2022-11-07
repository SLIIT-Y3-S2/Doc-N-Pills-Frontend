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
import { ActivityIndicator } from 'react-native-paper';

const ChannelingCentersView = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const onChangeSearch = (query) => setSearchQuery(query);

  const [centers, setCenters] = React.useState([]);
  const [deleteCenter, setDeleteCenter] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const getCenters = () => {
      setLoading(true);
      axios
        .get("https://doc-n-pills.herokuapp.com/users")
        .then((res) => {
          console.log(res.data);
          setCenters(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.msg);
        });
    };
    getCenters();
  }, []);

  const deleteChCenter = () => {
    axios
      .delete(`https://doc-n-pills.herokuapp.com/users/delete/${deleteCenter}`)
      .then(() => {
        alert("Center Deleted Successfully");
      })
      .catch((err) => {
        alert("Not Successful");
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
      {loading ? (<ActivityIndicator animating={true} color={'#1e90ff'} style={{marginTop:20}} />):(
      <ScrollView>
        {centers.map((center) => (
          <Card
            key={center._id}
            style={{
              backgroundColor: "#87cefa",
              margin: 10,
              borderRadius: 5,
              display: "flex",
            }}
          >
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>{center.name}</Title>
              <Paragraph>{center.location}</Paragraph>
              <Paragraph>{center.openHours}</Paragraph>
              <Paragraph>{center.availabilityStatus}</Paragraph>
              <Paragraph>{center.telephone}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <FAB
                icon="pencil"
                color={"#1e90ff"}
                size="small"
                variant="surface"
                onPress={() => {
                  navigation.navigate("Update Medicine", {
                    params: { center },
                  });
                }}
              />
              <FAB
                icon="delete"
                color={"#1e90ff"}
                size="small"
                variant="surface"
                onPress={() => {
                  showDialog(), setDeleteCenter(center._id);
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
          onPress={() => navigation.navigate("Add Medicine")}
        />
      </View>
    </>
  );
};

export default ChannelingCentersView;
