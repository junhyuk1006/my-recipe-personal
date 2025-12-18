import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Heart, MessageCircle } from 'lucide-react-native';

interface MyLikesScreenProps {
  onBack?: () => void;
  onRecipeClick?: (recipeId: number) => void;
}

const myLikedRecipes = [
  {
    id: 4,
    title: "떡볶이",
    author: "요리왕",
    date: "2024.12.04",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
    likes: 234,
    comments: 56,
  },
  {
    id: 5,
    title: "짜장면",
    author: "셰프김",
    date: "2024.12.02",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
    likes: 189,
    comments: 42,
  },
];

export function MyLikesScreen({ onBack, onRecipeClick }: MyLikesScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 좋아요</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.recipeList}>
          {myLikedRecipes.map((recipe) => (
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

        {myLikedRecipes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>좋아요한 레시피가 없습니다.</Text>
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
