import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect} from "react";
import { View, Image, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const PharmacyProfile = () => {
  const [userdetails, setUserdetails] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [contact, setContact] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [openHours, setOpenHours] = React.useState(null);
  const [location, setLocation] = React.useState(null);  

  useEffect(() => {
    const getUser = async () => {
      try {
        AsyncStorage.getItem('id')
        .then((data) => {
          console.log("data", data);
          let user = JSON.parse(data);
          setName(user.name)
          setId(user.id)
          setContact(user.telephone)
          setEmail(user.email)
          setOpenHours(user.openHours)
          setLocation(user.location)
          //console.log("userdetails",userdetails)
          //console.log("user",userdetails.name)
        })
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  // console.log("userdetails",userdetails.name)

  return (
    <View>
      <Image
        source={require("../assets/medicine.webp")}
        style={{ width: '100%', height: 173 }}
      />

      <Card>
        <Card.Content>
          <Title style={{ textAlign: "center", fontWeight: "bold" }}>
            {name}
          </Title>
          <Button 
            mode="contained" 
            style={{backgroundColor:'#87cefa',borderRadius: 10,margin:10}}
          >
            Log out
          </Button>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#1e90ff"
            />
            {"    "}{id}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="call-outline" size={20} color="#1e90ff" />
            {"    "}{contact}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="mail-outline" size={20} color="#1e90ff" />
            {"    "}{email}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="alarm-outline" size={20} color="#1e90ff" />
            {"    "}{openHours}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="location-outline" size={20} color="#1e90ff" />
            {"    "}{location}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PharmacyProfile;
