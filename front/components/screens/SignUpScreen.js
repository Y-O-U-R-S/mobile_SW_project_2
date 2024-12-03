import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");

  const baseUrl = useBaseUrl(); // useBaseUrl 훅 호출

  const validateForm = () => {
    if (
      !id ||
      !password ||
      !confirmPassword ||
      !name ||
      !phone ||
      !birth ||
      !address ||
      !job
    ) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${baseUrl}/user`, { // baseUrl 사용
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password,
          name,
          email: id, // 이메일과 아이디를 동일하게 설정
          phone,
          birth,
          address,
          job,
        }),
      });

      if (response.ok) {
        Alert.alert("회원가입 성공", "로그인 화면으로 이동합니다.");
        navigation.navigate("Login");
      } else {
        const errorText = await response.text();
        Alert.alert(
          "회원가입 실패",
          errorText || "회원가입 중 문제가 발생했습니다."
        );
      }
    } catch (error) {
      Alert.alert(
        "오류",
        `회원가입 요청 중 문제가 발생했습니다: ${error.message}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>회원가입</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="아이디(이메일)"
          value={id}
          onChangeText={setId}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="생년월일 (YYYY-MM-DD)"
          value={birth}
          onChangeText={setBirth}
        />
        <TextInput
          style={styles.input}
          placeholder="주소"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="직업"
          value={job}
          onChangeText={setJob}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
          <Text style={styles.submitButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    fontSize: 24,
    color: "#F56A79",
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F56A79",
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#F56A79",
    fontSize: 20,
    paddingVertical: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#F56A79",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
