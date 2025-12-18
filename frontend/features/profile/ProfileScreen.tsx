import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, Edit, BookOpen, MessageCircle, Heart, Bookmark, Bell, FileText, HelpCircle, Star } from 'lucide-react-native';

interface ProfileScreenProps {
  onBack?: () => void;
  onEditProfileClick?: () => void;
  onMyRecipesClick?: () => void;
  onMyCommentsClick?: () => void;
  onMyLikesClick?: () => void;
  onMyBookmarksClick?: () => void;
  onNoticeClick?: () => void;
  onTermsClick?: () => void;
  onInquiryClick?: () => void;
  onInfluencerRegisterClick?: () => void;
}

export function ProfileScreen({ 
  onBack, 
  onEditProfileClick, 
  onMyRecipesClick, 
  onMyCommentsClick, 
  onMyLikesClick, 
  onMyBookmarksClick, 
  onNoticeClick, 
  onTermsClick, 
  onInquiryClick, 
  onInfluencerRegisterClick 
}: ProfileScreenProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleProfileImageUpload = () => {
    Alert.alert("알림", "프로필 사진 업로드 기능은 추후 구현 예정입니다.");
  };

  const userActivityMenuItems = [
    {
      id: "edit-info",
      icon: Edit,
      label: "내 정보 수정",
      onClick: () => onEditProfileClick?.(),
    },
    {
      id: "influencer-register",
      icon: Star,
      label: "인플루언서 등록",
      onClick: () => onInfluencerRegisterClick?.(),
    },
    {
      id: "my-recipes",
      icon: BookOpen,
      label: "내 레시피 조회",
      onClick: () => onMyRecipesClick?.(),
    },
    {
      id: "my-comments",
      icon: MessageCircle,
      label: "내 댓글 조회",
      onClick: () => onMyCommentsClick?.(),
    },
    {
      id: "my-likes",
      icon: Heart,
      label: "내 좋아요 조회",
      onClick: () => onMyLikesClick?.(),
    },
    {
      id: "bookmarks",
      icon: Bookmark,
      label: "북마크 조회",
      onClick: () => onMyBookmarksClick?.(),
    },
  ];

  const supportMenuItems = [
    {
      id: "notice",
      icon: Bell,
      label: "공지사항",
      onClick: onNoticeClick,
    },
    {
      id: "terms",
      icon: FileText,
      label: "이용약관",
      onClick: onTermsClick,
    },
    {
      id: "inquiry",
      icon: HelpCircle,
      label: "문의하기",
      onClick: onInquiryClick,
    },
  ];

  const handleWithdraw = () => {
    Alert.alert(
      "회원 탈퇴",
      "정말로 탈퇴하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "탈퇴", style: "destructive", onPress: () => Alert.alert("알림", "탈퇴 처리되었습니다.") }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                 <ChevronLeft size={24} color="#374151" />
            </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>프로필</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 프로필 사진 영역 */}
        <View style={styles.profileImageSection}>
          <TouchableOpacity onPress={handleProfileImageUpload} style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Plus size={48} color="#9ca3af" />
                  <Text style={styles.placeholderText}>사진 추가</Text>
                </View>
              )}
            </View>
            <View style={styles.addButton}>
                <Plus size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* 닉네임 */}
        <View style={styles.nicknameSection}>
          <Text style={styles.nickname}>초이</Text>
        </View>

        {/* 내 정보 및 활동 섹션 */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>내 정보 및 활동</Text>
          <View style={styles.menuList}>
            {userActivityMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={item.onClick}
                  style={styles.menuItem}
                >
                  <Icon size={20} color="#374151" />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 지원 섹션 */}
        <View style={[styles.menuSection, styles.marginTop]}>
          <Text style={styles.sectionTitle}>지원</Text>
          <View style={styles.menuList}>
            {supportMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={item.onClick}
                  style={styles.menuItem}
                >
                  <Icon size={20} color="#374151" />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 탈퇴하기 버튼 */}
        <TouchableOpacity onPress={handleWithdraw} style={styles.withdrawButton}>
          <Text style={styles.withdrawText}>탈퇴하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
      padding: 4,
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
  },
  scrollContent: {
      paddingBottom: 40,
  },
  profileImageSection: {
      paddingTop: 48,
      paddingBottom: 32,
      alignItems: 'center',
  },
  profileImageContainer: {
      position: 'relative',
  },
  profileImageWrapper: {
      width: 128,
      height: 128,
      borderRadius: 64,
      backgroundColor: '#f3f4f6', // gray-100
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#e5e7eb', // gray-200
      overflow: 'hidden',
  },
  profileImage: {
      width: '100%',
      height: '100%',
  },
  placeholderContainer: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  placeholderText: {
      fontSize: 12,
      color: '#9ca3af', // gray-400
      marginTop: 8,
  },
  addButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
  },
  nicknameSection: {
      alignItems: 'center',
      paddingBottom: 24,
  },
  nickname: {
      fontSize: 24,
      color: '#000',
  },
  menuSection: {
      paddingHorizontal: 16,
  },
  marginTop: {
      marginTop: 32,
  },
  sectionTitle: {
      color: '#4b5563', // gray-600
      marginBottom: 12,
      paddingHorizontal: 8,
  },
  menuList: {
      gap: 8,
  },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e5e7eb',
  },
  menuLabel: {
      fontSize: 16,
      color: '#1f2937', // gray-800
  },
  withdrawButton: {
      marginTop: 48,
      marginBottom: 32,
      paddingHorizontal: 16,
      alignItems: 'center',
  },
  withdrawText: {
      color: '#9ca3af', // gray-400
      fontSize: 16,
  },
});
