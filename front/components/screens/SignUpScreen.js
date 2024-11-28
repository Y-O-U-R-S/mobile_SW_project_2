import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SignUpScreen = ({ navigation }) => {
  const [openYear, setOpenYear] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [openDay, setOpenDay] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [job, setJob] = useState("");
  const [birthYear, setBirthYear] = useState("2001");
  const [birthMonth, setBirthMonth] = useState("02");
  const [birthDay, setBirthDay] = useState("28");

  const years = Array.from({ length: 100 }, (_, i) => ({
    label: (2024 - i).toString(),
    value: (2024 - i).toString(),
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: (i + 1).toString().padStart(2, "0"),
    value: (i + 1).toString().padStart(2, "0"),
  }));
  const days = Array.from({ length: 31 }, (_, i) => ({
    label: (i + 1).toString().padStart(2, "0"),
    value: (i + 1).toString().padStart(2, "0"),
  }));

  const validateForm = () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !phoneNumber ||
      !job
    ) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // 회원가입 완료 후 로그인 화면으로 이동
      Alert.alert("회원가입 성공", "회원가입이 완료되었습니다.");
      navigation.navigate("Login"); // 'Login' 또는 메인 화면 'Main'으로 이동
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>회원가입</Text>
      </View>

      <View style={styles.form}>
        {/* 이메일 입력 */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="아이디(이메일)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.duplicateCheckButton}>
            <Text style={styles.duplicateCheckText}>중복확인</Text>
          </TouchableOpacity>
        </View>

        {/* 비밀번호 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* 이름 */}
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />

        {/* 전화번호 */}
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        {/* 생년월일 */}
        <Text style={styles.label}>생년월일</Text>
        <View style={styles.row}>
          <DropDownPicker
            open={openYear}
            value={birthYear}
            items={years}
            setOpen={setOpenYear}
            setValue={setBirthYear}
            placeholder="연도"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownContainerStyle={styles.dropdownList}
          />
          <DropDownPicker
            open={openMonth}
            value={birthMonth}
            items={months}
            setOpen={setOpenMonth}
            setValue={setBirthMonth}
            placeholder="월"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownContainerStyle={styles.dropdownList}
          />
          <DropDownPicker
            open={openDay}
            value={birthDay}
            items={days}
            setOpen={setOpenDay}
            setValue={setBirthDay}
            placeholder="일"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownContainerStyle={styles.dropdownList}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
          <Text style={styles.submitButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    fontSize: 24,
    color: "#F56A79",
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F56A79",
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#F56A79",
    fontSize: 20,
    paddingVertical: 8,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  duplicateCheckButton: {
    backgroundColor: "#F56A79",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  duplicateCheckText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dropdown: {
    borderColor: "#F56A79",
    borderRadius: 5,
    height: 40,
  },
  dropdownContainer: {
    width: "30%",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderColor: "#F56A79",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#F56A79",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
