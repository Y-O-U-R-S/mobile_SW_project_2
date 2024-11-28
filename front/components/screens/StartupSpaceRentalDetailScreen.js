import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from "react-native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";

const SpaceRentalDetailScreen = ({ route }) => {
  // Route에서 전달된 space 객체
  const { space } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="임대 창업 공간" />
      <ScrollView style={styles.container}>
        {/* 상단 이미지 */}
        <Image source={{ uri: space.imageUrl }} style={styles.image} />

        {/* 제목 */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{space.name}</Text>
          <View style={styles.separator} />
        </View>

        {/* 상세 내용 */}
        <View style={styles.detailsContainer}>
          {/* 위치 */}
          <Text style={styles.location}>📍 {space.address}</Text>
          {/* 거리 */}
          <Text style={styles.distance}>
            🏃‍♂️ 온양역에서 {space.distanceFromOnyangStation}분 거리
          </Text>
          {/* 설명 */}
          <Text style={styles.description}>{space.description}</Text>
          {/* 면적 */}
          <Text style={styles.area}>📐 면적: {space.area}평</Text>
          {/* 연락처 */}
          <Text style={styles.contact}>📞 연락처: {space.contactNumber}</Text>
          {/* 가격 */}
          <Text style={styles.price}>💰 가격: {space.price}원</Text>
        </View>
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
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#FF6B6B",
    marginTop: 5,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  distance: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 10,
  },
  area: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  contact: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginTop: 10,
  },
});

export default SpaceRentalDetailScreen;
