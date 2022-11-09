import axios from "axios";
import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
  Searchbar,
  Text,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";

const SearchDoctor = () => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [docotors, setDoctors] = React.useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const getDoctors = () => {
    setLoading(true);
    axios
      .get("https://doc-n-pills.herokuapp.com/doctor")
      .then((res) => {
        const results = res.data.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setDoctors(results);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  useEffect(() => {
    if (searchQuery !== null) {
      getDoctors();
    }
  }, [searchQuery]);
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#87cefa",
          paddingBottom: 20,
          paddingTop: 10,
        }}
      >
        <Searchbar
          placeholder="Search Doctor Name"
          onChangeText={(searhTerm) => {
            onChangeSearch(searhTerm);
          }}
          value={searchQuery}
          elevation={5}
          style={{
            backgroundColor: "white",
            width: "94%",
            marginTop: 10,
          }}
        />
      </View>
      {searchQuery === "" || searchQuery === null ? (
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Image source={require("../assets/channeling.jpeg")} style={styles.image} />
        </View>
      ) : loading ? (
        <ActivityIndicator
          animating={true}
          color={"#1e90ff"}
          style={{ marginTop: 20 }}
        />
      ) : docotors.length > 0 ? (
        <ScrollView>
          {docotors.map((doctor) => (
            <Card
              key={doctor._id}
              style={{
                backgroundColor: "#87cefa",
                margin: 10,
                borderRadius: 5,
                display: "flex",
              }}
            >
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>
                  {doctor.channelingCenterName}
                </Title>
                <Paragraph>
                  {doctor.name} - {doctor.specialization}
                </Paragraph>
                <Paragraph>
                  {doctor.availableDate} | {doctor.availableTime}
                </Paragraph>
                <Paragraph>
                  Channeling Fee - Rs. {doctor.channelingFee}
                </Paragraph>
                <Paragraph style={{ fontWeight: "bold" }}>
                  No. of Patients per day :- {doctor.noofPatients}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Sorry... No Channeling Centers Found!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 200,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 20,
  },
});

export default SearchDoctor;
