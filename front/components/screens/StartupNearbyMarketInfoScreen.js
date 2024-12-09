import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import { LineChart } from "react-native-chart-kit";
import PagerView from "react-native-pager-view";

const StartupNearbyMarketInfoScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const baseUrl = useBaseUrl();

  const getCoordinates = async () => {
    try {
      const response = await fetch(`${baseUrl}/rentalSpaces`);
      const rentalSpaces = await response.json();

      const results = await Promise.all(
        rentalSpaces.map(async (space) => {
          try {
            const res = await axios.get(
              `https://dapi.kakao.com/v2/local/search/address.json`,
              {
                headers: {
                  Authorization: `KakaoAK 6a5618b5907079f2ecf86363b3e26637`,
                },
                params: { query: space.address },
              }
            );

            const geocodedData = res.data;

            if (geocodedData.documents && geocodedData.documents.length > 0) {
              const { y, x } = geocodedData.documents[0];
              return {
                id: space.id,
                name: space.name,
                description: space.description,
                address: space.address,
                imageUrl: space.imageUrl,
                distanceFromOnyangStation: space.distanceFromOnyangStation,
                area: space.area,
                contactNumber: space.contactNumber,
                price: space.price,
                coordinate: {
                  latitude: parseFloat(y),
                  longitude: parseFloat(x),
                },
              };
            } else {
              console.warn(
                `No coordinates found for address: ${space.address}`
              );
              return null;
            }
          } catch (error) {
            console.error(`Error geocoding address: ${space.address}`, error);
            return null;
          }
        })
      );

      setCoordinates(results.filter(Boolean));
    } catch (error) {
      console.error("Error fetching rental spaces: ", error);
    }
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(
        coordinates.map((marker) => marker.coordinate),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [coordinates]);

  const graphData = [
    {
      title: "11월 상권 추정 매출",
      highlight: "약 1억 218만 원",
      labels: ["24/07", "24/08", "24/09", "24/10"],
      datasets: [{ data: [1.1, 1.0, 1.3, 1.1] }],
    },
    {
      title: "11월 고객 방문 추정",
      highlight: "약 5,200명",
      labels: ["24/07", "24/08", "24/09", "24/10"],
      datasets: [{ data: [5000, 5100, 5300, 5200] }],
    },
    {
      title: "11월 신규 고객 비율",
      highlight: "약 35%",
      labels: ["24/07", "24/08", "24/09", "24/10"],
      datasets: [{ data: [30, 32, 35, 34] }],
    },
  ];

  const renderGraph = ({ item }) => (
    <View style={[styles.graphContainer, { marginTop: 95 }]}>
      <Text style={styles.graphTitle}>
        {item.title}
        <Text style={styles.graphHighlight}> {item.highlight}</Text>
      </Text>
      <LineChart
        data={{
          labels: item.labels,
          datasets: item.datasets,
        }}
        width={Dimensions.get("window").width * 0.98}
        height={160}
        yAxisSuffix={item.title.includes("매출") ? "억" : ""}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "rgba(255, 102, 0, 1)",
          },
          propsForBackgroundLines: {
            stroke: "#ddd",
            strokeDasharray: "3",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="지도" />
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 36.7809,
            longitude: 127.0048,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {coordinates.map((marker) => (
            <Marker key={marker.id} coordinate={marker.coordinate}>
              <View style={styles.markerContainer}>
                <Image
                  source={{ uri: marker.imageUrl }}
                  style={styles.markerImage}
                />
              </View>
              <Callout tooltip>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SpaceRentalDetailScreen", {
                      space: marker,
                    })
                  }
                >
                  <View style={styles.calloutContainer}>
                    <Image
                      source={{ uri: marker.imageUrl }}
                      style={styles.calloutImage}
                    />
                    <View style={styles.calloutTextContainer}>
                      <Text style={styles.calloutTitle}>{marker.name}</Text>
                      <Text style={styles.calloutAddress}>
                        {marker.address}
                      </Text>
                      <Text style={styles.calloutDescription}>
                        {marker.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>

      <View style={styles.graphContainer}>
        <PagerView style={styles.pagerView} initialPage={0}>
          {graphData.map((graph, index) => (
            <View key={index} style={styles.page}>
              {renderGraph({ item: graph })}
            </View>
          ))}
        </PagerView>
      </View>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
  markerContainer: {
    alignItems: "center",
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF6B6B",
  },
  calloutContainer: {
    width: 250,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    padding: 10,
  },
  calloutImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  calloutTextContainer: {
    padding: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: "#333",
  },
  graphContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  graphHighlight: {
    fontWeight: "bold",
    color: "rgba(255, 102, 0, 1)",
  },
});

export default StartupNearbyMarketInfoScreen;
