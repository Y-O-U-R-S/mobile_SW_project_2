import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const ResetPassword = ({ route, navigation }) => {
    const { email } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const baseUrl = useBaseUrl();

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/user/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });

            if (response.ok) {
                Alert.alert("성공", "비밀번호가 성공적으로 재설정되었습니다.", [
                    { text: "확인", onPress: () => navigation.navigate('Login') }
                ]);
            } else {
                const errorText = await response.text();
                Alert.alert("실패", errorText || "비밀번호 재설정에 실패했습니다.");
            }
        } catch (error) {
            Alert.alert("오류", "비밀번호 재설정 중 오류가 발생했습니다.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>＜</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>비밀번호 재설정</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="새 비밀번호"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호 확인"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleResetPassword}>
                    <Text style={styles.submitButtonText}>비밀번호 재설정</Text>
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

export default ResetPassword;
