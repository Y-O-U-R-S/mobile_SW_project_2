import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ title, backButton = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {backButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={24} color="#007bff" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center", // 세로 정렬
    justifyContent: "center", // 가로 중앙 정렬
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // 헤더 전체 높이를 버튼 클릭 영역으로
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Header;
