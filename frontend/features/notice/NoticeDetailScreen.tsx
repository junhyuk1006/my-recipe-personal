import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronUp, ChevronDown, List } from 'lucide-react-native';

interface NoticeDetailScreenProps {
  noticeId: number;
  onBack?: () => void;
  onNoticeClick?: (noticeId: number) => void;
}

const noticeData: Record<number, { title: string; date: string; content: string }> = {
  1: {
    title: "마이레시피 서비스 이용약관 변경 안내",
    date: "2024.12.07",
    content: `안녕하세요, 마이레시피입니다.

서비스 이용약관이 2024년 12월 15일부터 변경됩니다.

주요 변경 사항은 다음과 같습니다:

1. 개인정보 수집 및 이용 항목 추가
   - 서비스 개선을 위한 사용자 행동 패턴 분석

2. 레시피 저작권 관련 조항 명확화
   - 사용자가 업로드한 레시피의 저작권은 사용자에게 있습니다
   - 단, 서비스 내에서 공유 목적으로 사용될 수 있습니다

3. 부적절한 콘텐츠 신고 및 제재 기준 강화

자세한 내용은 [이용약관] 메뉴에서 확인하실 수 있습니다.

감사합니다.`,
  },
  2: {
    title: "12월 크리스마스 특별 레시피 이벤트",
    date: "2024.12.05",
    content: `🎄 크리스마스 특별 레시피 이벤트 🎄

다가오는 크리스마스를 맞이하여 특별 이벤트를 진행합니다!

📅 이벤트 기간: 12월 5일 ~ 12월 25일

🎁 참여 방법:
1. 크리스마스 관련 레시피 작성
2. 해시태그 #마이레시피크리스마스 추가
3. 레시피 사진 필수 첨부

🏆 시상 내역:
- 최우수상 (1명): 스타벅스 5만원 상품권
- 우수상 (3명): 베이킹 도구 세트
- 참여상 (추첨 20명): 모바일 커피 쿠폰

여러분의 많은 참여 부탁드립니다!`,
  },
  3: {
    title: "앱 업데이트 안내 (v2.1.0)",
    date: "2024.12.03",
    content: `마이레시피 v2.1.0 업데이트가 완료되었습니다.

✨ 새로운 기능
- 식단표 기능 추가
- 냉장고 재료 관리 기능 개선
- 레시피 북마크 기능 추가

🔧 개선 사항
- 검색 속도 개선
- 이미지 로딩 속도 최적화
- 댓글 작성 UX 개선

🐛 버그 수정
- 특정 상황에서 앱이 종료되는 문제 수정
- 프로필 사진 업로드 오류 수정

앱스토어에서 업데이트해주세요!`,
  },
  4: {
    title: "개인정보 처리방침 개정 안내",
    date: "2024.12.01",
    content: `개인정보 처리방침이 개정되었습니다.

주요 변경 내용:

1. 개인정보의 수집 및 이용 목적 명확화
2. 개인정보 보유 및 이용 기간 변경
3. 개인정보 파기 절차 및 방법 구체화
4. 정보주체의 권리 및 행사 방법 추가

개정된 개인정보 처리방침은 2024년 12월 1일부터 시행됩니다.

자세한 내용은 설정 > 개인정보 처리방침에서 확인하실 수 있습니다.`,
  },
  5: {
    title: "서비스 점검 안내 (12월 10일)",
    date: "2024.11.28",
    content: `서비스 안정화 및 성능 개선을 위한 정기 점검을 실시합니다.

📅 점검 일시: 2024년 12월 10일 (화) 오전 2시 ~ 6시 (4시간)

🔧 점검 내용:
- 서버 안정화 작업
- 데이터베이스 최적화
- 보안 패치 적용

점검 시간 동안 서비스 이용이 일시적으로 중단될 수 있습니다.
이용에 불편을 드려 죄송합니다.

감사합니다.`,
  },
  6: {
    title: "새로운 식단표 기능 추가 안내",
    date: "2024.11.25",
    content: `식단표 기능이 새롭게 추가되었습니다!

📋 주요 기능:
- 월별 캘린더 형태로 식단 관리
- 아침, 점심, 저녁 식단 개별 등록
- 레시피와 연동하여 간편하게 식단 등록
- 날짜별 영양 정보 확인

💡 사용 방법:
1. 하단 네비게이션의 '식단표' 탭 클릭
2. 날짜 선택 후 식단 추가 버튼 클릭
3. 식사 시간과 메뉴 입력

여러분의 건강한 식단 관리를 응원합니다!`,
  },
};

export function NoticeDetailScreen({ noticeId, onBack, onNoticeClick }: NoticeDetailScreenProps) {
  const notice = noticeData[noticeId];
  
  // 이전글/다음글 계산
  const prevNoticeId = noticeId < 6 ? noticeId + 1 : null;
  const nextNoticeId = noticeId > 1 ? noticeId - 1 : null;
  const prevNotice = prevNoticeId ? noticeData[prevNoticeId] : null;
  const nextNotice = nextNoticeId ? noticeData[nextNoticeId] : null;

  if (!notice) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ChevronLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>공지사항</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>공지사항을 찾을 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공지사항</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 제목 */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{notice.title}</Text>
          <Text style={styles.date}>{notice.date}</Text>
        </View>

        {/* 내용 */}
        <View style={styles.contentSection}>
          <Text style={styles.contentText}>
            {notice.content}
          </Text>
        </View>

        {/* 목록보기 버튼 */}
        <TouchableOpacity
            onPress={onBack}
            style={styles.listButton}
        >
            <List size={20} color="#374151" />
            <Text style={styles.listButtonText}>목록보기</Text>
        </TouchableOpacity>

        {/* 이전글/다음글 */}
        <View style={styles.navigationSection}>
          {nextNotice && (
            <TouchableOpacity
              onPress={() => onNoticeClick?.(nextNoticeId!)}
              style={styles.navButton}
            >
              <ChevronUp size={20} color="#6b7280" />
              <View style={styles.navContent}>
                <Text style={styles.navLabel}>다음글</Text>
                <Text style={styles.navTitle} numberOfLines={1}>{nextNotice.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          {prevNotice && (
            <TouchableOpacity
              onPress={() => onNoticeClick?.(prevNoticeId!)}
              style={[styles.navButton, nextNotice && styles.borderTop]}
            >
              <ChevronDown size={20} color="#6b7280" />
              <View style={styles.navContent}>
                <Text style={styles.navLabel}>이전글</Text>
                <Text style={styles.navTitle} numberOfLines={1}>{prevNotice.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
      paddingBottom: 40,
  },
  titleSection: {
      marginBottom: 24,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 12,
  },
  date: {
      fontSize: 14,
      color: '#6b7280',
  },
  contentSection: {
      marginBottom: 32,
  },
  contentText: {
      fontSize: 16,
      color: '#1f2937',
      lineHeight: 24,
  },
  listButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 8,
      marginBottom: 24,
      backgroundColor: '#fff',
  },
  listButtonText: {
      color: '#374151',
      fontSize: 16,
      fontWeight: '500',
  },
  navigationSection: {
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      paddingTop: 16,
  },
  navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 16,
      paddingHorizontal: 8,
  },
  borderTop: {
      borderTopWidth: 1,
      borderTopColor: '#f3f4f6', // Separator between next/prev
  },
  navContent: {
      flex: 1,
  },
  navLabel: {
      fontSize: 12,
      color: '#6b7280',
      marginBottom: 4,
  },
  navTitle: {
      fontSize: 14,
      color: '#1f2937',
  },
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  emptyText: {
      color: '#6b7280',
      fontSize: 16,
  },
});
