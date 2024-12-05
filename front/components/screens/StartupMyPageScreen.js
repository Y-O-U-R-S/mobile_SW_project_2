import React, { useContext } from "react";
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
import { UserContext } from "../../contexts/UserContext";

const MyPageScreen = () => {
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = useContext(UserContext); // UserContext에서 로그인 정보와 setUserInfo 가져오기

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setUserInfo(null); // userInfo를 null로 설정하여 로그인 상태를 초기화
    navigation.navigate("Login"); // 로그아웃 후 로그인 화면으로 이동
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="마이페이지" />
      <View style={styles.container}>
        <View style={styles.userSection}>
          <Text style={styles.userName}>
            {userInfo?.name || "사용자"} {/* 로그인된 사용자 이름 */}
          </Text>
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
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Notice")}
          >
            <Text style={styles.menuText}>공지사항 / 이벤트</Text>
          </TouchableOpacity>
        </View>

        {/* 로그아웃 버튼 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>
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
  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    backgroundColor: "#FF6B6B",
    borderRadius: 25,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyPageScreen;
