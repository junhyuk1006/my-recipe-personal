import { MealPlanScreen } from '../../features/meal-plan/MealPlanScreen';
import { useRouter } from 'expo-router';

export default function MealPlanPage() {
  const router = useRouter();

  return (
    <MealPlanScreen 
      onBack={() => router.back()}
    />
  );
}
