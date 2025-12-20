import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from './components/Logo';
import { SocialLoginButtons } from './components/SocialLoginButtons';
import { ChevronLeft } from 'lucide-react-native';

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // 아이디와 비밀번호가 모두 "a"인 경우 로그인 성공
    if (username === "a" && password === "a") {
      setLoading(true);
      // Simulate network request
      setTimeout(() => {
          setLoading(false);
          onLoginSuccess?.();
      }, 500);
    } else {
      Alert.alert(
        "로그인 실패", 
        "아이디 또는 비밀번호가 올바르지 않습니다.\n\n테스트용: 아이디 'a', 비밀번호 'a'를 입력하세요."
      );
    }
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
                    label="아이디"
                    placeholder="아이디를 입력하세요"
                    value={username}
                    onChangeText={setUsername}
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
