import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const PersonalInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="개인 정보 관리 페이지" />
      <Text style={styles.title}>개인정보</Text>
      <Text>사용자의 개인정보 관리 화면입니다.</Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PersonalInfoScreen;
