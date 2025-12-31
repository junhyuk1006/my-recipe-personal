import { HomeScreen } from '../../features/home/HomeScreen';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/auth/AuthProvider';

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn, signOut } = useAuth();

  return (
    <HomeScreen 
      onLogoClick={() => {router.push('/(tabs)')}} // Already on home
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
      isLoggedIn={isLoggedIn}
      onLogoutClick={signOut}
      onLoginClick={() => router.push('/login')}
      onWriteClick={() => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        router.push('/recipe');
      }}
      onRecipeListClick={() => router.push('/(tabs)/recipe')}
      onRefrigeratorClick={() => {
        if(!isLoggedIn){
          router.push('/login');
          return;
        }
        router.push('/(tabs)/refrigerator')
      }}
      onMealPlanClick={() => router.push('/(tabs)/meal-plan')}
      onProfileClick={() => router.push('/(tabs)/profile')}
    />
  );
}
