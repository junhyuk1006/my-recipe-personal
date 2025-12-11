import { InfluencerRegisterScreen } from '../../features/profile/InfluencerRegisterScreen';
import { useRouter } from 'expo-router';

export default function InfluencerRegisterPage() {
  const router = useRouter();

  return (
    <InfluencerRegisterScreen 
      onBack={() => router.back()}
    />
  );
}
