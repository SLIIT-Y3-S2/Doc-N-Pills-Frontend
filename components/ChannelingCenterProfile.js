import React from 'react'
import { View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChannelingCenterProfile = () => {
  return (
    <View>
    <Image
      source={require("../assets/channeling.jpeg")}
      style={{ width: 360, height: 233 }}
    />

    <Card>
      <Card.Content>
        <Title style={{ textAlign: "center", fontWeight: "bold" }}>
          Channeling Center Name
        </Title>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Paragraph>
          <Ionicons name="checkmark-circle-outline" size={20} color="#1e90ff" />
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
  )
}

export default ChannelingCenterProfile