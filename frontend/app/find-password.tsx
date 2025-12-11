import { FindPasswordScreen } from '../features/auth/FindPasswordScreen';
import { useRouter } from 'expo-router';

export default function FindPasswordPage() {
  const router = useRouter();

  return (
    <FindPasswordScreen 
      onBack={() => router.back()}
      onLogoClick={() => router.push('/(tabs)')}
    />
  );
}
