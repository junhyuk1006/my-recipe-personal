import { MyLikesScreen } from '../../features/profile/MyLikesScreen';
import { useRouter } from 'expo-router';

export default function MyLikesPage() {
  const router = useRouter();

  return (
    <MyLikesScreen 
      onBack={() => router.back()}
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
    />
  );
}
