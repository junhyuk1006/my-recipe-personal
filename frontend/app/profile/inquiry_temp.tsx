import { InquiryScreen } from '../../features/profile/InquiryScreen';
import { useRouter } from 'expo-router';

export default function InquiryPage() {
  const router = useRouter();

  return (
    <InquiryScreen 
      onBack={() => router.back()}
    />
  );
}
