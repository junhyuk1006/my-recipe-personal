import { RefrigeratorScreen } from '../../features/refrigerator/RefrigeratorScreen';
import { useRouter } from 'expo-router';
import { useAuth } from '@/auth/AuthProvider';
import { useEffect } from 'react';

export default function RefrigeratorPage() {
  const router = useRouter();
  const { isAuthReady, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isAuthReady) return;
    if (!isLoggedIn) router.replace("/login");
  }, [isAuthReady, isLoggedIn, router]);

  if(!isAuthReady) return null;
  if(!isLoggedIn) return null;

  return (
    <RefrigeratorScreen 
      onBack={() => router.back()}
      onWriteClick={() => router.push('/recipe')}
    />
  );
}
