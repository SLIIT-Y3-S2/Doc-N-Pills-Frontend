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

const SearchPharmacy = () => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [pharmacies, setPharmacies] = React.useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const getPharmacies = () => {
    setLoading(true);
    axios
      .get("https://doc-n-pills.herokuapp.com/users")
      .then((res) => {
        const results = res.data.filter((pharmacy) =>
          pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPharmacies(results);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  useEffect(() => {
    if (searchQuery !== null) {
        getPharmacies();
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
          placeholder="Search Pharmacy Name"
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
      ) : pharmacies.length > 0 ? (
        <ScrollView>
          {pharmacies
          .filter((userType) => 
          userType.type == "Pharmacy Agent")
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
                <Title style={{ fontWeight: "bold" }}>
                  {pharmacy.name}
                </Title>
                <Paragraph>{pharmacy.location}</Paragraph>
                <Paragraph>{pharmacy.openHours}</Paragraph>
                <Paragraph>{pharmacy.availabilityStatus}</Paragraph>
                <Paragraph>{pharmacy.telephone}</Paragraph>
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
          <Text>Sorry... No Pharmacies Found!</Text>
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

export default SearchPharmacy;
