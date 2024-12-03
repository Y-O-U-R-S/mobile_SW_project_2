import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RegisterSpaceModal = ({
  visible,
  onClose,
  formData,
  handleInputChange,
  handleSelectImage,
  handleRegisterSpace,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>공간 등록</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* 필드 입력 */}
          <TextInput
            style={styles.input}
            placeholder="공간 이름"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="면적 (평수)"
            value={formData.area}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("area", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="가격 (월)"
            value={formData.price}
            onChangeText={(text) => handleInputChange("price", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="연락처"
            value={formData.contactNumber}
            onChangeText={(text) => handleInputChange("contactNumber", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="주소"
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="설명"
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="온양온천역에서의 거리 (분)"
            keyboardType="numeric"
            value={formData.distanceFromOnyangStation}
            onChangeText={(text) =>
              handleInputChange("distanceFromOnyangStation", text)
            }
          />

          {/* 이미지 선택 */}
          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={handleSelectImage}
          >
            <Text style={styles.selectImageButtonText}>이미지 선택</Text>
          </TouchableOpacity>
          {formData.imageUrl && (
            <Image
              source={{ uri: formData.imageUrl }}
              style={styles.previewImage}
            />
          )}

          {/* 버튼 */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleRegisterSpace}
          >
            <Text style={styles.saveButtonText}>등록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
    padding: 10,
  },
  selectImageButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectImageButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  previewImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: "center",
    color: "#FF6B6B",
  },
});

export default RegisterSpaceModal;
