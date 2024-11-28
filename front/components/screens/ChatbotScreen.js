import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

const ChatbotScreen = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([]); // 메시지 리스트
  const [inputText, setInputText] = useState(""); // 입력 텍스트
  const animatedValue = useRef(new Animated.Value(0)).current; // 애니메이션 값

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (event) => handleKeyboardShow(event)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleKeyboardShow = (event) => {
    const keyboardHeight = event.endCoordinates.height - 110; // 키보드 높이에서 적정 오프셋 값 보정
    Animated.timing(animatedValue, {
      toValue: -keyboardHeight, // 키보드 높이만큼 위로 이동
      duration: Platform.OS === "ios" ? event.duration : 250,
      useNativeDriver: false,
    }).start();
  };

  const handleKeyboardHide = () => {
    Animated.timing(animatedValue, {
      toValue: 0, // 원래 위치로 복귀
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]); // 사용자 메시지 추가
    setInputText("");

    try {
      const response = await fetch("https://your-api-endpoint.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      const botReply = { sender: "bot", text: data.reply }; // 봇 응답 추가
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error:", error);
      const errorReply = {
        sender: "bot",
        text: "오류가 발생했습니다. 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animatedValue }] }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* 대화창 헤더 */}
          <View style={styles.header}>
            <Text style={styles.headerText}>챗봇</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* 메시지 리스트 */}
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMessage}
            contentContainerStyle={styles.messageList}
            inverted // 최신 메시지를 아래에서 위로 정렬
          />

          {/* 입력창 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="메시지를 입력하세요..."
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage} // 엔터키로 메시지 전송
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 110,
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E8E8E8",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatbotScreen;
