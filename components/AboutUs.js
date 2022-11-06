import React from "react";
import { View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const AboutUs = () => {
  return (
    <View>
      <Image
        source={require("../assets/about.jpg")}
        style={{ width: 360, height: 200 }}
      />

      <Card>
        <Card.Content>
          <Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Doc N Pills
          </Title>
          <Paragraph style={{ textAlign: "center" }}>Card content</Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            Facebook{"     "}
            <Ionicons name="logo-facebook" size={20} color="blue" />
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            Instagram{"     "}
            <Ionicons name="logo-instagram" size={20} color="red" />
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            Twitter{"      "}
            <Ionicons name="logo-twitter" size={20} color="blue" />
          </Paragraph>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Paragraph>
            Whatsapp{"      "}
            <Ionicons name="logo-whatsapp" size={20} color="green" />
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default AboutUs;
