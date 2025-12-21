import SignupProfileScreen from '../../features/auth/SignupProfileScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function SignupProfilePage() {
  const router = useRouter();

  const handleContinue = (payload: { photoUri?: string | null; nickname: string; handle: string }) => {
    // TODO: forward payload to backend or store in state
    // For now, proceed to app main tabs
    router.push('/(tabs)');
  };

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  return (
    <SignupProfileScreen
      onBack={() => router.back()}
      onContinue={handleContinue}
      onSkip={handleSkip}
    />
  );
}
