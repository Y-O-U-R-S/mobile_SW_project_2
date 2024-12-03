import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Header from "../common/Header";
import { UserContext } from "../../contexts/UserContext";

const EditProfile = ({ navigation }) => {
  const { userInfo, setUserInfo } = useContext(UserContext); // UserContext 사용
  const [formData, setFormData] = useState({
    email: userInfo?.email || "",
    password: "",
    phone: userInfo?.phone || "",
    job: userInfo?.job || "",
    name: userInfo?.name || "",
  });
  const [currentPassword, setCurrentPassword] = useState(""); // 현재 비밀번호 입력
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    if (!currentPassword) {
      Alert.alert("오류", "현재 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 서버에 현재 비밀번호 확인 요청
      const authResponse = await fetch(
        `http://10.20.39.17:8000/user/login`, // 로그인 인증 요청
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userInfo.id,
            password: currentPassword, // 입력된 현재 비밀번호
          }),
        }
      );

      if (!authResponse.ok) {
        Alert.alert("오류", "현재 비밀번호가 올바르지 않습니다.");
        return;
      }

      // 비밀번호가 맞다면 프로필 수정 요청
      const response = await fetch(
        `http://10.20.39.17:8000/user/${userInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            id: userInfo.id, // ID는 변경되지 않도록
            birth: userInfo.birth, // 생일은 기존 값 유지
            address: userInfo.address, // 주소는 기존 값 유지
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUserInfo(updatedUser); // UserContext 업데이트
        setShowModal(true); // 수정 완료 모달 열기
      } else {
        const errorText = await response.text();
        Alert.alert("오류", errorText || "프로필 수정에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert(
        "오류",
        `프로필 수정 중 문제가 발생했습니다: ${error.message}`
      );
    }
  };

  const closeModal = () => {
    setShowModal(false); // 모달 닫기
    navigation.goBack(); // 이전 화면으로 이동
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="개인정보 수정" />
      <View style={styles.container}>
        {/* 이메일 (수정 불가) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>아이디(이메일)</Text>
          <TextInput
            style={styles.inputDisabled}
            value={formData.email}
            editable={false} // 이메일은 수정 불가
          />
        </View>

        {/* 현재 비밀번호 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>현재 비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="현재 비밀번호를 입력하세요"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>

        {/* 비밀번호 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>새 비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호를 입력하세요"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>

        {/* 휴대폰 번호 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>휴대폰 번호</Text>
          <TextInput
            style={styles.input}
            placeholder="휴대폰 번호를 입력하세요"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
          />
        </View>

        {/* 직업 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>직업</Text>
          <TextInput
            style={styles.input}
            placeholder="직업을 입력하세요"
            value={formData.job}
            onChangeText={(text) => handleInputChange("job", text)}
          />
        </View>

        {/* 이름 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>수정</Text>
        </TouchableOpacity>
      </View>

      {/* 수정 완료 모달 */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>수정이 완료되었습니다.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  inputContainer: {
    marginBottom: 15,
    position: "relative",
  },
  label: {
    fontSize: 16,
    color: "#FF6B6B",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#333",
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#f0f0f0",
    color: "#888",
  },
  saveButton: {
    backgroundColor: "orange",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 16, color: "#333", marginBottom: 15 },
  modalButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});

export default EditProfile;
