import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";
import { useNavigation } from "@react-navigation/native";

const MyPageScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="마이페이지" />
      <View style={styles.container}>
        <View style={styles.userSection}>
          <Text style={styles.userName}>유창석</Text>
          <Text style={styles.userRole}>
            <Text style={styles.userRoleHighlight}>창업자님</Text> 환영합니다!
          </Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editProfileButtonText}>개인정보 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>공지사항 / 이벤트</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>팝업스토어에 제보하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>팝업스토어에 홍보하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>QnA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
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
    paddingTop: 10,
  },
  userSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  userRole: {
    fontSize: 18,
    color: "#000",
  },
  userRoleHighlight: {
    fontWeight: "bold",
    color: "#000",
  },
  editProfileButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  editProfileButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  menuSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
  },
  menuItem: {
    marginBottom: 15,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});

export default MyPageScreen;
