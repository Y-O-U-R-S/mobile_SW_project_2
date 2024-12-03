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
import NoticeModal from "../modals/NoticeModal"; // NoticeModal import
import { UserContext } from "../../contexts/UserContext"; // UserContext import

const NoticeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const { userInfo } = useContext(UserContext);

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://192.168.0.74:8000/notice");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleSubmitNotice = async () => {
    const url = isEditMode
      ? `http://10.20.39.17:8000/notice/${selectedNotice.id}`
      : "http://10.20.39.17:8000/notice";
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
        Alert.alert(
          "성공",
          isEditMode
            ? "공지사항이 수정되었습니다."
            : "공지사항이 등록되었습니다."
        );
        setModalVisible(false);
        setQuestionTitle("");
        setQuestionContent("");
        setSelectedNotice(null);
        setEditMode(false);
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
            const response = await fetch(
              `http://10.20.39.17:8000/notice/${id}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) {
              setNotices((prevNotices) =>
                prevNotices.filter((notice) => notice.id !== id)
              );
              Alert.alert("성공", "공지사항이 삭제되었습니다.");
            } else {
              Alert.alert("오류", "공지사항 삭제에 실패했습니다.");
            }
          } catch (error) {
            console.error("Error deleting notice:", error);
          }
        },
      },
    ]);
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
                  style={styles.editButton}
                  onPress={() => handleEditNotice(notice)}
                >
                  <Text style={styles.actionButtonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteNotice(notice.id)}
                >
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
      <Header title="공지사항" />
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
        {loading ? (
          <ActivityIndicator size="large" color="#FF00FF" />
        ) : notices.length > 0 ? (
          notices.map((notice) => <QnAItem key={notice.id} notice={notice} />)
        ) : (
          <Text style={styles.noData}>등록된 공지사항이 없습니다.</Text>
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
        onClose={() => {
          setModalVisible(false);
          setEditMode(false);
          setQuestionTitle("");
          setQuestionContent("");
        }}
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
});

export default NoticeScreen;
