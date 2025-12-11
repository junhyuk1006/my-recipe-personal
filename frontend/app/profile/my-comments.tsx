import { MyCommentsScreen } from '../../features/profile/MyCommentsScreen';
import { useRouter } from 'expo-router';

export default function MyCommentsPage() {
  const router = useRouter();

  return (
    <MyCommentsScreen 
      onBack={() => router.back()}
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
    />
  );
}
