import React, { useState } from "react"; // useState 추가
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
import ChatbotScreen from "./ChatbotScreen";

const MainScreen = () => {
  const navigation = useNavigation();
  const [isChatOpen, setIsChatOpen] = useState(false); // 상태 정의

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="청순가련" style={styles.header} />

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>2024 여성 창업자 지원 제도 3가지</Text>
          <Text style={styles.subTitle}>written by 청순가련</Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>예비 창업자 공간</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoSubTitle}>이런 정보 어떠세요?</Text>
            <View style={styles.infoList}>
              <Text style={styles.infoItem}>- 창업 절차</Text>
              <Text style={styles.infoItem}>- 창업 필요 서류</Text>
              <Text style={styles.infoItem}>- 사업자 등록 전 체크 사항</Text>
              <Text style={styles.infoItem}>- 창업 필요 서류</Text>
            </View>
            <Image
              source={{
                uri: "https://www.example.com/image.png",
              }}
              style={styles.infoImage}
            />
          </View>
        </View>

        <View style={styles.advertisement}>
          <Image
            source={{
              uri: "https://www.example.com/ad-image.png",
            }}
            style={styles.adImage}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />

      {/* Chatbot Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setIsChatOpen(true)} // 챗봇 열기
      >
        <Text style={styles.chatButtonText}>💬</Text>
      </TouchableOpacity>

      {/* Chatbot Screen */}
      {isChatOpen && (
        <ChatbotScreen
          isVisible={isChatOpen} // 챗봇 상태 전달
          onClose={() => setIsChatOpen(false)} // 닫기 핸들러
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FF6B6B",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },
  infoSection: {
    marginVertical: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#FFF8F0",
  },
  infoSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  infoList: {
    marginBottom: 15,
  },
  infoItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  infoImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  advertisement: {
    marginTop: 20,
    alignItems: "center",
  },
  adImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  chatButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  chatButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default MainScreen;
