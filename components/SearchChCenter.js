import React, { useEffect } from "react";
import axios from "axios";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
  Searchbar,
  Text,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";

const SearchChCenter = () => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [centers, setCenters] = React.useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const getCenters = () => {
    setLoading(true);
    axios
      .get("https://doc-n-pills.herokuapp.com/users")
      .then((res) => {
        const results = res.data.filter((center) =>
          center.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCenters(results);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  useEffect(() => {
    if (searchQuery !== null) {
      getCenters();
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
          placeholder="Search Center Name"
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
          <Image
            source={require("../assets/medicine.webp")} //channeling.jpeg
            style={styles.image}
          />
        </View>
      ) : loading ? (
        <ActivityIndicator
          animating={true}
          color={"#1e90ff"}
          style={{ marginTop: 20 }}
        />
      ) : centers.length > 0 ? (
        <ScrollView>
          {centers
            .filter((userType) => userType.type == "Channeling Center Agent")
            .map((center) => (
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

export default SearchChCenter;
