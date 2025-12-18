import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface FindIdScreenProps {
  onBack: () => void;
  onLogoClick: () => void;
}

export function FindIdScreen({ onBack, onLogoClick }: FindIdScreenProps) {
  const [email, setEmail] = useState("");

  const handleFindId = () => {
    if (!email) {
      Alert.alert("알림", "이메일을 입력해주세요.");
      return;
    }
    // Simulate API call
    Alert.alert("알림", "입력하신 이메일로 아이디가 전송되었습니다.");
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
        <Text style={styles.title}>아이디 찾기</Text>
        <Text style={styles.subtitle}>가입 시 등록한 이메일을 입력해주세요.</Text>

        <View style={styles.form}>
          <Input
            label="이메일"
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Button onPress={handleFindId} style={styles.button}>
            아이디 찾기
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
