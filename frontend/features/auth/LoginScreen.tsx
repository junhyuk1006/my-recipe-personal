import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from './components/Logo';
import { SocialLoginButtons } from './components/SocialLoginButtons';
import { ChevronLeft } from 'lucide-react-native';
import { useAuth } from '@/auth/AuthProvider';
import { getApiErrorMessage, login } from './api/auth.api';

interface LoginScreenProps {
  onBack: () => void;
  onSwitchToSignup?: () => void;
  onLogoClick?: () => void;
  onLoginSuccess?: () => void;
  onFindIdClick?: () => void;
  onFindPasswordClick?: () => void;
}

export function LoginScreen({ 
  onBack,
  onSwitchToSignup, 
  onLogoClick, 
  onLoginSuccess, 
  onFindIdClick, 
  onFindPasswordClick 
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    const errorMessage = validateLogin();
    if (errorMessage){
      Alert.alert("회원가입 실패", errorMessage);
      return;
    }

    try{
      setLoading(true);

      const data = await login({
        email: email.trim(),
        password,
      });

      await signIn(data.tokens.accessToken, data.tokens.refreshToken);

      onLoginSuccess?.();

    } catch(err){
      Alert.alert("로그인 실패", getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const validateLogin = (): string | null => {
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
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#374151" />
          </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.authWrapper}>
          {/* 로고 */}
          <Logo onClick={onLogoClick} />

          {/* 브랜드명과 슬로건 */}
          <View style={styles.headerText}>
            <Text style={styles.title}>마이레시피</Text>
            <Text style={styles.subtitle}>맛있는 요리의 시작</Text>
          </View>

          {/* 로그인 폼 */}
          <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Input
                    label="이메일"
                    placeholder="example@email.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <Input
                    label="비밀번호"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
              </View>

              {/* 로그인 버튼 */}
              <Button 
                onPress={handleLogin} 
                size="lg"
                isLoading={loading}
              >
                로그인
              </Button>

              {/* 아이디찾기 / 비밀번호찾기 */}
              <View style={styles.findLinks}>
                <TouchableOpacity onPress={onFindIdClick}>
                    <Text style={styles.linkText}>아이디찾기</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity onPress={onFindPasswordClick}>
                    <Text style={styles.linkText}>비밀번호찾기</Text>
                </TouchableOpacity>
              </View>

              {/* 회원가입 */}
              <View style={styles.signupLink}>
                <TouchableOpacity onPress={onSwitchToSignup}>
                    <Text style={styles.linkText}>회원가입</Text>
                </TouchableOpacity>
              </View>

              {/* 소셜 로그인 */}
              <SocialLoginButtons type="login" />
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
    paddingTop: 16,
  },
  backButton: {
      padding: 4,
      marginLeft: 12,
  },
  scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingBottom: 40,
  },
  authWrapper: {
    paddingHorizontal: 24,
    width: '100%',
  },
  headerText: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  title: {
      fontSize: 30, // text-3xl
      fontWeight: 'bold',
      color: '#1e293b', // slate-800
  },
  subtitle: {
      fontSize: 14,
      color: '#6b7280', // gray-500
  },
  form: {
      gap: 24, // space-y-6
  },
  inputGroup: {
      gap: 16, // space-y-4
  },
  findLinks: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
  },
  linkText: {
      fontSize: 14,
      color: '#6b7280', // gray-500
  },
  divider: {
      color: '#d1d5db', // gray-300
  },
  signupLink: {
      alignItems: 'center',
  }
});
