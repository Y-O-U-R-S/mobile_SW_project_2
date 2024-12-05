import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NoticeModal = ({
  visible,
  onClose,
  onSubmit,
  isEditMode,
  title,
  setTitle,
  content,
  setContent,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isEditMode ? "공지 수정" : "공지 등록"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#050505" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.titleInput}
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.contentInput}
            placeholder="공지 내용을 입력하세요"
            multiline
            numberOfLines={10}
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>
              {isEditMode ? "수정 완료" : "등록 완료"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    height: 200,
  },
  submitButton: {
    backgroundColor: "#FF00FF",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NoticeModal;