import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useNavigation } from "@react-navigation/native";

const MyPageScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="마이 페이지" />
      <View style={styles.container}>
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>3초만에 로그인하고</Text>
          <Text style={styles.loginText}>모든 서비스를 이용해 보세요!</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.menuText}>예비 창업자 도우미 | 바로가기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuText}>공지사항 | 이벤트</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuText}>팝업스토어 제보하기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuText}>팝업스토어 홍보하기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuText}>문의하기</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loginSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#555",
    fontFamily: "NotoSansKR-Regular",
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  loginButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontFamily: "NotoSansKR-Regular",
  },
  menuSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
    fontFamily: "NotoSansKR-Regular",
  },
});

export default MyPageScreen;
