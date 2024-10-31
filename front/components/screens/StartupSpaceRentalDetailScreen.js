import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";

const SpaceRentalDetailScreen = ({ route }) => {
  const { space } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="임대 공간 디테일 페이지" />
      <View style={styles.container}>
        <Image source={{ uri: space.image }} style={styles.image} />
        <Text style={styles.price}>{space.price}</Text>
        <Text style={styles.size}>{space.size}</Text>
        <Text style={styles.distance}>{space.distance}</Text>
        <Text style={[styles.availability, { color: space.availabilityColor }]}>
          {space.availability}
        </Text>
        <Text style={styles.availableFrom}>{space.availableFrom}</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 0,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  size: {
    fontSize: 20,
    color: "#555",
  },
  distance: {
    fontSize: 16,
    color: "#888",
  },
  availability: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  availableFrom: {
    fontSize: 14,
    color: "#888",
  },
});

export default SpaceRentalDetailScreen;
