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

const CheckIdScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const baseUrl = useBaseUrl();

  const validateForm = () => {
    if (!email || !name) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleCheckId = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${baseUrl}/user/find-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: email, // id 필드를 이메일로 사용
          name: name,
        }),
      });

      if (response.ok) {
        Alert.alert(
          "인증이 완료되었습니다",
          "비밀번호 재설정 화면으로 이동합니다."
        );
        navigation.navigate("ResetPassword", { email });
      } else {
        const errorText = await response.text();
        Alert.alert(
          "사용자 인증 실패",
          errorText || "사용자 정보가 일치하지 않습니다."
        );
      }
    } catch (error) {
      Alert.alert(
        "오류",
        `사용자 인증 요청 중 문제가 발생했습니다: ${error.message}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>사용자 인증</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#999" // 대비 색상 추가
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          placeholderTextColor="#999" // 대비 색상 추가
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCheckId}>
          <Text style={styles.submitButtonText}>비밀번호 찾기</Text>
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
    color: "#000", // 입력 텍스트 색상 설정
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

export default CheckIdScreen;
