import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface EditProfileScreenProps {
  onBack?: () => void;
}

export function EditProfileScreen({ onBack }: EditProfileScreenProps) {
  const [nickname, setNickname] = useState("초이");
  const [email, setEmail] = useState("choi@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [snsConnections, setSnsConnections] = useState({
    google: true,
    naver: false,
    kakao: true,
  });

  const handleSave = () => {
    Alert.alert("알림", "정보가 저장되었습니다!");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("오류", "새 비밀번호가 일치하지 않습니다.");
      return;
    }
    Alert.alert("알림", "비밀번호가 변경되었습니다!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const toggleSnsConnection = (platform: "google" | "naver" | "kakao") => {
    setSnsConnections((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 정보 수정</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 닉네임 */}
        <View style={styles.section}>
            <Input
                label="닉네임"
                value={nickname}
                onChangeText={setNickname}
                placeholder="닉네임을 입력하세요"
            />
        </View>

        {/* 이메일 */}
        <View style={styles.section}>
            <Input
                label="이메일"
                value={email}
                onChangeText={setEmail}
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
                autoCapitalize="none"
            />
        </View>

        <View style={styles.section}>
            <Button onPress={handleSave}>저장</Button>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 비밀번호 변경 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>비밀번호 변경</Text>
          
          <View style={styles.inputGap}>
            <Input
                label="현재 비밀번호"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="현재 비밀번호를 입력하세요"
                secureTextEntry
            />
            <Input
                label="새 비밀번호"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="새 비밀번호를 입력하세요"
                secureTextEntry
            />
             <Input
                label="새 비밀번호 확인"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="새 비밀번호를 다시 입력하세요"
                secureTextEntry
            />
          </View>

          <Button variant="secondary" onPress={handlePasswordChange} style={styles.marginTop}>
            비밀번호 변경
          </Button>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* SNS 계정 연동 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SNS 계정 연동 상태</Text>
          
          <View style={styles.snsList}>
            {/* 구글 */}
            <TouchableOpacity
              onPress={() => toggleSnsConnection("google")}
              style={[
                styles.snsButton,
                snsConnections.google ? styles.snsGoogleActive : styles.snsInactive
              ]}
            >
              <View style={styles.snsContent}>
                <View style={[styles.snsIcon, snsConnections.google ? styles.bgWhite : styles.bgGray200]}>
                   <Text style={{fontSize: 20}}>G</Text>
                </View>
                <Text style={snsConnections.google ? styles.textGray800 : styles.textGray500}>Google</Text>
              </View>
              <Text style={[styles.snsStatus, snsConnections.google ? styles.textRed : styles.textGray400]}>
                {snsConnections.google ? "연동됨" : "연동 안 됨"}
              </Text>
            </TouchableOpacity>

            {/* 네이버 */}
            <TouchableOpacity
              onPress={() => toggleSnsConnection("naver")}
              style={[
                styles.snsButton,
                snsConnections.naver ? styles.snsNaverActive : styles.snsInactive
              ]}
            >
              <View style={styles.snsContent}>
                <View style={[styles.snsIcon, snsConnections.naver ? styles.bgWhite : styles.bgGray200]}>
                   <Text style={{fontSize: 20, color: snsConnections.naver ? '#03C75A' : '#666' }}>N</Text>
                </View>
                <Text style={snsConnections.naver ? styles.textGray800 : styles.textGray500}>Naver</Text>
              </View>
              <Text style={[styles.snsStatus, snsConnections.naver ? styles.textGreen : styles.textGray400]}>
                {snsConnections.naver ? "연동됨" : "연동 안 됨"}
              </Text>
            </TouchableOpacity>

            {/* 카카오 */}
            <TouchableOpacity
              onPress={() => toggleSnsConnection("kakao")}
              style={[
                styles.snsButton,
                snsConnections.kakao ? styles.snsKakaoActive : styles.snsInactive
              ]}
            >
              <View style={styles.snsContent}>
                <View style={[styles.snsIcon, snsConnections.kakao ? styles.bgWhite : styles.bgGray200]}>
                   <Text style={{fontSize: 20, color: snsConnections.kakao ? '#3C1E1E' : '#666' }}>K</Text>
                </View>
                <Text style={snsConnections.kakao ? styles.textGray800 : styles.textGray500}>Kakao</Text>
              </View>
              <Text style={[styles.snsStatus, snsConnections.kakao ? styles.textYellow : styles.textGray400]}>
                {snsConnections.kakao ? "연동됨" : "연동 안 됨"}
              </Text>
            </TouchableOpacity>
          </View>
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
      paddingBottom: 40,
  },
  section: {
      padding: 16,
      gap: 16,
  },
  divider: {
      height: 1,
      backgroundColor: '#e5e7eb',
      marginVertical: 16,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 16,
  },
  inputGap: {
      gap: 16,
  },
  marginTop: {
      marginTop: 16,
  },
  snsList: {
      gap: 12,
  },
  snsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
  },
  snsContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  snsInactive: {
      backgroundColor: '#f9fafb',
      borderColor: '#d1d5db',
  },
  snsGoogleActive: {
      backgroundColor: '#fef2f2',
      borderColor: '#ef4444',
  },
  snsNaverActive: {
      backgroundColor: '#f0fdf4',
      borderColor: '#22c55e',
  },
  snsKakaoActive: {
      backgroundColor: '#fefce8',
      borderColor: '#eab308',
  },
  snsIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  bgWhite: { backgroundColor: '#fff' },
  bgGray200: { backgroundColor: '#e5e7eb' },
  textGray800: { color: '#1f2937' },
  textGray500: { color: '#6b7280' },
  
  snsStatus: {
      fontSize: 14,
      fontWeight: '500',
  },
  textRed: { color: '#dc2626' },
  textGreen: { color: '#16a34a' },
  textYellow: { color: '#ca8a04' },
  textGray400: { color: '#9ca3af' },
});
