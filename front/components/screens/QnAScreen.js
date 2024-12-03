import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Header from "../common/Header";
import Footer from "../common/StartupFooter";

const QnAScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const QnAItem = ({ question, answer, isOpen = false }) => {
    const [expanded, setExpanded] = useState(isOpen);

    return (
      <View style={styles.qnaItem}>
        <TouchableOpacity
          style={styles.questionRow}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.questionText}>Q {question}</Text>
          <Icon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
        {expanded && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{answer}</Text>
          </View>
        )}
      </View>
    );
  };

  const handleSubmitQuestion = () => {
    // 여기에 질문 제출 로직 추가
    console.log("질문 제출:", { questionTitle, questionContent });
    setModalVisible(false);
    setQuestionTitle("");
    setQuestionContent("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="QnA" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="제목 검색"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.qnaList}>
        <QnAItem
          question="팝마스터에게 사자마자 실은대에 어떻게 하면 될나요?"
          answer="안녕하세요.\n\n저희 이용문 열린 상담으로 확인 사례에 따른 실천하였었습니다!\n메마한상자 아님을 보시게될 종보두 가능하니 당분 분리의 장되에속모양 좋습니다!"
          isOpen={true}
        />
        <QnAItem
          question="[공지] 청소/가격 서비스 정전 안내"
          answer="서비스 정전 안내입니다..."
        />
        <QnAItem
          question="[이벤트] 아머늘품 자현하기 이벤트"
          answer="이벤트 안내입니다..."
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.writeButtonText}>질문하기</Text>
        <Icon name="create-outline" size={16} color="#666" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>질문하기</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#050505" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder="제목을 입력하세요"
              value={questionTitle}
              onChangeText={setQuestionTitle}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="질문 내용을 입력하세요"
              multiline
              numberOfLines={10}
              value={questionContent}
              onChangeText={setQuestionContent}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitQuestion}
            >
              <Text style={styles.submitButtonText}>질문 등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    padding: 16,
    gap: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  searchButton: {
    backgroundColor: "#FF00FF",
    padding: 12,
    borderRadius: 4,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  qnaList: {
    flex: 1,
  },
  qnaItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
  },
  answerContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  answerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  writeButton: {
    position: "absolute",
    right: 16,
    bottom: 130,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FF00FF",
  },
  writeButtonText: {
    fontSize: 14,
    marginRight: 4,
  },
  writeButtonIcon: {
    width: 16,
    height: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    height: 200,
  },
  submitButton: {
    backgroundColor: "#FF00FF",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QnAScreen;
