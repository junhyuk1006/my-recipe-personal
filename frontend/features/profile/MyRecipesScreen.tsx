import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit, Trash2, Heart, MessageCircle } from 'lucide-react-native';

interface MyRecipesScreenProps {
  onBack?: () => void;
  onRecipeClick?: (recipeId: number) => void;
}

const myRecipes = [
  {
    id: 1,
    title: "김치찌개",
    author: "초이",
    date: "2024.12.05",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
    likes: 124,
    comments: 32,
  },
  {
    id: 2,
    title: "된장찌개",
    author: "초이",
    date: "2024.12.03",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop",
    likes: 89,
    comments: 21,
  },
  {
    id: 3,
    title: "비빔밥",
    author: "초이",
    date: "2024.12.01",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop",
    likes: 156,
    comments: 45,
  },
];

export function MyRecipesScreen({ onBack, onRecipeClick }: MyRecipesScreenProps) {
  const [recipes, setRecipes] = useState(myRecipes);

  const handleEdit = (recipeId: number) => {
    Alert.alert("알림", `레시피 ${recipeId} 수정 페이지로 이동`);
  };

  const handleDelete = (recipeId: number) => {
    Alert.alert(
      "삭제 확인",
      "이 레시피를 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { 
          text: "삭제", 
          style: "destructive",
          onPress: () => {
            setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
             <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 레시피</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.recipeList}>
          {recipes.map((recipe) => (
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

                {/* 우측 액션 버튼 */}
                <View style={styles.actionColumn}>
                  <TouchableOpacity
                    onPress={(e) => { e.stopPropagation(); handleEdit(recipe.id); }}
                    style={styles.editButton}
                  >
                    <Edit size={16} color="#374151" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) => { e.stopPropagation(); handleDelete(recipe.id); }}
                    style={styles.deleteButton}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {recipes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>작성한 레시피가 없습니다.</Text>
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
  actionColumn: {
      justifyContent: 'space-between',
      gap: 8,
  },
  editButton: {
      padding: 8,
      backgroundColor: '#f3f4f6',
      borderRadius: 8,
  },
  deleteButton: {
      padding: 8,
      backgroundColor: '#fef2f2',
      borderRadius: 8,
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
