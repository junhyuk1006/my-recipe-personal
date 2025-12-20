import { HomeScreen } from '../../features/home/HomeScreen';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Global auth state management needed later

  const handleLogout = () => {
    setIsLoggedIn(false);
    // In a real app, clear tokens etc.
  };

  return (
    <HomeScreen 
      onLogoClick={() => {alert("로고 클릭")}} // Already on home
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
      onLoginClick={() => router.push('/login')}
      onWriteClick={() => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        router.push('/recipe');
      }}
      onRecipeListClick={() => router.push('/(tabs)/recipe')}
      onRefrigeratorClick={() => router.push('/(tabs)/refrigerator')}
      onMealPlanClick={() => router.push('/(tabs)/meal-plan')}
      onProfileClick={() => router.push('/(tabs)/profile')}
    />
  );
}
