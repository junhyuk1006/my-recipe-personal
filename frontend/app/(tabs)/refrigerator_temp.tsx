import { RefrigeratorScreen } from '../../features/refrigerator/RefrigeratorScreen';
import { useRouter } from 'expo-router';

export default function RefrigeratorPage() {
  const router = useRouter();

  return (
    <RefrigeratorScreen 
      onBack={() => router.back()}
      onWriteClick={() => router.push('/recipe')}
    />
  );
}
