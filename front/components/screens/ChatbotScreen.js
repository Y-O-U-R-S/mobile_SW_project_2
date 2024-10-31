import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const ChatbotScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>챗봇</Text>
      <Text>AI 챗봇을 통한 Q&A 서비스가 제공됩니다.</Text>
    </SafeAreaView>
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

export default ChatbotScreen;
