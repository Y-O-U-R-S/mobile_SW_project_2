import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import LoginScreen from "./components/screens/LoginScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import StartupMainScreen from "./components/screens/StartupMainScreen";
import SpaceRentalDetailScreen from "./components/screens/StartupSpaceRentalDetailScreen";
import NearbyMarketInfoScreen from "./components/screens/StartupNearbyMarketInfoScreen";
import ChatbotScreen from "./components/screens/ChatbotScreen";
import PersonalInfoScreen from "./components/screens/PersonalInfoScreen";
import SpaceRentalListScreen from "./components/screens/StartupSpaceRentalListScreen";
import StartupMyPageScreen from "./components/screens/StartupMyPageScreen";
import NoticeScreen from "./components/screens/NoticeScreen";
import EditProfile from "./components/screens/EditProfile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
        >
          <Stack.Screen name="StartupMain" component={StartupMainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
            name="SpaceRentalDetailScreen"
            component={SpaceRentalDetailScreen}
          />
          <Stack.Screen
            name="NearbyMarketInfo"
            component={NearbyMarketInfoScreen}
          />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen
            name="SpaceRentalListScreen"
            component={SpaceRentalListScreen}
          />
          <Stack.Screen name="StartupMyPage" component={StartupMyPageScreen} />
          <Stack.Screen name="Notice" component={NoticeScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
