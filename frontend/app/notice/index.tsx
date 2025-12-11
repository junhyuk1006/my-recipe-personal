import { NoticeListScreen } from '../../features/notice/NoticeListScreen';
import { useRouter } from 'expo-router';

export default function NoticeListPage() {
  const router = useRouter();

  return (
    <NoticeListScreen 
      onBack={() => router.back()}
      onNoticeClick={(id) => router.push(`/notice/${id}` as any)}
    />
  );
}
