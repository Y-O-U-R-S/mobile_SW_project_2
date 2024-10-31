import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const NoticeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="공지사항 페이지" />
      <Text style={styles.title}>공지사항</Text>
      <Text style={styles.content}>여기에 공지사항이 표시됩니다.</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default NoticeScreen;
