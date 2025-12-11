import { RecipeDetailScreen } from '../../features/myrecipe/RecipeDetailScreen';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function RecipeDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const recipeId = Number(id);

  return (
    <RecipeDetailScreen 
      recipeId={recipeId}
      onBack={() => router.back()}
      isLoggedIn={false} // Temp: Assume logged in or handle proper state
      onLoginClick={() => router.push('/login_temp')}
    />
  );
}
