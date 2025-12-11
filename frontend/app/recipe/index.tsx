import { RecipeWriteScreen } from '../../features/myrecipe/RecipeWriteScreen';
import { useRouter } from 'expo-router';

export default function RecipeWritePage() {
  const router = useRouter();

  return (
    <RecipeWriteScreen 
      onBack={() => router.back()}
      onSubmit={() => {
        router.back();
        // In real app, maybe navigate to the new recipe detail
      }}
    />
  );
}
