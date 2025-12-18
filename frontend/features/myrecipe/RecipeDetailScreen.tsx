import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, Users, Heart, MessageCircle, ChevronDown, Send, X } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

interface RecipeDetailScreenProps {
  onBack: () => void;
  recipeId?: number;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  avatar: string;
  replies?: Comment[];
}

export function RecipeDetailScreen({ onBack, recipeId = 1, isLoggedIn = false, onLoginClick }: RecipeDetailScreenProps) {
    const insets = useSafeAreaInsets();
    const [liked, setLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ id: number; author: string } | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "요리초보",
      content: "레시피 따라했는데 정말 맛있어요! 가족들이 너무 좋아했습니다 ❤️",
      date: "2시간 전",
      avatar: "👩‍🍳",
      replies: [
        {
          id: 6,
          author: "베이킹마스터",
          content: "감사합니다! 맛있게 드셨다니 기쁘네요 😊",
          date: "1시간 전",
          avatar: "👨‍🍳"
        }
      ]
    },
    {
      id: 2,
      author: "홈베이킹",
      content: "초콜릿 칩 대신 블루베리 넣어도 맛있을까요?",
      date: "5시간 전",
      avatar: "👨‍🍳",
      replies: []
    },
    {
      id: 3,
      author: "디저트러버",
      content: "오븐 온도랑 시간 정확히 지켰더니 완벽하게 나왔어요!",
      date: "1일 전",
      avatar: "🧑‍🍳",
      replies: []
    },
    {
      id: 4,
      author: "케이크마스터",
      content: "생크림 추가해서 데코레이션하면 더 예쁠 것 같아요",
      date: "1일 전",
      avatar: "👩",
      replies: []
    },
    {
      id: 5,
      author: "베이킹왕",
      content: "밀가루는 박력분 쓰는게 좋나요?",
      date: "2일 전",
      avatar: "👨",
      replies: []
    }
  ]);

  const handleLikeClick = () => {
    if (!isLoggedIn) {
      Alert.alert(
        "로그인 필요",
        "로그인이 필요한 기능입니다. 로그인 하시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          { text: "로그인", onPress: () => onLoginClick?.() }
        ]
      );
      return;
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      Alert.alert(
        "로그인 필요",
        "로그인이 필요한 기능입니다. 로그인 하시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          { text: "로그인", onPress: () => onLoginClick?.() }
        ]
      );
      return;
    }

    if (!commentText.trim()) return;

    if (replyingTo) {
      // 대댓글 추가
      setComments(comments.map(comment => {
        if (comment.id === replyingTo.id) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: Date.now(),
                author: "현재사용자",
                content: `@${replyingTo.author} ${commentText}`,
                date: "방금 전",
                avatar: "👤"
              }
            ]
          };
        }
        return comment;
      }));
      setReplyingTo(null);
    } else {
      // 새 댓글 추가
      const newComment: Comment = {
        id: Date.now(),
        author: "현재사용자",
        content: commentText,
        date: "방금 전",
        avatar: "👤",
        replies: []
      };
      setComments([newComment, ...comments]);
    }

    setCommentText("");
  };

  const handleReplyClick = (commentId: number, author: string) => {
    if (!isLoggedIn) {
      Alert.alert(
        "로그인 필요",
        "로그인이 필요한 기능입니다. 로그인 하시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          { text: "로그인", onPress: () => onLoginClick?.() }
        ]
      );
      return;
    }
    setReplyingTo({ id: commentId, author });
    setCommentText("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setCommentText("");
  };

  // 임시 데이터 (나중에 실제 데이터로 대체)
  const recipe = {
    id: recipeId,
    title: "디저트 케이크",
    author: "베이킹마스터",
    date: "2024.12.07",
    mainImage: "https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjUwMDk2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ingredients: [
      "밀가루 2컵",
      "설탕 1컵",
      "계란 3개",
      "버터 100g",
      "베이킹파우더 1큰술",
      "우유 200ml",
      "바닐라 에센스 1작은술",
      "초콜릿 칩 100g"
    ],
    cookTime: "45분",
    servings: 4,
    likes: 245,
    comments: 32,
    steps: [
      {
        step: 1,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjUwODE5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "볼에 밀가루, 설탕, 베이킹파우더를 넣고 잘 섞어주세요. 체에 한번 걸러주면 더욱 부드러운 케이크를 만들 수 있습니다."
      },
      {
        step: 2,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwYmF0dGVyfGVufDF8fHx8MTc2NTA4MTk0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "다른 볼에 계란을 풀고 녹인 버터, 우유, 바닐라 에센스를 넣어 잘 섞어주세요. 거품기로 부드럽게 저어주는 것이 포인트입니다."
      },
      {
        step: 3,
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhpbmclMjBib3dsfGVufDF8fHx8MTc2NTA4MTk3MXww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "가루 재료와 액체 재료를 합쳐서 주걱으로 살살 섞어주세요. 너무 많이 저으면 글루텐이 생겨 딱딱해질 수 있으니 주의하세요."
      },
      {
        step: 4,
        image: "https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjUwMDk2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "180도로 예열한 오븐에서 35-40분간 구워주세요. 이쑤시개로 찔러서 반죽이 묻어나오지 않으면 완성입니다!"
      }
    ]
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : insets.bottom}
            >
                <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>레시피 상세</Text>
        </View>

        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom + 64, 64) }]}>
            {/* Header Info */}
            <View style={styles.infoSection}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <TouchableOpacity 
                        onPress={handleLikeClick}
                        style={[styles.likeButton, liked ? styles.likeButtonActive : null]}
                    >
                        <Heart size={24} color={liked ? "#ef4444" : "#9ca3af"} fill={liked ? "#ef4444" : "none"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.metaInfo}>
                    <View style={styles.authorInfo}>
                        <View style={styles.avatarPlaceholder}>
                            <Text>👨‍🍳</Text>
                        </View>
                        <Text style={styles.authorName}>{recipe.author}</Text>
                    </View>
                    <Text style={styles.dateText}>{recipe.date}</Text>
                </View>
            </View>

            {/* Main Image */}
            <Image source={{ uri: recipe.mainImage }} style={styles.mainImage} />

            {/* Stats */}
            <View style={styles.statsSection}>
                <View style={styles.statsLeft}>
                    <View style={styles.statItem}>
                        <Clock size={16} color="#374151" />
                        <Text style={styles.statText}>{recipe.cookTime}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Users size={16} color="#374151" />
                        <Text style={styles.statText}>{recipe.servings}인분</Text>
                    </View>
                </View>
                <View style={styles.statsRight}>
                    <View style={styles.statItem}>
                        <Heart size={16} color="#4b5563" />
                        <Text style={styles.statText}>{recipe.likes}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MessageCircle size={16} color="#4b5563" />
                        <Text style={styles.statText}>{recipe.comments}</Text>
                    </View>
                </View>
            </View>

            {/* Ingredients */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>재료</Text>
                <View style={styles.ingredientsList}>
                    {recipe.ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.ingredientText}>{ingredient}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Steps */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>조리 순서</Text>
                <View style={styles.stepsList}>
                    {recipe.steps.map((step) => (
                        <View key={step.step} style={styles.stepItem}>
                            <View style={styles.stepHeader}>
                                <View style={styles.stepBadge}>
                                    <Text style={styles.stepBadgeText}>{step.step}</Text>
                                </View>
                                <Text style={styles.stepTitle}>Step {step.step}</Text>
                            </View>
                            <Image source={{ uri: step.image }} style={styles.stepImage} />
                            <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity 
                    style={[styles.actionButton, liked ? styles.actionButtonActive : styles.actionButtonInactive]}
                    onPress={() => setLiked(!liked)}
                >
                    <Heart size={20} color={liked ? "#ef4444" : "#374151"} fill={liked ? "#ef4444" : "none"} />
                    <Text style={[styles.actionButtonText, liked ? styles.textRed : styles.textGray]}>
                        좋아요 {liked ? recipe.likes + 1 : recipe.likes}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonInactive]}>
                    <MessageCircle size={20} color="#374151" />
                    <Text style={[styles.actionButtonText, styles.textGray]}>
                        댓글 {recipe.comments}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Comments Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>댓글 {comments.length}개</Text>
                <View style={styles.commentsList}>
                    {displayedComments.map((comment) => (
                        <View key={comment.id} style={styles.commentItem}>
                            <View style={styles.commentHeader}>
                                <View style={styles.commentAvatar}>
                                    <Text style={{fontSize: 20}}>{comment.avatar}</Text>
                                </View>
                                <View style={styles.commentContentWrapper}>
                                    <View style={styles.commentMeta}>
                                        <Text style={styles.commentAuthor}>{comment.author}</Text>
                                        <Text style={styles.commentDate}>{comment.date}</Text>
                                    </View>
                                    <Text style={styles.commentText}>{comment.content}</Text>
                                    <TouchableOpacity onPress={() => handleReplyClick(comment.id, comment.author)}>
                                        <Text style={styles.replyButtonText}>답글 달기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                                <View style={styles.repliesContainer}>
                                    {comment.replies.map(reply => (
                                        <View key={reply.id} style={styles.replyItem}>
                                            <View style={styles.commentAvatarSmall}>
                                                <Text style={{fontSize: 16}}>{reply.avatar}</Text>
                                            </View>
                                            <View style={styles.commentContentWrapper}>
                                                <View style={styles.commentMeta}>
                                                    <Text style={styles.commentAuthorSmall}>{reply.author}</Text>
                                                    <Text style={styles.commentDate}>{reply.date}</Text>
                                                </View>
                                                <Text style={styles.commentText}>{reply.content}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {!showAllComments && comments.length > 3 && (
                    <TouchableOpacity 
                        style={styles.loadMoreButton}
                        onPress={() => setShowAllComments(true)}
                    >
                        <Text style={styles.loadMoreText}>댓글 더보기 ({comments.length - 3}개)</Text>
                        <ChevronDown size={16} color="#4b5563" />
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>

        {/* Comment Input */}
        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
             {replyingTo && (
                <View style={styles.replyingToBar}>
                    <Text style={styles.replyingToText}>
                        <Text style={styles.replyingToName}>@{replyingTo.author}</Text>님에게 답글 작성 중
                    </Text>
                    <TouchableOpacity onPress={cancelReply}>
                        <Text style={styles.cancelReplyText}>취소</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder={replyingTo ? `@${replyingTo.author}님에게 답글 달기...` : "댓글을 입력하세요..."}
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                />
                {commentText.trim().length > 0 && (
                    <TouchableOpacity onPress={handleCommentSubmit} style={styles.sendButton}>
                         <Text style={styles.sendButtonText}>게시</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
      flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
      padding: 4,
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
  },
  scrollContent: {
      paddingBottom: 0,
  },
  infoSection: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
  },
  titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1f2937',
      flex: 1,
      marginRight: 12,
  },
  likeButton: {
      padding: 8,
      borderRadius: 20,
  },
  likeButtonActive: {
      backgroundColor: '#fef2f2', // red-50
  },
  metaInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  authorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  avatarPlaceholder: {
      width: 32,
      height: 32,
      backgroundColor: '#e5e7eb',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
  },
  authorName: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
  },
  dateText: {
      fontSize: 14,
      color: '#4b5563',
  },
  mainImage: {
      width: '100%',
      height: 288, // h-72
      backgroundColor: '#f3f4f6',
  },
  statsSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
  },
  statsLeft: {
      flexDirection: 'row',
      gap: 16,
  },
  statsRight: {
      flexDirection: 'row',
      gap: 12,
  },
  statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  statText: {
      fontSize: 14,
      color: '#374151',
  },
  sectionContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 12,
  },
  ingredientsList: {
      gap: 8,
  },
  ingredientItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  bullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#9ca3af',
  },
  ingredientText: {
      fontSize: 16,
      color: '#374151',
  },
  stepsList: {
      gap: 24,
  },
  stepItem: {
      gap: 12,
  },
  stepHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  stepBadge: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
  },
  stepBadgeText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
  },
  stepTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: '#1f2937',
  },
  stepImage: {
      width: '100%',
      height: 224, // h-56
      borderRadius: 12,
      backgroundColor: '#f3f4f6',
  },
  stepDescription: {
      fontSize: 16,
      color: '#374151',
      lineHeight: 24,
  },
  actionButtonsContainer: {
      flexDirection: 'row',
      gap: 12,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
  },
  actionButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
  },
  actionButtonInactive: {
      backgroundColor: '#f9fafb',
      borderColor: '#d1d5db',
  },
  actionButtonActive: {
      backgroundColor: '#fef2f2',
      borderColor: '#fca5a5',
  },
  actionButtonText: {
      fontSize: 14,
      fontWeight: '500',
  },
  textRed: { color: '#dc2626' },
  textGray: { color: '#374151' },
  
  commentsList: {
      gap: 16,
  },
  commentItem: {
      //
  },
  commentHeader: {
      flexDirection: 'row',
      gap: 12,
  },
  commentAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#f3f4f6',
      justifyContent: 'center',
      alignItems: 'center',
  },
  commentContentWrapper: {
      flex: 1,
  },
  commentMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
  },
  commentAuthor: {
      fontSize: 14,
      fontWeight: '500',
      color: '#1f2937',
  },
  commentDate: {
      fontSize: 12,
      color: '#6b7280',
  },
  commentText: {
      fontSize: 14,
      color: '#374151',
      lineHeight: 20,
  },
  replyButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#6b7280',
      marginTop: 8,
  },
  repliesContainer: {
      paddingLeft: 48, // Indentation for replies
      marginTop: 12,
      gap: 12,
  },
  replyItem: {
      flexDirection: 'row',
      gap: 12,
  },
  commentAvatarSmall: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#f3f4f6',
      justifyContent: 'center',
      alignItems: 'center',
  },
  commentAuthorSmall: {
      fontSize: 14,
      fontWeight: '500',
      color: '#1f2937',
  },
  loadMoreButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      padding: 12,
      marginTop: 16,
      backgroundColor: '#f9fafb',
      borderRadius: 8,
  },
  loadMoreText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#4b5563',
  },

  inputContainer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      backgroundColor: 'white',
  },
  replyingToBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#eff6ff',
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
  },
  replyingToText: {
      fontSize: 14,
      color: '#374151',
  },
  replyingToName: {
      fontWeight: 'bold',
      color: '#2563eb',
  },
  cancelReplyText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#6b7280',
  },
  inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  textInput: {
      flex: 1,
      backgroundColor: '#f3f4f6',
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 12,
      maxHeight: 100,
      fontSize: 16,
  },
  sendButton: {
      backgroundColor: 'black',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 24,
  },
  sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
  },
});
