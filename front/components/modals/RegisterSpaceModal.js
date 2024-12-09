import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const RegisterSpaceModal = ({
  visible,
  onClose,
  formData,
  handleInputChange,
  fetchRentalSpaces, // API 호출 후 데이터를 새로 고침
}) => {
  const baseUrl = useBaseUrl(); // baseUrl을 가져옴

  const handleResetForm = () => {
    handleInputChange("name", "");
    handleInputChange("area", "");
    handleInputChange("price", "");
    handleInputChange("contactNumber", "");
    handleInputChange("address", "");
    handleInputChange("description", "");
    handleInputChange("distanceFromOnyangStation", "");
    handleInputChange("imageUrl", "");
  };

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "권한 필요",
        "사진 라이브러리에 접근하려면 권한이 필요합니다."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange("imageUrl", result.assets[0].uri);
    }
  };

  const handleRegisterSpace = async () => {
    const numberRegex = /^\d+$/;
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!formData.name) {
      Alert.alert("오류", "공간 이름을 입력하세요.");
      return;
    }

    if (!formData.area || !numberRegex.test(formData.area)) {
      Alert.alert("오류", "면적(숫자) 값을 올바르게 입력하세요.");
      return;
    }

    if (!formData.price || !numberRegex.test(formData.price)) {
      Alert.alert("오류", "가격(숫자) 값을 올바르게 입력하세요.");
      return;
    }

    if (!formData.contactNumber || !phoneRegex.test(formData.contactNumber)) {
      Alert.alert("오류", "올바른 연락처를 입력하세요. (10-11자리 숫자)");
      return;
    }

    if (!formData.address) {
      Alert.alert("오류", "주소를 입력하세요.");
      return;
    }

    if (!formData.description) {
      Alert.alert("오류", "공간 설명을 입력하세요.");
      return;
    }

    if (
      !formData.distanceFromOnyangStation ||
      !numberRegex.test(formData.distanceFromOnyangStation)
    ) {
      Alert.alert("오류", "온양온천역에서의 거리(숫자)를 입력하세요.");
      return;
    }

    if (!formData.imageUrl) {
      Alert.alert("오류", "이미지를 선택하세요.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("area", formData.area);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("contact_Number", formData.contactNumber);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append(
      "distance_From_Onyang_Station",
      formData.distanceFromOnyangStation
    );
    formDataToSubmit.append("imageUrl", {
      uri: formData.imageUrl,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(`${baseUrl}/rentalSpaces`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formDataToSubmit,
      });

      if (response.ok) {
        Alert.alert("성공", "공간이 성공적으로 등록되었습니다.");
        if (typeof fetchRentalSpaces === "function") {
          await fetchRentalSpaces();
        }
        handleResetForm();
        onClose();
      } else {
        const errorData = await response.text();
        Alert.alert("오류", `등록 실패: ${errorData}`);
      }
    } catch (error) {
      console.error("Error registering space:", error);
      Alert.alert("오류", "서버 요청 중 문제가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    handleResetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>공간 등록</Text>
              <TouchableOpacity onPress={handleCancel}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="공간 이름"
                placeholderTextColor="#666"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="면적 (평수)"
                placeholderTextColor="#666"
                value={formData.area}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("area", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="가격 (월)"
                placeholderTextColor="#666"
                value={formData.price}
                onChangeText={(text) => handleInputChange("price", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="연락처"
                placeholderTextColor="#666"
                value={formData.contactNumber}
                onChangeText={(text) =>
                  handleInputChange("contactNumber", text)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="주소"
                placeholderTextColor="#666"
                value={formData.address}
                onChangeText={(text) => handleInputChange("address", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="설명"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => handleInputChange("description", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="온양온천역에서의 거리 (분)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.distanceFromOnyangStation}
                onChangeText={(text) =>
                  handleInputChange("distanceFromOnyangStation", text)
                }
              />
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
            </ScrollView>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleRegisterSpace}
            >
              <Text style={styles.saveButtonText}>등록</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    maxHeight: "90%",
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
