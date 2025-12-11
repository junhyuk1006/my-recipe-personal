import { useRouter } from 'expo-router';
import React from 'react';
import { LoginScreen } from '../../features/auth/LoginScreen';
import { SignupScreen } from '../../features/auth/SignupScreen';

export default function LoginRoute() {
  const router = useRouter();

  const [isSignup, setIsSignup] = React.useState(false);

  const handleSwitchToSignup = () => {
    setIsSignup(true);
  };
  
  const handleSwitchToLogin = () => {
    setIsSignup(false);
  };

  const handleLoginSuccess = () => {
    router.replace('/'); 
  };

  const handleFindId = () => {
    // router.push('/find-id');
    console.log('Find ID');
  };

  const handleFindPassword = () => {
    // router.push('/find-password');
    console.log('Find Password');
  };

  if (isSignup) {
      return <SignupScreen onSwitchToLogin={handleSwitchToLogin} />;
  }

  return (
    <LoginScreen
      onSwitchToSignup={handleSwitchToSignup}
      onLoginSuccess={handleLoginSuccess}
      onFindIdClick={handleFindId}
      onFindPasswordClick={handleFindPassword}
    />
  );
}
