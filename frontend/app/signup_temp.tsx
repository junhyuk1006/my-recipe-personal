import { SignupScreen } from '../features/auth/SignupScreen';
import { useRouter } from 'expo-router';

export default function SignupPage() {
  const router = useRouter();

  return (
    <SignupScreen 
      onSwitchToLogin={() => router.back()}
      onLogoClick={() => router.push('/(tabs)')}
    />
  );
}
