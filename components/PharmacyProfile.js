import React from "react";
import { View, Image, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const PharmacyProfile = () => {
  return (
    <View>
      <Image
        source={require("../assets/medicine.webp")}
        style={{ width: '100%', height: 173 }}
      />

      <Card>
        <Card.Content>
          <Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Pharmacy Name
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
            {"    "}Registration No.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="call-outline" size={20} color="#1e90ff" />
            {"    "}Contact No.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="mail-outline" size={20} color="#1e90ff" />
            {"    "}Email
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="alarm-outline" size={20} color="#1e90ff" />
            {"    "}Opening Hours
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            <Ionicons name="location-outline" size={20} color="#1e90ff" />
            {"    "}Location
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PharmacyProfile;
