import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from './components/Logo';
import { SocialLoginButtons } from './components/SocialLoginButtons';

import { signup, getApiErrorMessage } from './api/auth.api';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface SignupScreenProps {
  onSwitchToLogin: () => void;
  onLogoClick?: () => void;
  onProceedToProfile?: (data: {
     id: number; 
     nickname: string;
     handle: string 
    }) => void;
}

export function SignupScreen({ onSwitchToLogin, onLogoClick, onProceedToProfile }: SignupScreenProps) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const errorMessage = validateSignup();
    if (errorMessage){
      Alert.alert("회원가입 실패", errorMessage);
      return;
    }
    try{
      setLoading(true);

      const data = await signup({
        email: email.trim(),
        password,
        nickname: nickname.trim(),
      });

      onProceedToProfile?.({
        id: data.id,
        nickname: data.nickname,
        handle: data.handle,
      });
    } catch (err) {
      Alert.alert("회원가입 실패", getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const validateSignup = (): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "이메일을 입력해주세요.";
    }
    if (!emailRegex.test(email)) {
      return "유효한 이메일 주소를 입력해주세요.";
    }
    if (!password) {
      return "비밀번호를 입력해주세요.";
    }
    if (!passwordConfirm) {
      return "비밀번호 확인을 입력해주세요.";
    }
    if (password !== passwordConfirm) {
      return "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
    }
    if (!nickname.trim()) {
      return "닉네임을 입력해주세요.";
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.authWrapper}>
          {/* 뒤로가기 버튼 */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity 
              onPress={onSwitchToLogin}
              style={styles.backButton}
            >
              <ArrowLeft size={20} color="#6b7280" />
              <Text style={styles.backButtonText}>로그인으로 돌아가기</Text>
            </TouchableOpacity>
          </View>

          {/* 로고 */}
          <Logo onClick={onLogoClick} />

          {/* 브랜드명과 슬로건 */}
          <View style={styles.headerText}>
            <Text style={styles.title}>회원가입</Text>
            <Text style={styles.subtitle}>마이레시피와 함께 시작하세요</Text>
          </View>

          {/* 회원가입 폼 */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
                {/* 이메일 (Simplified to single input for mobile) */}
                <Input
                    label="이메일"
                    placeholder="example@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Input
                    label="비밀번호"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Input
                    label="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    secureTextEntry
                />

                <Input
                    label="닉네임"
                    placeholder="닉네임을 입력하세요"
                    value={nickname}
                    onChangeText={setNickname}
                />
            </View>

            {/* 회원가입 버튼 */}
            <Button size="lg" onPress={handleSignup}>
              회원가입
            </Button>

            {/* 소셜 가입 */}
            <SocialLoginButtons type="signup"/>
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
  scrollContent: {
      flexGrow: 1,
      paddingBottom: 40,
  },
  authWrapper: {
    paddingHorizontal: 24,
    paddingTop: 16,
    width: '100%',
  },
  backButtonContainer: {
      marginBottom: 24,
  },
  backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  backButtonText: {
      fontSize: 14,
      color: '#6b7280', // gray-500
  },
  headerText: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  title: {
      fontSize: 30, 
      fontWeight: 'bold',
      color: '#1e293b', 
  },
  subtitle: {
      fontSize: 14,
      color: '#6b7280', 
  },
  form: {
      gap: 24, 
  },
  inputGroup: {
      gap: 16, 
  },
  label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#09090b',
      marginBottom: 8,
  },
  row: {
      flexDirection: 'row',
      gap: 8,
  },
  flex1: {
      flex: 1,
  },
  inputWithButton: {
      // Input component has its own container styles, but we might need to adjust here
  },
  checkButton: {
      backgroundColor: '#374151', // gray-700
      height: 36, // Match input height roughly or 44
  },
});
