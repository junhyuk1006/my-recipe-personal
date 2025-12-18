import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Crown, Clock, Star, Heart, MessageCircle, Bookmark, Search
} from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface RecipeListScreenProps {
  onBack: () => void;
  onRecipeClick: (recipeId: number) => void;
  onWriteClick?: () => void;
}

// 더미 데이터
const DUMMY_RECIPES = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  title: i % 5 === 0 ? `${['김치찌개', '된장찌개', '부대찌개', '순두부찌개', '청국장'][i % 5]} 만들기` :
         i % 5 === 1 ? `${['불고기', '제육볶음', '닭갈비', 'LA갈비', '삼겹살'][Math.floor(i / 5) % 5]} 레시피` :
         i % 5 === 2 ? `${['김치볶음밥', '카레라이스', '비빔밥', '덮밥', '주먹밥'][Math.floor(i / 5) % 5]} 황금 레시피` :
         i % 5 === 3 ? `${['떡볶이', '순대', '튀김', '어묵', '김밥'][Math.floor(i / 5) % 5]} 만드는 법` :
         `${['파스타', '리조또', '피자', '스테이크', '샐러드'][Math.floor(i / 5) % 5]} 레시피`,
  description: i % 3 === 0 ? '집에서 쉽게 만드는 정통 레시피' :
               i % 3 === 1 ? '초보자도 따라하기 쉬운 간단 요리' :
               '맛집 부럽지 않은 황금 레시피',
  author: ['요리왕', '맛집지기', '주부9단', '셰프김', '요리조리', '맛있게', '쿡쿡', '냠냠'][i % 8],
  date: new Date(2024, 11 - (i % 12), (i % 28) + 1).toLocaleDateString('ko-KR'),
  image: `https://images.unsplash.com/photo-${1546069901 + (i % 20)}?w=400&h=300&fit=crop`,
  likes: Math.floor(Math.random() * 500),
  comments: Math.floor(Math.random() * 100),
  cookingTime: ['15분', '20분', '30분', '40분', '45분', '60분', '90분'][i % 7],
  rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
}));

// 금주 핫게시판 (좋아요가 가장 많은 게시글)
const HOT_RECIPE = {
  id: 999,
  title: '엄마가 알려주신 비법 김치찌개 황금레시피',
  description: '집에서 쉽게 만드는 정통 김치찌개',
  author: '요리왕',
  date: '2024.12.5',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  likes: 1247,
  comments: 358,
  cookingTime: '30분',
  rating: 5.0,
};

const ITEMS_PER_PAGE = 10;

