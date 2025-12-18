import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Trash2, CheckSquare, Square } from 'lucide-react-native';

interface MyCommentsScreenProps {
  onBack?: () => void;
  onRecipeClick?: (recipeId: number) => void;
}

const myComments = [
  {
    id: 1,
    recipeId: 1,
    recipeTitle: "김치찌개",
    comment: "정말 맛있어 보이네요! 저도 한번 만들어봐야겠어요.",
    date: "2024.12.06",
    likes: 5,
  },
  {
    id: 2,
    recipeId: 2,
    recipeTitle: "된장찌개",
    comment: "된장은 어떤 브랜드 쓰시나요? 참고하고 싶어요!",
    date: "2024.12.05",
    likes: 3,
  },
  {
    id: 3,
    recipeId: 3,
    recipeTitle: "불고기",
    comment: "불고기 양념 비율이 딱 좋네요. 감사합니다!",
    date: "2024.12.04",
    likes: 8,
  },
];

export function MyCommentsScreen({ onBack, onRecipeClick }: MyCommentsScreenProps) {
  const [comments, setComments] = useState(myComments);
  const [selectedComments, setSelectedComments] = useState<number[]>([]);

  const toggleCommentSelection = (commentId: number) => {
    setSelectedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedComments.length === 0) {
      Alert.alert("알림", "삭제할 댓글을 선택해주세요.");
      return;
    }

    Alert.alert(
      "삭제 확인",
      `선택한 ${selectedComments.length}개의 댓글을 삭제하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            setComments((prev) => prev.filter((c) => !selectedComments.includes(c.id)));
            setSelectedComments([]);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 댓글</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.commentList}>
          {comments.map((item) => (
            <View key={item.id} style={styles.commentItem}>
              {/* 체크박스 */}
              <TouchableOpacity
                onPress={() => toggleCommentSelection(item.id)}
                style={styles.checkboxContainer}
              >
                {selectedComments.includes(item.id) ? (
                  <CheckSquare size={24} color="#000" />
                ) : (
                  <Square size={24} color="#d1d5db" />
                )}
              </TouchableOpacity>

              {/* 댓글 내용 */}
              <TouchableOpacity
                style={styles.commentContent}
                onPress={() => onRecipeClick?.(item.recipeId)}
              >
                <View style={styles.commentHeader}>
                    <Text style={styles.recipeTitle}>{item.recipeTitle}에 작성한 댓글</Text>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
                
                <View style={styles.commentMeta}>
                  <Text style={styles.metaText}>{item.date}</Text>
                  <Text style={styles.metaText}>❤️ {item.likes}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {comments.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>작성한 댓글이 없습니다.</Text>
          </View>
        )}
      </ScrollView>

      {/* 하단 고정 삭제 버튼 */}
      {selectedComments.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleDeleteSelected}
            style={styles.deleteButton}
          >
            <Trash2 size={20} color="white" />
            <Text style={styles.deleteButtonText}>선택한 댓글 삭제 ({selectedComments.length}개)</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
      padding: 4,
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
  },
  scrollContent: {
      padding: 16,
      paddingBottom: 100, // Space for footer
  },
  commentList: {
      gap: 16,
  },
  commentItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
  },
  checkboxContainer: {
      marginTop: 2,
  },
  commentContent: {
      flex: 1,
  },
  commentHeader: {
      marginBottom: 4,
  },
  recipeTitle: {
      fontSize: 14,
      color: '#4b5563',
  },
  commentText: {
      fontSize: 16,
      color: '#1f2937',
      marginBottom: 8,
  },
  commentMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  metaText: {
      fontSize: 12,
      color: '#6b7280',
  },
  emptyContainer: {
      padding: 80,
      alignItems: 'center',
  },
  emptyText: {
      color: '#6b7280',
      fontSize: 16,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      padding: 16,
  },
  deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: '#000',
      paddingVertical: 16,
      borderRadius: 12,
  },
  deleteButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
});
