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
import Icon from "react-native-vector-icons/Ionicons";

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
        {/* 사용자 정보 섹션 */}
        <View style={styles.userSection}>
          <Icon name="person-circle-outline" size={80} color="#FF6F61" />
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

        {/* 메뉴 섹션 */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Notice")}
          >
            <View style={styles.menuContent}>
              <Icon name="notifications-outline" size={24} color="#333" />
              <Text style={styles.menuText}>공지사항 / 이벤트</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.logoutContent}>
          <Icon name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </View>
      </TouchableOpacity>

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
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  userRole: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
  },
  userRoleHighlight: {
    fontWeight: "bold",
    color: "#FF6F61",
  },
  editProfileButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "#FF6F61",
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
    marginBottom: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    marginLeft: 10,
  },
  logoutButton: {
    position: "absolute",
    bottom: 120, // Footer 바로 위에 위치
    left: 20,
    right: 20,
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default MyPageScreen;
