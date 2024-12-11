import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";
import ChatbotScreen from "./ChatbotScreen";

const MainScreen = () => {
  const { userInfo } = useContext(UserContext);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleImagePress = () => {
    Linking.openURL(
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40005&cntntsId=238883"
    ).catch((err) => console.error("Error opening URL: ", err));
  };
  const handleImagePress2 = () => {
    Linking.openURL(
      "https://help.3o3.co.kr/hc/ko/articles/29099090200985-2024-%EC%97%AC%EC%84%B1%EC%B0%BD%EC%97%85-%EC%A7%80%EC%9B%90%EA%B8%88-%EC%A0%9C%EB%8F%84-3%EA%B0%80%EC%A7%80-%EC%97%AC%EC%84%B1%EA%B0%80%EC%9E%A5-%EC%B0%BD%EC%97%85-%EC%A7%80%EC%9B%90%EA%B8%88-%EB%93%B1"
    ).catch((err) => console.error("Error opening URL: ", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="청순가련" backButton={false} style={styles.header} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={handleImagePress2}>
          <View style={styles.titleSection}>
            <Image
              source={{
                uri: "https://yoursyhs3bucket.s3.ap-northeast-2.amazonaws.com/490f724a-aqweqweqweqweasdzxc.png",
              }}
              style={styles.titleImage}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>예비 창업자 공간</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoSubTitle}>
              {userInfo?.name} 님, 창업에 필요한 정보를 모아봤어요!
            </Text>
            <View style={styles.infoList}>
              <Text style={styles.infoItem}>
                1. 창업 아이템 시장 조사를 철저히 하세요.
              </Text>
              <Text style={styles.infoItem}>
                2. 창업 서류는 미리 준비하세요.
              </Text>
              <Text style={styles.infoItem}>
                3. 사업자 등록 전 세금 사항을 확인하세요.
              </Text>
              <Text style={styles.infoItem}>
                4. 창업 지원 제도를 활용하세요.
              </Text>
              <Text style={styles.infoItem}>
                5. 창업 자금을 체계적으로 관리하세요.
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleImagePress}>
          <View style={styles.advertisement}>
            <Image
              source={{
                uri: "https://yoursyhs3bucket.s3.ap-northeast-2.amazonaws.com/5041395e-9image.png",
              }}
              style={styles.adImage}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Footer />

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setIsChatOpen(true)}
      >
        <Text style={styles.chatButtonText}>💬</Text>
      </TouchableOpacity>

      {isChatOpen && (
        <ChatbotScreen
          isVisible={isChatOpen}
          onClose={() => setIsChatOpen(false)}
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
  titleImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  infoSection: {},
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF6B6B",
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
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    lineHeight: 24,
    fontWeight: "500",
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderColor: "#FF6B6B",
  },
  advertisement: {
    marginTop: 20,
    alignItems: "center",
  },
  adImage: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
  },
  chatButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#FF8A63",
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
