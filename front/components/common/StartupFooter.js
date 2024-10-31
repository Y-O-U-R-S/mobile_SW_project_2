import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StartupFooter = () => {
  const navigation = useNavigation();
  const route = useRoute(); // 현재 활성화된 화면 정보 가져오기

  const isActive = (screenName) => route.name === screenName; // 활성화된 화면 체크

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartupMain")}
        style={styles.footerButton}
      >
        <Icon
          name="home-outline"
          size={35}
          color={isActive("StartupMain") ? "#4CAF50" : "#000"} // 활성화 색상
        />
        <Text
          style={[
            styles.footerText,
            isActive("StartupMain") && styles.activeText,
          ]}
        >
          홈
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SpaceRentalListScreen")}
        style={styles.footerButton}
      >
        <Icon
          name="domain"
          size={35}
          color={isActive("SpaceRentalListScreen") ? "#4CAF50" : "#000"}
        />
        <Text
          style={[
            styles.footerText,
            isActive("SpaceRentalListScreen") && styles.activeText,
          ]}
        >
          창업 공간
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("NearbyMarketInfo")}
        style={styles.footerButton}
      >
        <Icon
          name="chart-line"
          size={35}
          color={isActive("NearbyMarketInfo") ? "#4CAF50" : "#000"}
        />
        <Text
          style={[
            styles.footerText,
            isActive("NearbyMarketInfo") && styles.activeText,
          ]}
        >
          상권분석
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("StartupMyPage")}
        style={styles.footerButton}
      >
        <Icon
          name="account-box-outline"
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
    color: "#4CAF50",
  },
});

export default StartupFooter;
