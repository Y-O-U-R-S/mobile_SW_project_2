import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Header from "../common/Header";

const EditProfile = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    // 저장 로직 추가
    setShowModal(true); // 모달 열기
  };

  const closeModal = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="개인정보 수정" />
      <View style={styles.container}>
        {/* 이메일 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>아이디(이메일)</Text>
          <TextInput
            style={styles.inputDisabled}
            value="example@email.com"
            editable={false} // 이메일은 수정 불가
          />
        </View>

        {/* 비밀번호 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
        </View>

        {/* 휴대폰 번호 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>휴대폰 번호</Text>
          <TextInput
            style={styles.input}
            placeholder="휴대폰 번호를 입력하세요"
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
        </View>

        {/* 직업 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>직업</Text>
          <TextInput
            style={styles.input}
            placeholder="직업을 입력하세요"
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
        </View>

        {/* 이름 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
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
    backgroundColor: "#fff", // 입력 배경색 흰색으로 설정
    color: "#333",
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#f0f0f0", // 비활성화된 입력 필드 배경색
    color: "#888",
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 30,
    backgroundColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 14,
    color: "#333",
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
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default EditProfile;
