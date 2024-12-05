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
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();
  const { userInfo } = useContext(UserContext);
  const baseUrl = useBaseUrl();

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (event) => {
        handleKeyboardShow(event);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        handleKeyboardHide();
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    if (isVisible && userInfo?.email) {
      fetchMessages();
    }
  }, [isVisible]);

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

      if (!response.ok) {
        if (response.status === 404) {
          setMessages([{ question: "대화를 시작해보세요!", answer: "" }]);
          return;
        }
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        setMessages([{ question: "대화를 시작해보세요!", answer: "" }]);
      } else {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };
  const sendMessage = async () => {
    if (!inputText.trim()) return;
    if (messages[0]?.question === "대화를 시작해보세요!") {
      setMessages((prev) => prev.slice(1));
    }

    const newQuestion = { question: inputText, answer: "" };
    setMessages((prev) => [...prev, newQuestion]);
    setInputText("");
    setLoading(true);
    try {
      const chatbotResponse = await fetch("http:/192.168.10.15:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userInfo.email, message: inputText }),
      });

      const chatbotData = await chatbotResponse.json();
      const newAnswer = chatbotData.response;

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, answer: newAnswer } : msg
        )
      );

      await fetch(`${baseUrl}/chatbot/add`, {
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
    } catch (error) {
      console.error("Error:", error);

      const errorAnswer =
        error.message === "timeout"
          ? "챗봇 서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요."
          : "서버 오류입니다. 관리자에게 문의하세요.";

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, answer: errorAnswer } : msg
        )
      );

      await fetch(`${baseUrl}/chatbot/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          question: inputText,
          answer: errorAnswer,
          date: new Date().toISOString(),
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={[styles.messageBubble, styles.userBubble]}>
        <Text style={styles.messageText}>{item.question}</Text>
      </View>
      {item.answer ? (
        <View style={[styles.messageBubble, styles.botBubble]}>
          <Text style={styles.messageText}>{item.answer}</Text>
        </View>
      ) : loading && item.question === inputText ? (
        <View style={[styles.messageBubble, styles.botBubble]}>
          <Text style={styles.messageText}>로딩 중...</Text>
        </View>
      ) : null}
    </View>
  );

  const handleScrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    if (isVisible) {
      handleScrollToEnd();
    }
  }, [messages, isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animatedValue }] }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>청순가련 챗봇이</Text>
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
            scrollEnabled={true}
            onContentSizeChange={handleScrollToEnd}
            onLayout={handleScrollToEnd}
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
    backgroundColor: "#FF8A63",
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
    borderColor: "#FF8A63",
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
    backgroundColor: "#FF8A63",
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
