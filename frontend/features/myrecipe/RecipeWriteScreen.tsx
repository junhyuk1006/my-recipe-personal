import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, X, Upload, Clock, Users } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface RecipeWriteScreenProps {
  onBack: () => void;
  onSubmit?: () => void;
}

interface CookingStep {
  id: number;
  stepNumber: number;
  image: string | null;
  title: string;
  description: string;
}

export function RecipeWriteScreen({ onBack, onSubmit }: RecipeWriteScreenProps) {
  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [cookingSteps, setCookingSteps] = useState<CookingStep[]>([
    { id: 1, stepNumber: 1, image: null, title: "", description: "" }
  ]);

  const handleMainImageUpload = () => {
     // In a real app, use expo-image-picker here
     Alert.alert("알림", "이미지 업로드 기능은 실제 기기에서 구현해야 합니다. 테스트용 이미지를 설정합니다.");
     setMainImage("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop");
  };

  const handleStepImageUpload = (stepId: number) => {
    // In a real app, use expo-image-picker here
    Alert.alert("알림", "이미지 업로드 기능은 실제 기기에서 구현해야 합니다. 테스트용 이미지를 설정합니다.");
    setCookingSteps(cookingSteps.map(step => 
       step.id === stepId ? { ...step, image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjUwODE5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080" } : step
    ));
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addCookingStep = () => {
    const newStepNumber = cookingSteps.length + 1;
    setCookingSteps([
      ...cookingSteps,
      { id: Date.now(), stepNumber: newStepNumber, image: null, title: "", description: "" }
    ]);
  };

  const removeCookingStep = (stepId: number) => {
    if (cookingSteps.length > 1) {
      const filtered = cookingSteps.filter(step => step.id !== stepId);
      // 스텝 번호 재정렬
      const renumbered = filtered.map((step, index) => ({
        ...step,
        stepNumber: index + 1
      }));
      setCookingSteps(renumbered);
    }
  };

  const updateStepTitle = (stepId: number, value: string) => {
    setCookingSteps(cookingSteps.map(step =>
      step.id === stepId ? { ...step, title: value } : step
    ));
  };

  const updateStepDescription = (stepId: number, value: string) => {
    setCookingSteps(cookingSteps.map(step =>
      step.id === stepId ? { ...step, description: value } : step
    ));
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!title.trim()) {
      Alert.alert("알림", "제목을 입력해주세요.");
      return;
    }
    if (!mainImage) {
      Alert.alert("알림", "대표 사진을 업로드해주세요.");
      return;
    }
    
    // 레시피 데이터 구성
    const recipeData = {
      title,
      mainImage,
      ingredients: ingredients.filter(i => i.trim()),
      cookTime,
      servings,
      cookingSteps: cookingSteps.map(step => ({
        stepNumber: step.stepNumber,
        image: step.image,
        title: step.title,
        description: step.description
      }))
    };

    console.log("레시피 저장:", recipeData);
    Alert.alert("성공", "레시피가 등록되었습니다!", [{ text: "확인", onPress: () => onSubmit?.() }]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>레시피 작성</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* 제목 */}
            <View style={styles.section}>
                <Text style={styles.label}>제목</Text>
                <Input
                    placeholder="레시피 제목을 입력하세요"
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            {/* 대표 사진 */}
            <View style={styles.section}>
                <Text style={styles.label}>대표 사진</Text>
                {mainImage ? (
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: mainImage }} style={styles.mainImage} />
                        <TouchableOpacity
                            onPress={() => setMainImage(null)}
                            style={styles.removeImageButton}
                        >
                            <X size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleMainImageUpload} style={styles.uploadPlaceholder}>
                        <Upload size={32} color="#9ca3af" />
                        <Text style={styles.uploadText}>사진을 업로드하세요</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* 기본 정보 */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.halfWidth}>
                        <Text style={styles.labelRow}>
                            <Clock size={16} color="#374151" />
                            <Text style={styles.labelText}> 조리시간</Text>
                        </Text>
                        <Input
                            placeholder="예: 45분"
                            value={cookTime}
                            onChangeText={setCookTime}
                        />
                    </View>
                    <View style={styles.halfWidth}>
                         <Text style={styles.labelRow}>
                            <Users size={16} color="#374151" />
                            <Text style={styles.labelText}> 몇 인분</Text>
                        </Text>
                        <Input
                            placeholder="예: 4인분"
                            value={servings}
                            onChangeText={setServings}
                        />
                    </View>
                </View>

                <Text style={[styles.label, styles.marginTop]}>재료</Text>
                <View style={styles.listContainer}>
                    {ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.listItemRow}>
                            <View style={styles.flex1}>
                                <Input
                                    placeholder={`재료 ${index + 1}`}
                                    value={ingredient}
                                    onChangeText={(text) => updateIngredient(index, text)}
                                />
                            </View>
                            {ingredients.length > 1 && (
                                <TouchableOpacity 
                                    onPress={() => removeIngredient(index)}
                                    style={styles.removeButton}
                                >
                                    <X size={20} color="#9ca3af" />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
                        <Plus size={16} color="#4b5563" />
                        <Text style={styles.addButtonText}>재료 추가</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 조리 순서 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>조리 순서</Text>
                <View style={styles.stepsContainer}>
                    {cookingSteps.map((step) => (
                        <View key={step.id} style={styles.stepCard}>
                            <View style={styles.stepHeader}>
                                <View style={styles.stepBadgeRow}>
                                    <View style={styles.stepBadge}>
                                        <Text style={styles.stepBadgeText}>{step.stepNumber}</Text>
                                    </View>
                                    <Text style={styles.stepBadgeLabel}>Step {step.stepNumber}</Text>
                                </View>
                                {cookingSteps.length > 1 && (
                                    <TouchableOpacity 
                                        onPress={() => removeCookingStep(step.id)}
                                        style={styles.removeButton}
                                    >
                                        <X size={20} color="#9ca3af" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* 조리 순서 사진 */}
                            {step.image ? (
                                <View style={styles.stepImageWrapper}>
                                    <Image source={{ uri: step.image }} style={styles.stepImage} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCookingSteps(cookingSteps.map(s =>
                                                s.id === step.id ? { ...s, image: null } : s
                                            ));
                                        }}
                                        style={styles.removeImageButton}
                                    >
                                        <X size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity 
                                    onPress={() => handleStepImageUpload(step.id)}
                                    style={styles.stepUploadPlaceholder}
                                >
                                    <Upload size={24} color="#9ca3af" />
                                    <Text style={styles.stepUploadText}>사진 업로드</Text>
                                </TouchableOpacity>
                            )}

                            <Input
                                placeholder="조리 단계 제목 (예: 야채 손질하기)"
                                value={step.title}
                                onChangeText={(text) => updateStepTitle(step.id, text)}
                                style={styles.stepTitleInput}
                            />
                            
                            <TextInput
                                multiline
                                placeholder="조리 방법을 상세히 설명해주세요"
                                value={step.description}
                                onChangeText={(text) => updateStepDescription(step.id, text)}
                                style={styles.textArea}
                                textAlignVertical="top"
                            />
                        </View>
                    ))}

                    <TouchableOpacity onPress={addCookingStep} style={styles.addButton}>
                        <Plus size={20} color="#4b5563" />
                        <Text style={styles.addButtonText}>조리 순서 추가</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>등록하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // gray-50 equivalent
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
    backgroundColor: 'white',
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
      paddingBottom: 40,
  },
  section: {
      backgroundColor: 'white',
      padding: 16,
      marginTop: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
  },
  label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#374151',
      marginBottom: 8,
  },
  labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
  },
  labelText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
  },
  imageWrapper: {
      position: 'relative',
  },
  mainImage: {
      width: '100%',
      height: 224, // h-56
      borderRadius: 12,
      backgroundColor: '#e5e7eb',
  },
  removeImageButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 12,
      padding: 6,
  },
  uploadPlaceholder: {
      width: '100%',
      height: 224,
      borderWidth: 2,
      borderColor: '#d1d5db',
      borderStyle: 'dashed',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
  },
  uploadText: {
      color: '#6b7280',
  },
  row: {
      flexDirection: 'row',
      gap: 12,
  },
  halfWidth: {
      flex: 1,
  },
  marginTop: {
      marginTop: 16,
  },
  listContainer: {
      gap: 8,
  },
  listItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  flex1: {
      flex: 1,
  },
  removeButton: {
      padding: 8,
  },
  addButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      padding: 12,
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderStyle: 'dashed',
      borderRadius: 8,
      marginTop: 8,
  },
  addButtonText: {
      color: '#4b5563',
      fontWeight: '500',
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 16,
  },
  stepsContainer: {
      gap: 24,
  },
  stepCard: {
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 12,
      padding: 16,
      backgroundColor: '#fff',
  },
  stepHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
  },
  stepBadgeRow: {
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
      fontWeight: 'bold',
      fontSize: 14,
  },
  stepBadgeLabel: {
      fontWeight: '500',
      color: '#1f2937',
  },
  stepImageWrapper: {
      position: 'relative',
      marginBottom: 12,
  },
  stepImage: {
      width: '100%',
      height: 192, // h-48
      borderRadius: 8,
      backgroundColor: '#f3f4f6',
  },
  stepUploadPlaceholder: {
      width: '100%',
      height: 192,
      borderWidth: 2,
      borderColor: '#d1d5db',
      borderStyle: 'dashed',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
  },
  stepUploadText: {
      fontSize: 14,
      color: '#6b7280',
  },
  stepTitleInput: {
      fontWeight: 'bold',
      marginBottom: 8,
  },
  textArea: {
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 8,
      padding: 12,
      height: 100,
      backgroundColor: '#fff',
      color: '#1f2937',
      fontSize: 16,
  },
  submitButton: {
      backgroundColor: 'black',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
  },
  submitButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
  },
});
