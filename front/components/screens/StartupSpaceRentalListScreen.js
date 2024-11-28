import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";
import { useNavigation } from "@react-navigation/native";

const SpaceRentalListScreen = () => {
  const navigation = useNavigation();

  // State for storing rental spaces and loading state
  const [rentalSpaces, setRentalSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the server
  useEffect(() => {
    const fetchRentalSpaces = async () => {
      try {
        const response = await fetch("http://10.20.38.156:8000/rentalSpaces");
        if (!response.ok) {
          throw new Error("Failed to fetch rental spaces");
        }
        const data = await response.json();
        setRentalSpaces(data); // Set data to the state
      } catch (error) {
        console.error("Error fetching rental spaces:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRentalSpaces();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="청순가련" />
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6B6B" />
        ) : rentalSpaces.length > 0 ? (
          rentalSpaces.map((space) => (
            <TouchableOpacity
              key={space.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("SpaceRentalDetailScreen", { space })
              }
            >
              <Image source={{ uri: space.imageUrl }} style={styles.image} />
              <View style={styles.content}>
                <Text style={styles.cardTitle}>{space.name}</Text>
                <Text style={styles.location}>{space.address}</Text>
                <Text style={styles.description}>{space.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noData}>등록된 공간이 없습니다.</Text>
        )}
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
    marginTop: 10,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFF8F0",
    borderRadius: 15,
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  noData: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default SpaceRentalListScreen;
