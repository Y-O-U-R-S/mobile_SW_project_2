import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="청순가련" />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerContainer}
      >
        <View style={styles.bannerSlide}>
          <Image
            source={{ uri: "https://cdn2.thecatapi.com/images/53h.jpg" }}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>
            "지금 도전하세요! 작은 시작이 큰 성공으로 이어집니다. 🚀"
          </Text>
        </View>
        <View style={styles.bannerSlide}>
          <Image
            source={{ uri: "https://cdn2.thecatapi.com/images/bdq.jpg" }}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>
            "위기는 기회입니다! 지금이 바로 창업의 순간입니다. 💡"
          </Text>
        </View>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionHeader}>🔥 뜨끈 뜨끈 신상 팝업!</Text>
        <Text style={styles.subText}>
          "이전에 없던 새로운 시도로 여러분의 아이디어를 현실로 만들어보세요."
        </Text>
        <View style={styles.popUpList}>
          <TouchableOpacity style={styles.popUpCard}>
            <Image
              source={{
                uri: "https://cdn2.thecatapi.com/images/BDMOZo668.jpg",
              }}
              style={styles.popUpImage}
            />
            <Text style={styles.popUpTitle}>시몬스 하드웨어 스토어</Text>
            <Text style={styles.popUpDate}>9월 11일 ~ 12월 31일</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popUpCard}>
            <Image
              source={{ uri: "https://cdn2.thecatapi.com/images/1u8.jpg" }}
              style={styles.popUpImage}
            />
            <Text style={styles.popUpTitle}>두근 두근 온돌 남탕 온남</Text>
            <Text style={styles.popUpDate}>9월 12일 ~ 12월 31일</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popUpCard}>
            <Image
              source={{
                uri: "https://cdn2.thecatapi.com/images/8krfAgKYD.jpg",
              }}
              style={styles.popUpImage}
            />
            <Text style={styles.popUpTitle}>초록 초록 잔디밭</Text>
            <Text style={styles.popUpDate}>9월 30일 ~ 12월 29일</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.motivation}>
          "창업은 빠르게 시작하고, 천천히 배우는 과정입니다. 작은 시도도
          소중한 첫 걸음입니다."
        </Text>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bannerContainer: {
    height: 200,
    marginVertical: 10,
  },
  bannerSlide: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  bannerText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  popUpList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popUpCard: {
    width: 110,
    alignItems: "center",
    marginVertical: 10,
  },
  popUpImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  popUpTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  popUpDate: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  motivation: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default MainScreen;
