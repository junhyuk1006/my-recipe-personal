import { SignupScreen } from '../features/auth/SignupScreen';
import { useRouter } from 'expo-router';

export default function SignupPage() {
  const router = useRouter();

  return (
    <SignupScreen 
      onSwitchToLogin={() => router.back()}
      onLogoClick={() => router.push('/(tabs)')}
      onProceedToProfile={(user) => router.push({
        pathname: '/signup/profile',
        params: {
          id: String(user.id),
          nickname: user.nickname,
          handle: user.handle,
        }
      })}
    />
  );
}
