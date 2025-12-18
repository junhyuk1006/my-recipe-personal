import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Instagram, Globe, CheckCircle, Clock } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface InfluencerRegisterScreenProps {
  onBack?: () => void;
}

type PlatformType = "instagram" | "blog" | null;
type ApplicationStatus = "pending" | "approved" | "rejected" | null;

export function InfluencerRegisterScreen({ onBack }: InfluencerRegisterScreenProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>(null);
  const [accountInput, setAccountInput] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(null);
  const [applicationDate, setApplicationDate] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedPlatform) {
      Alert.alert("알림", "플랫폼을 선택해주세요.");
      return;
    }
    
    if (!accountInput.trim()) {
      Alert.alert("알림", "계정 정보를 입력해주세요.");
      return;
    }

    // 신청 처리
    setApplicationStatus("pending");
    setApplicationDate(new Date().toLocaleDateString("ko-KR"));
    Alert.alert("성공", "인플루언서 신청이 완료되었습니다!\n검토까지 1-3일 소요됩니다.");
  };

  const getStatusBadge = () => {
    if (!applicationStatus) return null;

    const statusConfig = {
      pending: {
        icon: Clock,
        text: "심사중",
        color: "#ca8a04", // yellow-700
        bgColor: "#fefce8", // yellow-100
        borderColor: "#fef08a", // yellow-200
      },
      approved: {
        icon: CheckCircle,
        text: "승인됨",
        color: "#15803d", // green-700
        bgColor: "#f0fdf4", // green-100
        borderColor: "#bbf7d0", // green-200
      },
      rejected: {
        icon: CheckCircle, // Using CheckCircle (x-circle equivalent not impoted yet, can stick to simple icons)
        text: "반려됨",
        color: "#b91c1c", // red-700
        bgColor: "#fef2f2", // red-100
        borderColor: "#fecaca", // red-200
      },
    };

    const config = statusConfig[applicationStatus];
    const Icon = config.icon;

    return (
      <View style={[
        styles.badge, 
        { backgroundColor: config.bgColor, borderColor: config.borderColor }
      ]}>
        <Icon size={16} color={config.color} />
        <Text style={[styles.badgeText, { color: config.color }]}>{config.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>인플루언서 등록</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 안내 박스 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>인플루언서 혜택</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• 인플루언서 배지 제공</Text>
            <Text style={styles.infoItem}>• 레시피 추천 우선 노출</Text>
            <Text style={styles.infoItem}>• 특별 이벤트 초대</Text>
            <Text style={styles.infoItem}>• 프로모션 참여 기회</Text>
          </View>
        </View>

        {/* 신청 폼 */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>플랫폼 선택</Text>
          
          {/* 플랫폼 선택 버튼들 */}
          <View style={styles.platformGrid}>
            <TouchableOpacity
              onPress={() => setSelectedPlatform("instagram")}
              style={[
                styles.platformButton,
                selectedPlatform === "instagram" ? styles.platformActive : styles.platformInactive
              ]}
            >
              <Instagram size={32} color={selectedPlatform === "instagram" ? "#000" : "#9ca3af"} />
              <Text style={[
                styles.platformText,
                selectedPlatform === "instagram" && styles.textBlack
              ]}>인스타그램</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedPlatform("blog")}
              style={[
                styles.platformButton,
                selectedPlatform === "blog" ? styles.platformActive : styles.platformInactive
              ]}
            >
              <Globe size={32} color={selectedPlatform === "blog" ? "#000" : "#9ca3af"} />
              <Text style={[
                styles.platformText,
                selectedPlatform === "blog" && styles.textBlack
              ]}>블로그</Text>
            </TouchableOpacity>
          </View>

          {/* 계정 입력 */}
          <View style={styles.inputGroup}>
            <Input
                label={selectedPlatform === "instagram" ? "인스타그램 계정" : selectedPlatform === "blog" ? "블로그 주소" : "계정 정보"}
                value={accountInput}
                onChangeText={setAccountInput}
                placeholder={
                    selectedPlatform === "instagram"
                      ? "@계정명 또는 프로필 링크"
                      : selectedPlatform === "blog"
                      ? "https://blog.example.com"
                      : "플랫폼을 먼저 선택해주세요"
                  }
                editable={!!selectedPlatform}
            />
            <Text style={styles.helperText}>
              {selectedPlatform === "instagram" 
                ? "인스타그램 계정명 또는 프로필 링크를 입력해주세요."
                : selectedPlatform === "blog"
                ? "블로그 주소를 정확하게 입력해주세요."
                : "플랫폼을 선택하면 입력할 수 있습니다."}
            </Text>
          </View>

          <Button 
            onPress={handleSubmit}
            disabled={!selectedPlatform || !accountInput.trim()}
            style={styles.submitButton}
          >
            신청하기
          </Button>
        </View>

        {/* 신청 상황 */}
        {applicationStatus && (
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>신청 상황</Text>
            
            <View style={styles.statusList}>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>상태</Text>
                {getStatusBadge()}
              </View>

              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>신청일</Text>
                <Text style={styles.statusValue}>{applicationDate}</Text>
              </View>

              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>플랫폼</Text>
                <Text style={styles.statusValue}>
                  {selectedPlatform === "instagram" ? "인스타그램" : "블로그"}
                </Text>
              </View>

              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>계정 정보</Text>
                <Text style={styles.statusValue} numberOfLines={1}>{accountInput}</Text>
              </View>

              {applicationStatus === "pending" && (
                <View style={[styles.statusMessage, styles.bgYellow]}>
                  <Text style={[styles.statusMessageText, styles.textYellow]}>
                    신청서를 검토 중입니다. 1-3일 내에 결과를 알려드리겠습니다.
                  </Text>
                </View>
              )}

              {applicationStatus === "approved" && (
                <View style={[styles.statusMessage, styles.bgGreen]}>
                  <Text style={[styles.statusMessageText, styles.textGreen]}>
                    축하합니다! 인플루언서로 승인되었습니다. 이제 모든 혜택을 이용하실 수 있습니다.
                  </Text>
                </View>
              )}

              {applicationStatus === "rejected" && (
                <View style={[styles.statusMessage, styles.bgRed]}>
                  <Text style={[styles.statusMessageText, styles.textRed, styles.mb1]}>
                    죄송합니다. 신청이 반려되었습니다.
                  </Text>
                  <Text style={[styles.statusMessageText, styles.textRedSmall]}>
                    더 많은 활동 후 다시 신청해주세요.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // gray-50
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'white',
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
  infoBox: {
      backgroundColor: '#f3f4f6', // gray-100
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
  },
  infoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 8,
  },
  infoList: {
      gap: 4,
  },
  infoItem: {
      fontSize: 14,
      color: '#4b5563',
  },
  formCard: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#e5e7eb',
  },
  cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 16,
  },
  platformGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
  },
  platformButton: {
      flex: 1,
      alignItems: 'center',
      gap: 12,
      padding: 24,
      borderRadius: 12,
      borderWidth: 2,
  },
  platformActive: {
      borderColor: '#000',
      backgroundColor: '#f9fafb',
  },
  platformInactive: {
      borderColor: '#e5e7eb',
  },
  platformText: {
      fontWeight: '500',
      color: '#4b5563',
  },
  textBlack: {
      color: '#000',
  },
  inputGroup: {
      gap: 8,
      marginBottom: 24,
  },
  helperText: {
      fontSize: 12,
      color: '#6b7280',
  },
  submitButton: {
      marginTop: 8,
  },
  statusList: {
      gap: 16,
  },
  statusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
  },
  statusLabel: {
      color: '#4b5563',
  },
  statusValue: {
      fontWeight: '500',
      color: '#1f2937',
      maxWidth: 200,
  },
  badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
  },
  badgeText: {
      fontWeight: '500',
      fontSize: 14,
  },
  statusMessage: {
      marginTop: 8,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
  },
  statusMessageText: {
      fontSize: 14,
  },
  bgYellow: { backgroundColor: '#fefce8', borderColor: '#fef08a' },
  textYellow: { color: '#854d0e' },
  bgGreen: { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' },
  textGreen: { color: '#166534' },
  bgRed: { backgroundColor: '#fef2f2', borderColor: '#fecaca' },
  textRed: { color: '#991b1b' },
  textRedSmall: { color: '#b91c1c', fontSize: 12 },
  mb1: { marginBottom: 4 },
});
