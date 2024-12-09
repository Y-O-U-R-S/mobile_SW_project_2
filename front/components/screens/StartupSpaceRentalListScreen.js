import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Header from "../common/Header";
import Footer from "../common/StartupFooter";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { UserContext } from "../../contexts/UserContext";
import RegisterSpaceModal from "../modals/RegisterSpaceModal";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import ChatbotScreen from "./ChatbotScreen";

const SpaceRentalListScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(UserContext);
  const [rentalSpaces, setRentalSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = useBaseUrl(); // useBaseUrl 호출하여 baseUrl 가져오기

  // 모달 상태 및 입력 데이터
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    price: "",
    contactNumber: "",
    address: "",
    description: "",
    imageUrl: null, // 이미지 데이터 추가
    distanceFromOnyangStation: "",
  });

  useEffect(() => {
    const fetchRentalSpaces = async () => {
      try {
        const response = await fetch(`${baseUrl}/rentalSpaces`); // baseUrl 사용
        if (!response.ok) {
          throw new Error("Failed to fetch rental spaces");
        }
        const data = await response.json();
        setRentalSpaces(data);
      } catch (error) {
        console.error("Error fetching rental spaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalSpaces();
  }, [baseUrl]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="청순가련" />
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6B6B" />
        ) : rentalSpaces.length > 0 ? (
          rentalSpaces.map((space) => (
            <TouchableOpacity
              key={space.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("SpaceRentalDetailScreen", { space })
              }
            >
              <Image source={{ uri: space.imageUrl }} style={styles.image} />
              <View style={styles.content}>
                <Text style={styles.cardTitle}>{space.name}</Text>
                <Text style={styles.location}>{space.address}</Text>
                <Text style={styles.description}>{space.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noData}>등록된 공간이 없습니다.</Text>
        )}
      </ScrollView>
      {userInfo?.role === "admin" && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addButtonText}>공간 등록</Text>
        </TouchableOpacity>
      )}
      <RegisterSpaceModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        fetchRentalSpaces={async () => {
          try {
            const response = await fetch(`${baseUrl}/rentalSpaces`); // baseUrl 사용
            if (!response.ok) {
              throw new Error("Failed to fetch rental spaces");
            }
            const data = await response.json();
            setRentalSpaces(data);
          } catch (error) {
            console.error("Error fetching rental spaces:", error);
          } finally {
            setLoading(false);
          }
        }} // 새로고침 함수 전달
      />
      <ChatbotScreen />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { marginTop: 10, paddingHorizontal: 20 },
  addButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#FF6B6B",
    borderRadius: 50,
    padding: 15,
    elevation: 5, // 그림자 효과
  },
  addButtonText: {
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
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
  selectImageButtonText: { color: "#fff", textAlign: "center" },
  previewImage: { width: "100%", height: 150, marginTop: 10 },
  saveButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", textAlign: "center" },
  cancelButton: { marginTop: 10 },
  cancelButtonText: { textAlign: "center", color: "#FF6B6B" },
  card: {
    backgroundColor: "#FFF8F0",
    borderRadius: 15,
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  noData: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default SpaceRentalListScreen;
