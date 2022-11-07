import React from "react";
import { View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Linking} from 'react-native'

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

      <View style={{flexDirection:'row',justifyContent:'space-evenly', marginTop:20}}>
        <Ionicons 
          name="logo-facebook" 
          size={30} 
          color="blue" 
          onPress={() => {
            Linking.openURL('https://www.facebook.com/')}}
        />
        <Ionicons 
          name="logo-instagram" 
          size={30} 
          color="red" 
          onPress={() => {
            Linking.openURL('https://www.instagram.com/')}}
        />
        <Ionicons 
          name="logo-twitter" 
          size={30} 
          color="blue" 
          onPress={() => {
            Linking.openURL('https://twitter.com/?lang=en')}}
        />
        <Ionicons
           name="logo-whatsapp" 
           size={30} 
           color="green" 
           onPress={() => {
            Linking.openURL('https://www.whatsapp.com/')}}
        />
        <Ionicons
           name="mail-outline" 
           size={30} 
           color="red" 
           onPress={() => {
            Linking.openURL('mailto:chaminduhansana5@gmail.com')}}
        />
      </View>

    </View>
  );
};

export default AboutUs;
