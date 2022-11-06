import React from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Card, Title, Paragraph, IconButton , Dialog, Portal, Provider,Button } from "react-native-paper";

const Medicines = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        <Card
          style={{
            backgroundColor: "#87cefa",
            margin: 10,
            borderRadius: 5,
            display: "flex",
          }}
        >
          <Card.Content>
            <Title style={{ fontWeight: "bold" }}>Brand Name</Title>
            <Paragraph>Medical Term</Paragraph>
            <Paragraph>Rs. 175.00 | 250 mg | Type</Paragraph>
            <Paragraph style={{ fontWeight: "bold" }}>
              Available Stock :- 100
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon="archive-edit"
              iconColor={"#1e90ff"}
              size={20}
              onPress={() => navigation.navigate("Update Medicine")}
            />
            <IconButton 
                icon="delete" 
                iconColor={"#1e90ff"} 
                size={20} 
                onPress={showDialog}
            />
          </Card.Actions>
        </Card>
      </ScrollView>

      

      <Provider>
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Delete Medicine</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Are you sure want to delete this medicine ?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button 
                        onPress={hideDialog}
                        textColor={"#1e90ff"}
                    > Cancel
                    </Button>
                    <Button 
                        onPress={hideDialog}
                        textColor={"#1e90ff"}
                    >Delete
                    </Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
      </Provider>

      <View style={{ marginLeft: "75%", marginBottom: "5%" }}>
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
