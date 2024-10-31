import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute(); // 현재 활성화된 화면의 정보 가져오기

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.footerButton}
      >
        <Icon
          name="home"
          size={35}
          color={isActive("Main") ? "#4CAF50" : "#000"} // 활성화된 버튼 색상
        />
        <Text style={[styles.footerText, isActive("Main") && styles.activeText]}>
          홈
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Map")}
        style={styles.footerButton}
      >
        <Icon
          name="map-marker"
          size={35}
          color={isActive("Map") ? "#4CAF50" : "#000"}
        />
        <Text style={[styles.footerText, isActive("Map") && styles.activeText]}>
          지도
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("PopUpStore")}
        style={styles.footerButton}
      >
        <Icon
          name="store"
          size={35}
          color={isActive("PopUpStore") ? "#4CAF50" : "#000"}
        />
        <Text
          style={[
            styles.footerText,
            isActive("PopUpStore") && styles.activeText,
          ]}
        >
          팝업 스토어
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("MyPage")}
        style={styles.footerButton}
      >
        <Icon
          name="account-cog-outline"
          size={35}
          color={isActive("MyPage") ? "#4CAF50" : "#000"}
        />
        <Text
          style={[styles.footerText, isActive("MyPage") && styles.activeText]}
        >
          마이페이지
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#000",
    marginTop: 4,
    fontWeight: "bold",
  },
  activeText: {
    color: "#4CAF50", // 활성화된 버튼의 텍스트 색상
  },
});

export default Footer;
