import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";
import { useNavigation } from "@react-navigation/native";

const SpaceRentalListScreen = () => {
  const navigation = useNavigation();

  const rentalSpaces = [
    {
      id: 1,
      image: "https://cdn2.thecatapi.com/images/ctb.jpg",
      price: "월 30만원",
      size: "125m²",
      distance: "온양온천역 걸어서 5분",
      availability: "임대중",
      availabilityColor: "red",
      availableFrom: "2025년 3월부터 신청 가능",
    },
    {
      id: 2,
      image: "https://cdn2.thecatapi.com/images/c3g.jpg",
      price: "월 50만원",
      size: "200m²",
      distance: "온양역에서 뛰어서 1분",
      availability: "임대가능",
      availabilityColor: "blue",
      availableFrom: "임대신청 가능",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="청순가련" />
      <ScrollView style={styles.container}>
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>임대 창업 공간</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Text style={styles.icon}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.icon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {rentalSpaces.map((space) => (
          <TouchableOpacity
            key={space.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("SpaceRentalDetailScreen", { space })
            }
          >
            <Image source={{ uri: space.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.price}>{space.price}</Text>
                <Text
                  style={[
                    styles.availability,
                    { color: space.availabilityColor },
                  ]}
                >
                  {space.availability}
                </Text>
              </View>
              <Text style={styles.size}>{space.size}</Text>
              <Text style={styles.distance}>{space.distance}</Text>
              <Text style={styles.availableFrom}>{space.availableFrom}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingHorizontal: 10,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    marginVertical: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  size: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  distance: {
    fontSize: 16,
    color: "#888",
  },
  availability: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  availableFrom: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});

export default SpaceRentalListScreen;
