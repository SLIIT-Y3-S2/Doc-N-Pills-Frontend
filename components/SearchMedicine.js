import axios from "axios";
import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Text,
} from "react-native-paper";

const SearchMedicine = () => {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [medicines, setMedicines] = React.useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const getMedicines = () => {
    setLoading(true);
    axios
      .get("https://doc-n-pills.herokuapp.com/medicine")
      .then((res) => {
        const results = res.data.filter(
          (medicine) =>
            medicine.brandName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            medicine.medicalTerm
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setMedicines(results);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  useEffect(() => {
    if (searchQuery !== null) {
      getMedicines();
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
          placeholder="Search Medicine Name"
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
            source={require("../assets/medicine.webp")}
            style={styles.image}
          />
        </View>
      ) : loading ? (
        <ActivityIndicator
          animating={true}
          color={"#1e90ff"}
          style={{ marginTop: 20 }}
        />
      ) : medicines.length > 0 ? (
        <ScrollView>
          {medicines.map((medicine) => (
            <Card
              key={medicine._id}
              style={{
                backgroundColor: "#87cefa",
                margin: 10,
                borderRadius: 5,
                display: "flex",
              }}
            >
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>
                  {medicine.pharmacyName}
                </Title>
                <Paragraph>Brand: {medicine.brandName}</Paragraph>
                <Paragraph>Medical Term: {medicine.medicalTerm}</Paragraph>
                <Paragraph>
                  Rs. {medicine.price} | {medicine.dose} | {medicine.type}
                </Paragraph>
                <Paragraph style={{ fontWeight: "bold" }}>
                  Available Stock :- {medicine.qty}
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

export default SearchMedicine;
