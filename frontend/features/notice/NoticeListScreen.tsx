import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

interface NoticeListScreenProps {
  onBack?: () => void;
  onNoticeClick?: (noticeId: number) => void;
}

const notices = [
  {
    id: 1,
    title: "마이레시피 서비스 이용약관 변경 안내",
    date: "2024.12.07",
    isImportant: true,
  },
  {
    id: 2,
    title: "12월 크리스마스 특별 레시피 이벤트",
    date: "2024.12.05",
    isImportant: false,
  },
  {
    id: 3,
    title: "앱 업데이트 안내 (v2.1.0)",
    date: "2024.12.03",
    isImportant: true,
  },
  {
    id: 4,
    title: "개인정보 처리방침 개정 안내",
    date: "2024.12.01",
    isImportant: false,
  },
  {
    id: 5,
    title: "서비스 점검 안내 (12월 10일)",
    date: "2024.11.28",
    isImportant: true,
  },
  {
    id: 6,
    title: "새로운 식단표 기능 추가 안내",
    date: "2024.11.25",
    isImportant: false,
  },
];

export function NoticeListScreen({ onBack, onNoticeClick }: NoticeListScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공지사항</Text>
      </View>

      {/* 메인 콘텐츠 */}
        <FlatList
          data={notices}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onNoticeClick?.(item.id)}
              style={styles.noticeItem}
            >
              <View style={styles.noticeRow}>
                {item.isImportant && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>중요</Text>
                  </View>
                )}
                <View style={styles.noticeTextContainer}>
                  <Text style={styles.noticeTitle}>{item.title}</Text>
                  <Text style={styles.noticeDate}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>공지사항이 없습니다.</Text>
            </View>
          }
        />
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
  listContent: {
      paddingBottom: 20,
  },
  noticeItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
  },
  noticeRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
  },
  badge: {
      backgroundColor: '#ef4444',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginTop: 2,
  },
  badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
  },
  noticeTextContainer: {
      flex: 1,
  },
  noticeTitle: {
      fontSize: 16,
      color: '#1f2937',
      marginBottom: 4,
  },
  noticeDate: {
      fontSize: 14,
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
});
