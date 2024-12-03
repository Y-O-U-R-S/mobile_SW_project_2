import React, { useState, useEffect, useRef, useContext } from "react";
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
import { UserContext } from "../../contexts/UserContext";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const ChatbotScreen = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([]); // 메시지 리스트
  const [inputText, setInputText] = useState(""); // 입력 텍스트
  const animatedValue = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();
  const { userInfo } = useContext(UserContext); // 로그인된 유저 정보 가져오기
  const baseUrl = useBaseUrl(); // baseUrl을 가져옴

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

  useEffect(() => {
    if (userInfo?.email) {
      fetchMessages(); // 로그인된 유저 이메일로 메시지를 가져옴
    }
  }, [userInfo]);

  const handleKeyboardShow = (event) => {
    const keyboardHeight = event.endCoordinates.height - 110;
    Animated.timing(animatedValue, {
      toValue: -keyboardHeight,
      duration: Platform.OS === "ios" ? event.duration : 250,
      useNativeDriver: false,
    }).start();
  };

  const handleKeyboardHide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/chatbot/email/${userInfo.email}`
      );
      const data = await response.json();
      setMessages(data); // 서버에서 가져온 질문/답변 리스트
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newQuestion = { question: inputText, answer: "" }; // 새로운 질문
    setMessages((prev) => [...prev, newQuestion]); // 질문 추가
    setInputText("");

    try {
      // 챗봇 서버로 질문 전송
      const chatbotResponse = await fetch("http://10.20.32.209:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userInfo.email, message: inputText }),
      });

      const chatbotData = await chatbotResponse.json();

      const newAnswer = chatbotData.response;
      const updatedMessage = { question: inputText, answer: newAnswer };

      // DB에 질문/답변 저장
      await fetch(`${baseUrl}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          question: inputText,
          answer: newAnswer,
          date: new Date().toISOString(),
        }),
      });

      // UI 업데이트
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? updatedMessage : msg
        )
      );
      fetchMessages(); // 최신 메시지 가져오기
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      {/* 질문 */}
      <View style={[styles.messageBubble, styles.userBubble]}>
        <Text style={styles.messageText}>{item.question}</Text>
      </View>
      {/* 답변 */}
      {item.answer ? (
        <View style={[styles.messageBubble, styles.botBubble]}>
          <Text style={styles.messageText}>{item.answer}</Text>
        </View>
      ) : null}
    </View>
  );

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animatedValue }] }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>챗봇</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMessage}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="메시지를 입력하세요..."
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
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
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
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
