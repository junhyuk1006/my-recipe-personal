import { TermsScreen } from '../../features/profile/TermsScreen';
import { useRouter } from 'expo-router';

export default function TermsPage() {
  const router = useRouter();

  return (
    <TermsScreen 
      onBack={() => router.back()}
    />
  );
}
