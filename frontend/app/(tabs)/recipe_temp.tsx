import { RecipeListScreen } from '../../features/myrecipe/RecipeListScreen';
import { useRouter } from 'expo-router';

export default function RecipePage() {
  const router = useRouter();

  return (
    <RecipeListScreen 
      onBack={() => router.back()}
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
      onWriteClick={() => router.push('/recipe')}
    />
  );
}
