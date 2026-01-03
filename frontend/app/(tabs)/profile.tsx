import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { useRouter } from 'expo-router';
import { useAuth } from '@/auth/AuthProvider';
import { useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthReady, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isAuthReady) return;
    if (!isLoggedIn) router.replace("/login");
  }, [isAuthReady, isLoggedIn, router]);

  if(!isAuthReady) return null;
  if(!isLoggedIn) return null;
  
  return (
    <ProfileScreen 
      onBack={() => router.back()}
      onEditProfileClick={() => router.push('/profile/edit')}
      onMyRecipesClick={() => router.push('/profile/my-recipes')}
      onMyCommentsClick={() => router.push('/profile/my-comments')}
      onMyLikesClick={() => router.push('/profile/my-likes')}
      onMyBookmarksClick={() => router.push('/profile/my-bookmarks')}
      onNoticeClick={() => router.push('/notice')}
      onTermsClick={() => router.push('/profile/terms')}
      onInquiryClick={() => router.push('/profile/inquiry')}
      onInfluencerRegisterClick={() => router.push('/profile/influencer-register')}
    />
  );
}
