import { LoginScreen } from '../features/auth/LoginScreen';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginScreen 
      onSwitchToSignup={() => router.push('/signup_temp')}
      onLogoClick={() => router.push('/(tabs)')}
      onLoginSuccess={() => router.push('/(tabs)')}
      onFindIdClick={() => router.push('/find-id')}
      onFindPasswordClick={() => router.push('/find-password')}
    />
  );
}
