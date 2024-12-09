import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";

const SpaceRentalDetailScreen = ({ route }) => {
  const { space } = route.params;
  const [destinationCoordinate, setDestinationCoordinate] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // 가격을 만원 단위로 포맷팅
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "가격 정보 없음";
    const formattedPrice = (price / 10000).toFixed(0);
    return `${formattedPrice}만원`;
  };

  // 주소를 좌표로 변환
  const getCoordinates = async () => {
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

      if (res.data.documents.length > 0) {
        const { y, x } = res.data.documents[0];
        setDestinationCoordinate({
          latitude: parseFloat(y),
          longitude: parseFloat(x),
        });
      } else {
        Alert.alert("좌표 변환 실패", "해당 주소의 좌표를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      Alert.alert("오류", "좌표를 가져오는 중 문제가 발생했습니다.");
    }
  };

  // 현재 위치 가져오기
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "권한 없음",
          "위치 정보를 가져오기 위해 권한이 필요합니다."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("위치 정보 오류", "현 위치를 가져올 수 없습니다.");
    }
  };

  // 카카오맵 앱 열기
  const openKakaoMapApp = () => {
    if (!destinationCoordinate || !currentLocation) {
      Alert.alert("위치 정보 없음", "출발지 또는 도착지를 불러오는 중입니다.");
      return;
    }

    const sp = `${currentLocation.latitude},${currentLocation.longitude}`;
    const ep = `${destinationCoordinate.latitude},${destinationCoordinate.longitude}`;
    const kakaoMapAppUrl = `kakaomap://route?sp=${sp}&ep=${ep}&by=CAR`;

    Linking.openURL(kakaoMapAppUrl).catch((err) =>
      console.error("Failed to open Kakao Map App:", err)
    );
  };

  useEffect(() => {
    getCoordinates();
    getCurrentLocation();
  }, []);

  const renderInfoRow = (label, value) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.infoText}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="임대 창업 공간" backButton={true} />
      <ScrollView style={styles.container}>
        {/* 이미지 */}
        <Image source={{ uri: space.imageUrl }} style={styles.image} />

        {/* 제목 */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{space.name}</Text>
          <View style={styles.separator} />
        </View>

        {/* 정보 */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>공간 정보</Text>
          <View style={styles.sectionSeparator} />
          {renderInfoRow("📍 위치", space.address)}
          {renderInfoRow("💰 가격", `월 ${formatPrice(space.price)}`)}
          {renderInfoRow("📐 규모", `${space.area}평`)}
          {renderInfoRow("📞 연락처", space.contactNumber)}
          {renderInfoRow("🚶‍♂️ 거리", `${space.distanceFromOnyangStation}분`)}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>상세 설명</Text>
            <Text style={styles.descriptionText}>{space.description}</Text>
          </View>
        </View>

        {/* 카카오맵 버튼 */}
        <TouchableOpacity style={styles.mapButton} onPress={openKakaoMapApp}>
          <Text style={styles.mapButtonText}>카카오맵으로 길 찾기 🚗</Text>
        </TouchableOpacity>
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
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  titleContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  separator: {
    height: 2,
    width: "50%",
    backgroundColor: "#FF6B6B",
    marginTop: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 15,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
  mapButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    elevation: 3,
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SpaceRentalDetailScreen;
