import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Heart, MessageCircle } from 'lucide-react-native';

interface MyBookmarksScreenProps {
  onBack?: () => void;
  onRecipeClick?: (recipeId: number) => void;
}

const myBookmarkedRecipes = [
  {
    id: 6,
    title: "파스타 알리오올리오",
    author: "이탈리아요리",
    date: "2024.12.03",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    likes: 312,
    comments: 78,
  },
  {
    id: 7,
    title: "제육볶음",
    author: "맛집요리사",
    date: "2024.12.01",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
    likes: 267,
    comments: 64,
  },
];

export function MyBookmarksScreen({ onBack, onRecipeClick }: MyBookmarksScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>북마크</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.recipeList}>
          {myBookmarkedRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              onPress={() => onRecipeClick?.(recipe.id)}
              style={styles.recipeCard}
            >
              <View style={styles.recipeContent}>
                {/* 좌측 이미지 */}
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

                {/* 중앙 정보 */}
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeTitle} numberOfLines={1}>
                    {recipe.title}
                  </Text>
                  <View style={styles.recipeMeta}>
                    <Text style={styles.metaText}>{recipe.author}</Text>
                    <Text style={styles.metaText}>•</Text>
                    <Text style={styles.metaText}>{recipe.date}</Text>
                  </View>
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Heart size={12} color="#6b7280" />
                        <Text style={styles.statText}>{recipe.likes}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MessageCircle size={12} color="#6b7280" />
                        <Text style={styles.statText}>{recipe.comments}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {myBookmarkedRecipes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>북마크한 레시피가 없습니다.</Text>
          </View>
        )}
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
      padding: 16,
      paddingBottom: 40,
  },
  recipeList: {
      gap: 12,
  },
  recipeCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      padding: 12,
  },
  recipeContent: {
      flexDirection: 'row',
      gap: 12,
  },
  recipeImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: '#f3f4f6',
  },
  recipeInfo: {
      flex: 1,
      justifyContent: 'center',
  },
  recipeTitle: {
      fontSize: 16,
      color: '#1f2937',
      marginBottom: 4,
  },
  recipeMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 8,
  },
  metaText: {
      fontSize: 12,
      color: '#4b5563',
  },
  statsRow: {
      flexDirection: 'row',
      gap: 12,
  },
  statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  statText: {
      fontSize: 12,
      color: '#6b7280',
  },
  emptyContainer: {
      padding: 80,
      alignItems: 'center',
  },
  emptyText: {
      color: '#6b7280',
      fontSize: 16,
  },
});
