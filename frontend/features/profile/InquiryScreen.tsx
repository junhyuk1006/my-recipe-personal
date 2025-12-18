import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Send } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';

interface InquiryScreenProps {
  onBack?: () => void;
}

export function InquiryScreen({ onBack }: InquiryScreenProps) {
  const [email] = useState("choi@example.com"); // 내 이메일로 자동 설정
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert("알림", "제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      Alert.alert("알림", "문의 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 실제로는 서버에 전송하는 로직
    setTimeout(() => {
      Alert.alert(
        "접수 완료",
        `문의가 접수되었습니다.\n답변은 ${email}로 발송됩니다.`,
        [{ text: "확인", onPress: () => {
            setIsSubmitting(false);
            onBack?.();
        }}]
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        {/* 헤더 */}
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ChevronLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>문의하기</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formSection}>
                {/* 답변 받을 이메일 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>답변 받을 이메일</Text>
                    <View style={styles.disabledInput}>
                        <Text style={styles.disabledText}>{email}</Text>
                    </View>
                    <Text style={styles.helperText}>답변은 위 이메일로 전송됩니다</Text>
                </View>

                {/* 제목 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        제목 <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="제목을 입력하세요"
                        style={styles.input}
                        maxLength={100}
                    />
                    <Text style={styles.charCount}>{title.length}/100</Text>
                </View>

                {/* 문의 내용 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        문의 내용 <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        value={content}
                        onChangeText={setContent}
                        placeholder="문의하실 내용을 상세히 입력해주세요"
                        style={[styles.input, styles.textArea]}
                        multiline
                        textAlignVertical="top"
                        maxLength={1000}
                    />
                    <Text style={styles.charCount}>{content.length}/1000</Text>
                </View>

                {/* 안내 문구 */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        • 문의 내용은 영업일 기준 1-3일 이내에 답변드립니다.{'\n'}
                        • 답변은 등록된 이메일로 발송됩니다.{'\n'}
                        • 욕설이나 비방 등 부적절한 내용은 답변이 제한될 수 있습니다.
                    </Text>
                </View>
            </View>
        </ScrollView>

        {/* 하단 고정 버튼 */}
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            >
                {isSubmitting ? (
                    <Text style={styles.submitButtonText}>처리 중...</Text>
                ) : (
                    <>
                        <Send size={20} color="white" />
                        <Text style={styles.submitButtonText}>보내기</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
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
  formSection: {
      gap: 24,
  },
  inputGroup: {
      gap: 8,
  },
  label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#374151',
  },
  required: {
      color: '#ef4444',
  },
  disabledInput: {
      padding: 12,
      backgroundColor: '#f9fafb',
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 8,
  },
  disabledText: {
      color: '#4b5563',
  },
  helperText: {
      fontSize: 12,
      color: '#6b7280',
  },
  input: {
      padding: 12,
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 8,
      fontSize: 14,
      color: '#1f2937',
      backgroundColor: 'white',
  },
  textArea: {
      height: 240,
  },
  charCount: {
      fontSize: 12,
      color: '#6b7280',
      textAlign: 'right',
  },
  infoBox: {
      backgroundColor: '#eff6ff', // blue-50
      borderWidth: 1,
      borderColor: '#bfdbfe', // blue-200
      borderRadius: 8,
      padding: 16,
  },
  infoText: {
      fontSize: 14,
      color: '#1e40af', // blue-800
      lineHeight: 20,
  },
  footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      backgroundColor: 'white',
  },
  submitButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: '#000',
      paddingVertical: 16,
      borderRadius: 8,
  },
  submitButtonDisabled: {
      backgroundColor: '#9ca3af',
  },
  submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
  },
});
