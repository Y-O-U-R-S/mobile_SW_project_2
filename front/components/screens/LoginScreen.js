import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // 배경 그라데이션 추가
import { UserContext } from "../../contexts/UserContext";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const baseUrl = useBaseUrl();

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert("오류", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        const loginResult = await response.text();
        if (loginResult.trim() === "로그인 가능.") {
          const userResponse = await fetch(
            `${baseUrl}/user/find?email=${encodeURIComponent(id)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (id === "a@a.com") {
              userData.role = "admin";
            } else {
              userData.role = "user";
            }
            setUserInfo(userData);
            Alert.alert(
              "로그인 성공",
              id === "a@a.com"
                ? "관리자로 로그인 되었습니다."
                : "메인 화면으로 이동합니다."
            );
            setId("");
            setPassword("");
            navigation.navigate("StartupMain");
          } else {
            Alert.alert("오류", "유저 정보를 가져오는 데 실패했습니다.");
          }
        } else {
          Alert.alert("로그인 실패", "아이디 또는 비밀번호가 잘못되었습니다.");
        }
      } else {
        const errorText = await response.text();
        Alert.alert(
          "로그인 실패",
          errorText || "아이디 또는 비밀번호가 잘못되었습니다."
        );
      }
    } catch (error) {
      Alert.alert(
        "오류",
        `로그인 요청 중 문제가 발생했습니다: ${error.message}`
      );
    }
  };

  return (
    <LinearGradient colors={["#FFAF3E", "#FF6B6B"]} style={styles.container}>
      <Text style={styles.subtitle}>
        <Text style={styles.highlight}>청</Text>
        년들의 <Text style={styles.highlight}>창</Text>업 순간을{" "}
        <Text style={styles.highlight}>가</Text>
        능하게 하는 <Text style={styles.highlight}>련</Text>
        습장
      </Text>
      <Text style={styles.title}>청순가련</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your ID"
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
          placeholderTextColor="#ffffff99"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ffffff99"
        />
      </View>
      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => navigation.navigate("CheckIdScreen")}
          >
            <Text style={styles.subButtonText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.subButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#FF6B6B",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  highlight: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#FFCC00",
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row", // 버튼을 가로로 정렬
    justifyContent: "flex-end", // 오른쪽 정렬
    marginTop: 10,
    width: "100%", // 버튼 컨테이너 너비
  },
  subButton: {
    alignItems: "center",
    marginHorizontal: 10, // 버튼 간 간격 설정
  },
  subButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff99",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
