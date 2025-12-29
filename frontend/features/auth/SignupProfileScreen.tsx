import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useLocalSearchParams } from 'expo-router';

interface SignupProfileScreenProps {
  onBack?: () => void;
  onContinue: (payload: { photoUri?: string | null; nickname: string; handle: string }) => void;
  onSkip?: () => void;
}

export function SignupProfileScreen({ onBack, onContinue, onSkip }: SignupProfileScreenProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const { id, nickname, handle } = useLocalSearchParams<{
    id?: string;
    nickname?: string;
    handle?: string;
  }>();
  // Fixed placeholders (server will provide real values later)

  // Avatar size ~ 2/3 of screen width
  const avatarSize = Math.round(Dimensions.get('window').width * 0.66);

  function onPickPhoto() {
    // For now we only simulate photo picking
    Alert.alert('프로필 사진', '사진 선택은 아직 구현되지 않았습니다. (모의 동작)');
    // Simulate selected uri
    setPhotoUri('asset:/assets/images/profile-placeholder.png');
  }

  function onRemovePhoto() {
    setPhotoUri(null);
  }

  function handleContinue() {
    if (!nickname || !handle) return;
    onContinue({ photoUri, nickname, handle });
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.wrapper}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={20} color="#6b7280" />
            <Text style={styles.backText}>뒤로</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.center}
>
          <Text style={styles.title}>프로필 설정</Text>
          <Text style={styles.subtitle}>원하시면 프로필을 꾸밀 수 있어요 (스킵 가능)</Text>

          <View style={styles.photoCenter}>
            <TouchableOpacity style={[styles.avatarLarge, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]} onPress={onPickPhoto}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholderWrap}>
                  <Text style={styles.avatarPlaceholderLarge}>사진 추가</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.photoButtonsRow}>
              <Button size="sm" variant="outline" onPress={onPickPhoto} style={{ marginRight: 8 }}>사진 선택</Button>
              <Button size="sm" variant="ghost" onPress={onRemovePhoto}>제거</Button>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.handleDisplayRow}>
              <Text style={styles.nicknameText}>{nickname}</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusIdle}>@{handle}</Text>
            </View>

            <View style={styles.bottomButtons}>
              <Button size="lg" onPress={handleContinue} style={{ flex: 1 }}>계속</Button>
              <View style={{ width: 12 }} />
              <Button size="lg" variant="secondary" onPress={() => onSkip && onSkip()} style={{ flex: 1 }}>나중에</Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  wrapper: { paddingHorizontal: 24, paddingTop: 8, flex: 1 },
  headerRow: { marginTop: 32, marginBottom: 8 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: '#6b7280', marginLeft: 4 },
  center: { alignItems: 'center', gap: 8 },
  title: { fontSize: 26, fontWeight: '700', color: '#0f172a', marginTop: 24 },
  subtitle: { color: '#6b7280', fontSize: 14 },

  photoCenter: { alignItems: 'center', marginTop: 24, gap: 12 },
  avatarLarge: {
    borderWidth: 1,
    borderColor: '#e4e4e7',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  avatarPlaceholderWrap: { justifyContent: 'center', alignItems: 'center' },
  avatarPlaceholderLarge: { color: '#6b7280', fontSize: 20 },
  avatarImage: { width: '100%', height: '100%' },
  photoButtonsRow: { flexDirection: 'row', marginTop: 24 },

  form: { width: '100%', marginTop: 12, gap: 12 },  handleDisplayRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  atSignLarge: { fontSize: 20, color: '#09090b', fontWeight: '600' },
  handleText: { fontSize: 20, color: '#0f172a', fontWeight: '600' },
  nicknameText: { fontSize: 22, color: '#0f172a', fontWeight: '700' },
  statusRow: { minHeight: 20, marginTop: 8 },
  statusChecking: { color: '#f59e0b' }, // amber
  statusAvailable: { color: '#10b981', fontWeight: '600' }, // green
  statusTaken: { color: '#ef4444', fontWeight: '600' },
  statusInvalid: { color: '#ef4444' },
  statusIdle: { color: '#6b7280' },

  bottomButtons: { flexDirection: 'row', marginTop: 12 },
});

export default SignupProfileScreen;
