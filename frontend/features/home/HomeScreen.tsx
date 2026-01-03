import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { RecipeBanner } from './components/RecipeBanner';
import { PopularRecipes } from './components/PopularRecipes';
import { useAuth } from '@/auth/AuthProvider';

interface HomeScreenProps {
  onLogoClick?: () => void;
  onRecipeClick?: (recipeId: number) => void;
  onRecipeListClick?: () => void;
  onWriteClick?: () => void;
  isLoggedIn?: boolean; 
  onLogoutClick?: () => void;
  onLoginClick?: () => void;
  onRefrigeratorClick?: () => void;
  onMealPlanClick?: () => void;
  onProfileClick?: () => void;
}

export function HomeScreen({ onLogoClick, onRecipeClick, onRecipeListClick, onWriteClick, isLoggedIn, onLogoutClick, onLoginClick }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("검색어:", searchQuery);
    // 검색 로직 구현
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onLogoClick} style={styles.logoButton}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>M</Text>
            </View>
            <Text style={styles.brandTitle}>마이레시피</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={isLoggedIn ? onLogoutClick : onLoginClick}>
          <Text style={styles.loginText}>{isLoggedIn ? '로그아웃' : '로그인'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
             <TextInput 
                style={styles.input}
                placeholder="레시피 검색..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
             />
             <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Search size={20} color="white" />
             </TouchableOpacity>
          </View>
        </View>

        {/* 레시피 배너 슬라이드 */}
        <RecipeBanner onRecipeClick={onRecipeClick} />

        {/* 최근 업데이트 */}
        <PopularRecipes onRecipeClick={onRecipeClick} onViewAllClick={onRecipeListClick} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: 'white',
  },
  loginText: {
      fontSize: 16,
      fontWeight: '500',
      marginRight: 16,
  },
  logoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  logoIcon: {
      width: 48,
      height: 48,
      backgroundColor: 'black',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  logoText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
  },
  brandTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1e293b', // slate-800
  },
  scrollContent: {
      paddingBottom: 20,
  },
  searchContainer: {
      padding: 16,
  },
  searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  input: {
      flex: 1,
      height: 48,
      backgroundColor: '#f9fafb', // gray-50
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      fontSize: 16,
  },
  searchButton: {
      width: 44,
      height: 44,
      backgroundColor: 'black',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  }
});
