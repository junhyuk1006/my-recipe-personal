import { MyRecipesScreen } from '../../features/profile/MyRecipesScreen';
import { useRouter } from 'expo-router';

export default function MyRecipesPage() {
  const router = useRouter();

  return (
    <MyRecipesScreen 
      onBack={() => router.back()}
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
    />
  );
}
