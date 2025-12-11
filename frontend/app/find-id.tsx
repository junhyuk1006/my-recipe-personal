import { FindIdScreen } from '../features/auth/FindIdScreen';
import { useRouter } from 'expo-router';

export default function FindIdPage() {
  const router = useRouter();

  return (
    <FindIdScreen 
      onBack={() => router.back()}
      onLogoClick={() => router.push('/(tabs)')}
    />
  );
}
