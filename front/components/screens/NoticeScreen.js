import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Header from "../common/Header";
import Footer from "../common/StartupFooter";
import NoticeModal from "../modals/NoticeModal";
import { UserContext } from "../../contexts/UserContext";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const NoticeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const { userInfo } = useContext(UserContext);

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = useBaseUrl();

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/notice`);
      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }
      const data = await response.json();
      setNotices(data);
      setFilteredNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [baseUrl]);

  const handleSearch = () => {
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNotices(filtered);
  };

  const handleSubmitNotice = async () => {
    const url = isEditMode
      ? `${baseUrl}/notice/${selectedNotice.id}`
      : `${baseUrl}/notice`;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: questionTitle,
          detail: questionContent,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const updatedNotice = await response.json();
        setNotices((prevNotices) =>
          isEditMode
            ? prevNotices.map((notice) =>
                notice.id === updatedNotice.id ? updatedNotice : notice
              )
            : [updatedNotice, ...prevNotices]
        );
        setFilteredNotices((prevFiltered) =>
          isEditMode
            ? prevFiltered.map((notice) =>
                notice.id === updatedNotice.id ? updatedNotice : notice
              )
            : [updatedNotice, ...prevFiltered]
        );
        Alert.alert(
          "성공",
          isEditMode
            ? "공지사항이 수정되었습니다."
            : "공지사항이 등록되었습니다."
        );
        resetModal();
      } else {
        Alert.alert("오류", "공지사항 등록/수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting notice:", error);
    }
  };

  const handleEditNotice = (notice) => {
    setSelectedNotice(notice);
    setQuestionTitle(notice.title);
    setQuestionContent(notice.detail);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleDeleteNotice = async (id) => {
    Alert.alert("확인", "공지사항을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`${baseUrl}/notice/${id}`, {
              method: "DELETE",
            });
            if (response.ok) {
              setNotices((prevNotices) =>
                prevNotices.filter((notice) => notice.id !== id)
              );
              setFilteredNotices((prevFiltered) =>
                prevFiltered.filter((notice) => notice.id !== id)
              );
              Alert.alert("성공", "공지사항이 삭제되었습니다.");
            } else {
              const errorText = await response.text();
              Alert.alert("오류", errorText || "공지사항 삭제에 실패했습니다.");
            }
          } catch (error) {
            console.error("Error deleting notice:", error);
          }
        },
      },
    ]);
  };

  const resetModal = () => {
    setModalVisible(false);
    setEditMode(false);
    setQuestionTitle("");
    setQuestionContent("");
    setSelectedNotice(null);
  };

  const QnAItem = ({ notice }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={styles.qnaItem}>
        <TouchableOpacity
          style={styles.questionRow}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.questionText}>{notice.title}</Text>
          <Icon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
        {expanded && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{notice.detail}</Text>
            {userInfo?.role === "admin" && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => handleEditNotice(notice)}
                >
                  <Icon name="create-outline" size={16} color="#fff" />
                  <Text style={styles.actionButtonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteNotice(notice.id)}
                >
                  <Icon name="trash-outline" size={16} color="#fff" />
                  <Text style={styles.actionButtonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="공지사항" backButton={true} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="제목 검색"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.qnaList}>
        {loading ? (
          <ActivityIndicator size="large" color="#F56A79" />
        ) : filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <QnAItem key={notice.id} notice={notice} />
          ))
        ) : (
          <Text style={styles.noData}>검색 결과가 없습니다.</Text>
        )}
      </ScrollView>

      {userInfo?.role === "admin" && (
        <TouchableOpacity
          style={styles.writeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.writeButtonText}>공지 등록</Text>
          <Icon name="create-outline" size={16} color="#666" />
        </TouchableOpacity>
      )}

      <NoticeModal
        visible={isModalVisible}
        onClose={resetModal}
        onSubmit={handleSubmitNotice}
        isEditMode={isEditMode}
        title={questionTitle}
        setTitle={setQuestionTitle}
        content={questionContent}
        setContent={setQuestionContent}
      />
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#F56A79",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
    color: "#000",
  },
  searchButton: {
    backgroundColor: "#F56A79",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  qnaList: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  qnaItem: {
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F56A79",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  answerContainer: {
    marginTop: 8,
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 8,
  },
  answerText: {
    fontSize: 14,
    color: "#555",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "45%",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  actionButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  writeButton: {
    position: "absolute",
    right: 16,
    bottom: 130,
    backgroundColor: "#F56A79",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  writeButtonText: {
    fontSize: 14,
    marginRight: 4,
    color: "#fff",
  },
});

export default NoticeScreen;
