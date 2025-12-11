import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <ProfileScreen 
      onBack={() => router.back()}
      onEditProfileClick={() => router.push('/profile/edit_temp')}
      onMyRecipesClick={() => router.push('/profile/my-recipes')}
      onMyCommentsClick={() => router.push('/profile/my-comments')}
      onMyLikesClick={() => router.push('/profile/my-likes')}
      onMyBookmarksClick={() => router.push('/profile/my-bookmarks')}
      onNoticeClick={() => router.push('/notice')}
      onTermsClick={() => router.push('/profile/terms_temp')}
      onInquiryClick={() => router.push('/profile/inquiry_temp')}
      onInfluencerRegisterClick={() => router.push('/profile/influencer-register')}
    />
  );
}