export function RecipeListScreen({ onBack, onRecipeClick, onWriteClick }: RecipeListScreenProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<number[]>([]);
  
  const totalPages = Math.ceil(DUMMY_RECIPES.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRecipes = DUMMY_RECIPES.slice(startIndex, endIndex);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  const handleSearch = () => {
    console.log("검색어:", searchQuery);
    // 검색 로직 구현
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            color={star <= rating ? "#facc15" : "#e5e7eb"}
            fill={star <= rating ? "#facc15" : "#e5e7eb"}
          />
        ))}
      </View>
    );
  };

  const toggleBookmark = (recipeId: number) => {
    setBookmarkedRecipes((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
            <TouchableOpacity onPress={onBack} style={styles.iconButton}>
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>레시피북</Text>
        </View>
        
        {/* 검색창 */}
        <View style={styles.searchContainer}>
             <View style={styles.searchInputWrapper}>
               <Input
                  placeholder="레시피 검색..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                  style={styles.searchInput}
               />
               <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                  <Search size={20} color="white" />
               </TouchableOpacity>
             </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 금주 핫게시판 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Crown size={20} color="#374151" />
            <Text style={styles.sectionTitle}>금주 레시피 탑1</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => onRecipeClick(HOT_RECIPE.id)}
            style={styles.hotCard}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              {/* BEST 배지 & 썸네일 */}
              <View style={styles.imageContainer}>
                <View style={styles.badge}>
                  <Crown size={12} color="white" />
                  <Text style={styles.badgeText}>BEST</Text>
                </View>
                <Image source={{ uri: HOT_RECIPE.image }} style={styles.hotImage} />
              </View>

              {/* 중앙 정보 */}
              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>{HOT_RECIPE.title}</Text>
                <Text style={styles.description} numberOfLines={1}>{HOT_RECIPE.description}</Text>
                
                {/* 작성자 & 날짜 */}
                <View style={styles.metaRow}>
                  <Text style={styles.author}>{HOT_RECIPE.author}</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.date}>{HOT_RECIPE.date}</Text>
                </View>

                {/* 별점 & 조리시간 */}
                <View style={styles.statsRow}>
                  {renderStars(HOT_RECIPE.rating)}
                  <Text style={styles.ratingText}>{HOT_RECIPE.rating.toFixed(1)}</Text>
                  <View style={styles.timeContainer}>
                    <Clock size={14} color="#4b5563" />
                    <Text style={styles.timeText}>{HOT_RECIPE.cookingTime}</Text>
                  </View>
                </View>
              </View>

              {/* 우측 액션 */}
              <View style={styles.actionsColumn}>
                <View style={styles.actionItem}>
                  <Heart size={16} color="#6b7280" />
                  <Text style={styles.actionText}>{HOT_RECIPE.likes}</Text>
                </View>
                <View style={styles.actionItem}>
                  <MessageCircle size={16} color="#6b7280" />
                  <Text style={styles.actionText}>{HOT_RECIPE.comments}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 일반 레시피 리스트 */}
        <View style={styles.listContainer}>
          {currentRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              onPress={() => onRecipeClick(recipe.id)}
              style={styles.card}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                {/* 좌측 이미지 */}
                <Image source={{ uri: recipe.image }} style={styles.image} />

                {/* 중앙 정보 */}
                <View style={styles.infoContainer}>
                  <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
                  <Text style={styles.description} numberOfLines={1}>{recipe.description}</Text>
                  
                  {/* 작성자 & 날짜 */}
                  <View style={styles.metaRow}>
                    <Text style={styles.author}>{recipe.author}</Text>
                    <Text style={styles.dot}>·</Text>
                    <Text style={styles.date}>{recipe.date}</Text>
                  </View>

                  {/* 별점 & 조리시간 */}
                  <View style={styles.statsRow}>
                    {renderStars(recipe.rating)}
                    <Text style={styles.ratingText}>{recipe.rating.toFixed(1)}</Text>
                    <View style={styles.timeContainer}>
                      <Clock size={14} color="#4b5563" />
                      <Text style={styles.timeText}>{recipe.cookingTime}</Text>
                    </View>
                  </View>
                </View>

                {/* 우측 액션 */}
                <View style={styles.rightActions}>
                  <TouchableOpacity
                    onPress={() => toggleBookmark(recipe.id)}
                  >
                    <Bookmark
                      size={16}
                      color={bookmarkedRecipes.includes(recipe.id) ? "#facc15" : "#9ca3af"} // yellow-400 : gray-400
                      fill={bookmarkedRecipes.includes(recipe.id) ? "#facc15" : "none"}
                    />
                  </TouchableOpacity>
                  <View style={styles.actionGroup}>
                    <View style={styles.actionItem}>
                      <Heart size={16} color="#6b7280" />
                      <Text style={styles.actionText}>{recipe.likes}</Text>
                    </View>
                    <View style={styles.actionItem}>
                      <MessageCircle size={16} color="#6b7280" />
                      <Text style={styles.actionText}>{recipe.comments}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 페이징 */}
        <View style={styles.pagination}>
          {/* 맨 처음 */}
          <TouchableOpacity
            onPress={goToFirstPage}
            disabled={currentPage === 1}
            style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          >
            <ChevronsLeft size={20} color={currentPage === 1 ? '#d1d5db' : '#374151'} />
          </TouchableOpacity>

          {/* 이전 */}
          <TouchableOpacity
            onPress={goToPrevPage}
            disabled={currentPage === 1}
            style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          >
            <ChevronLeft size={20} color={currentPage === 1 ? '#d1d5db' : '#374151'} />
          </TouchableOpacity>

          {/* 페이지 번호 */}
          <View style={styles.pageNumbers}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <TouchableOpacity
                  key={pageNum}
                  onPress={() => setCurrentPage(pageNum)}
                  style={[styles.numberButton, currentPage === pageNum && styles.activeNumberButton]}
                >
                  <Text style={[styles.numberText, currentPage === pageNum && styles.activeNumberText]}>
                    {pageNum}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 다음 */}
          <TouchableOpacity
            onPress={goToNextPage}
            disabled={currentPage === totalPages}
            style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          >
            <ChevronRight size={20} color={currentPage === totalPages ? '#d1d5db' : '#374151'} />
          </TouchableOpacity>

          {/* 맨 끝 */}
          <TouchableOpacity
            onPress={goToLastPage}
            disabled={currentPage === totalPages}
            style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          >
            <ChevronsRight size={20} color={currentPage === totalPages ? '#d1d5db' : '#374151'} />
          </TouchableOpacity>
        </View>

        {/* 페이지 정보 */}
        <Text style={styles.pageInfo}>
          {currentPage} / {totalPages} 페이지 (총 {DUMMY_RECIPES.length}개)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // bg-gray-50 equivalent maybe?
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
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
  searchContainer: {
      //
  },
  searchInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  searchInput: {
      flex: 1,
      backgroundColor: '#f9fafb',
      borderRadius: 12,
  },
  searchButton: {
      width: 44,
      height: 44, // Match typical input height
      backgroundColor: 'black',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  scrollContent: {
      padding: 16,
      paddingBottom: 40,
  },
  section: {
      marginBottom: 24,
  },
  sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
  },
  sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111827',
  },
  hotCard: {
      backgroundColor: '#f3f4f6', // gradient simul
      borderRadius: 16,
      borderWidth: 2,
      borderColor: 'black',
      padding: 12,
  },
  cardContent: {
      flexDirection: 'row',
      gap: 12,
  },
  imageContainer: {
      position: 'relative',
  },
  badge: {
      position: 'absolute',
      top: -4,
      left: -4,
      zIndex: 10,
      backgroundColor: '#374151',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      gap: 2,
  },
  badgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
  },
  hotImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: '#e5e7eb',
  },
  infoContainer: {
      flex: 1,
      justifyContent: 'center',
  },
  title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 4,
  },
  description: {
      fontSize: 12,
      color: '#6b7280', // gray-500
      marginBottom: 8,
  },
  metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
  },
  author: {
      fontSize: 12,
      fontWeight: '500', 
      color: '#4b5563',
  },
  dot: {
      marginHorizontal: 4,
      color: '#9ca3af',
  },
  date: {
      fontSize: 12,
      color: '#4b5563',
  },
  statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  starsContainer: {
      flexDirection: 'row',
      gap: 2,
  },
  ratingText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#d97706', // yellow-600
  },
  timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  timeText: {
      fontSize: 12,
      color: '#4b5563',
  },
  actionsColumn: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      gap: 4,
  },
  actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  actionText: {
      fontSize: 12,
      color: '#6b7280',
  },
  
  listContainer: {
      gap: 12,
  },
  card: {
      backgroundColor: 'white',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      padding: 12,
  },
  image: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: '#f3f4f6',
  },
  rightActions: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
  },
  actionGroup: {
      gap: 4,
  },

  pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
      gap: 8,
  },
  pageButton: {
      padding: 8,
  },
  disabledButton: {
      opacity: 0.3,
  },
  pageNumbers: {
      flexDirection: 'row',
      gap: 4,
  },
  numberButton: {
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  activeNumberButton: {
      backgroundColor: 'black',
  },
  numberText: {
      color: '#374151',
      fontWeight: '500',
  },
  activeNumberText: {
      color: 'white',
  },
  pageInfo: {
      textAlign: 'center',
      marginTop: 16,
      fontSize: 14,
      color: '#6b7280',
  },
});
