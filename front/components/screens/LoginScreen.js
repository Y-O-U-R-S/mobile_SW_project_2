import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { useBaseUrl } from "../../contexts/BaseUrlContext"; // useBaseUrl로 수정

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const baseUrl = useBaseUrl(); // baseUrl을 가져옴

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
    <View style={styles.container}>
      <Text style={styles.title}>청순가련</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FFCC00",
    width: "80%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#fff",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
