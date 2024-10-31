import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";

const StartupNearbyMarketInfoScreen = () => {
  const markers = [
    {
      id: 1,
      title: "온양온천역",
      description: "온양온천역 근처 창업 공간",
      coordinate: { latitude: 36.7809, longitude: 127.0048 },
    },
    {
      id: 2,
      title: "청년 팝업 스토어",
      description: "여기서 팝업스토어를 확인하세요!",
      coordinate: { latitude: 36.7815, longitude: 127.008 },
    },
    {
      id: 3,
      title: "추천 창업 공간",
      description: "창업하기 좋은 위치!",
      coordinate: { latitude: 36.7822, longitude: 127.0065 },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="근처 상권 페이지" />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 36.7809, // 초기 지도 중심 위치 (온양온천역)
            longitude: 127.0048,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
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
    height: Dimensions.get("window").height,
  },
});

export default StartupNearbyMarketInfoScreen;
