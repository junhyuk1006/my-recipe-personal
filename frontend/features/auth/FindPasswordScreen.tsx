import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface FindPasswordScreenProps {
  onBack: () => void;
  onLogoClick: () => void;
}

export function FindPasswordScreen({ onBack, onLogoClick }: FindPasswordScreenProps) {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const handleFindPassword = () => {
    if (!id || !email) {
      Alert.alert("알림", "아이디와 이메일을 모두 입력해주세요.");
      return;
    }
    // Simulate API call
    Alert.alert("알림", "입력하신 이메일로 임시 비밀번호가 전송되었습니다.");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogoClick}>
            <Text style={styles.headerTitle}>마이레시피</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>비밀번호 찾기</Text>
        <Text style={styles.subtitle}>가입 시 등록한 아이디와 이메일을 입력해주세요.</Text>

        <View style={styles.form}>
           <Input
            label="아이디"
            value={id}
            onChangeText={setId}
            placeholder="아이디를 입력하세요"
            autoCapitalize="none"
          />
          <Input
            label="이메일"
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Button onPress={handleFindPassword} style={styles.button}>
            비밀번호 찾기
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 32,
  },
  form: {
    gap: 24,
  },
  button: {
    marginTop: 8,
  },
});
