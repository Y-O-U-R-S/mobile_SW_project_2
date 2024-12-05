import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, backButton = true }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {backButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightIcons}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 50,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    color: "#007bff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  rightIcons: {
    flexDirection: "row",
  },
});

export default Header;
