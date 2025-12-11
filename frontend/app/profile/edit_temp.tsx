import { EditProfileScreen } from '../../features/profile/EditProfileScreen';
import { useRouter } from 'expo-router';

export default function EditProfilePage() {
  const router = useRouter();

  return (
    <EditProfileScreen 
      onBack={() => router.back()}
    />
  );
}
