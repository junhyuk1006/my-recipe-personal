import { MyBookmarksScreen } from '../../features/profile/MyBookmarksScreen';
import { useRouter } from 'expo-router';

export default function MyBookmarksPage() {
  const router = useRouter();

  return (
    <MyBookmarksScreen 
      onBack={() => router.back()}
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
    />
  );
}
