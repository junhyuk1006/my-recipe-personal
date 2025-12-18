import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface MealData {
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

interface MealPlanScreenProps {
  onBack?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CALENDAR_PADDING = 32; // 16 * 2
const CELL_GAP = 4;
// Calculate cell size: (Total Width - Padding - (Gap * 6)) / 7
const CELL_SIZE = (SCREEN_WIDTH - CALENDAR_PADDING - (CELL_GAP * 6)) / 7;

export function MealPlanScreen({ onBack }: MealPlanScreenProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<MealData>({
    breakfast: "",
    lunch: "",
    dinner: "",
    snack: "",
  });

  const [mealData, setMealData] = useState<{ [key: string]: MealData }>({
    "2025-12-01": {
      breakfast: "토스트, 우유, 계란프라이",
      lunch: "김치찌개, 공기밥, 깍두기",
      dinner: "삼겹살구이, 상추쌈, 된장찌개",
      snack: "사탕, 초콜릿",
    },
    "2025-12-05": {
      breakfast: "시리얼, 바나나, 요거트",
      lunch: "불고기덮밥, 계란국",
      dinner: "파스타, 샐러드, 마늘빵",
      snack: "아이스크림",
    },
    "2025-12-10": {
      breakfast: "샌드위치, 오렌지주스",
      lunch: "된장찌개, 고등어구이, 밥",
      dinner: "치킨, 피클, 콜라",
      snack: "과자, 사탕",
    },
    "2025-12-15": {
      breakfast: "팬케이크, 딸기, 우유",
      lunch: "비빔밥, 미역국",
      dinner: "스테이크, 감자튀김, 와인",
      snack: "케이크",
    },
    "2025-12-20": {
      breakfast: "베이글, 크림치즈, 커피",
      lunch: "라면, 김밥",
      dinner: "초밥, 우동, 샐러드",
      snack: "초콜릿, 견과류",
    },
  });

  const getMonthInfo = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay, year, month };
  };

  const { firstDay, lastDay, year, month } = getMonthInfo();

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setIsEditMode(false);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setIsEditMode(false);
  };

  const generateCalendarDays = () => {
    const days = [];
    const startDay = firstDay.getDay(); // 0 (Sun) ~ 6 (Sat)
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  const getMealSummary = (day: number) => {
    const dateKey = getDateKey(day);
    const meal = mealData[dateKey];
    if (!meal) return "";
    const parts = [];
    if (meal.breakfast) parts.push(meal.breakfast.split(",")[0]);
    if (meal.lunch) parts.push(meal.lunch.split(",")[0]);
    return parts.join("\n");
  };

  const getSelectedMealData = () => {
    if (selectedDate === null) return null;
    const dateKey = getDateKey(selectedDate);
    return mealData[dateKey] || null;
  };

  const selectedMeal = getSelectedMealData();

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setIsEditMode(false);
  };

  const enterEditMode = () => {
    if (selectedDate !== null) {
      const dateKey = getDateKey(selectedDate);
      const meal = mealData[dateKey];
      if (meal) {
        setEditData(meal);
      }
    }
    setIsEditMode(true);
  };

  const enterAddMode = () => {
    setEditData({
      breakfast: "",
      lunch: "",
      dinner: "",
      snack: "",
    });
    setIsEditMode(true);
  };

  const saveEdit = () => {
    if (selectedDate) {
      const dateKey = getDateKey(selectedDate);
      setMealData((prevData) => ({
        ...prevData,
        [dateKey]: editData,
      }));
    }
    setIsEditMode(false);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditData({
      breakfast: "",
      lunch: "",
      dinner: "",
      snack: "",
    });
  };

  const deleteMeal = () => {
    if (selectedDate) {
        Alert.alert(
            "식단 삭제",
            "정말로 삭제하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                { 
                    text: "삭제", 
                    style: "destructive",
                    onPress: () => {
                        const dateKey = getDateKey(selectedDate);
                        const newData = { ...mealData };
                        delete newData[dateKey];
                        setMealData(newData);
                    }
                }
            ]
        )
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.iconButton}>
              <ChevronLeft size={24} color="#374151" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>식단표</Text>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={goToPrevMonth} style={styles.iconButton}>
            <ChevronLeft size={20} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{year}년 {month + 1}월</Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.iconButton}>
            <ChevronRight size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.calendarContainer}>
          {/* Weekday Header */}
          <View style={styles.weekHeader}>
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
              <Text
                key={day}
                style={[
                  styles.weekDayText,
                  index === 0 ? styles.textRed : index === 6 ? styles.textBlue : styles.textGray
                ]}
              >
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <View key={`empty-${index}`} style={styles.dayCell} />;
              }

              const dateKey = getDateKey(day);
              const hasMeal = !!mealData[dateKey];
              const summary = getMealSummary(day);
              const isSelected = selectedDate === day;

              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => handleDateClick(day)}
                  style={[
                    styles.dayCell,
                    isSelected ? styles.dayCellSelected : hasMeal ? styles.dayCellHasMeal : null
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected ? styles.textWhite : index % 7 === 0 ? styles.textRed : index % 7 === 6 ? styles.textBlue : styles.textGray
                    ]}
                  >
                    {day}
                  </Text>
                  {hasMeal && (
                    <Text style={[styles.daySummary, isSelected ? styles.textGray200 : styles.textGray500]} numberOfLines={2}>
                      {summary}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Date Detail */}
        {selectedDate !== null && (
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>{month + 1}월 {selectedDate}일 식단</Text>
            
            {selectedMeal && !isEditMode ? (
              <View style={styles.mealList}>
                <View style={styles.mealItem}>
                  <Text style={styles.mealLabel}>아침</Text>
                  <Text style={styles.mealContent}>{selectedMeal.breakfast}</Text>
                </View>
                <View style={styles.mealItem}>
                  <Text style={styles.mealLabel}>점심</Text>
                  <Text style={styles.mealContent}>{selectedMeal.lunch}</Text>
                </View>
                <View style={styles.mealItem}>
                  <Text style={styles.mealLabel}>저녁</Text>
                  <Text style={styles.mealContent}>{selectedMeal.dinner}</Text>
                </View>
                <View style={styles.mealItem}>
                  <Text style={styles.mealLabel}>간식</Text>
                  <Text style={styles.mealContent}>{selectedMeal.snack}</Text>
                </View>

                <View style={styles.buttonRow}>
                  <Button variant="secondary" style={styles.flex1} onPress={enterEditMode}>수정</Button>
                  <Button variant="default" style={styles.flex1} onPress={deleteMeal}>삭제</Button>
                </View>
              </View>
            ) : isEditMode ? (
              <View style={styles.form}>
                 <Input
                    label="아침"
                    placeholder="예: 토스트, 우유"
                    value={editData.breakfast}
                    onChangeText={(text) => setEditData(prev => ({ ...prev, breakfast: text }))}
                 />
                 <Input
                    label="점심"
                    placeholder="예: 김치찌개"
                    value={editData.lunch}
                    onChangeText={(text) => setEditData(prev => ({ ...prev, lunch: text }))}
                 />
                 <Input
                    label="저녁"
                    placeholder="예: 삼겹살"
                    value={editData.dinner}
                    onChangeText={(text) => setEditData(prev => ({ ...prev, dinner: text }))}
                 />
                 <Input
                    label="간식"
                    placeholder="예: 초콜릿"
                    value={editData.snack}
                    onChangeText={(text) => setEditData(prev => ({ ...prev, snack: text }))}
                 />
                 <View style={styles.buttonRow}>
                    <Button style={styles.flex1} onPress={saveEdit}>저장</Button>
                    <Button variant="secondary" style={styles.flex1} onPress={cancelEdit}>취소</Button>
                 </View>
              </View>
            ) : (
                <View style={styles.emptyState}>
                     <Button onPress={enterAddMode}>식단 추가</Button>
                </View>
            )}
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
    gap: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  scrollContent: {
      paddingBottom: 40,
  },
  calendarContainer: {
      padding: 16,
  },
  weekHeader: {
      flexDirection: 'row',
      marginBottom: 8,
  },
  weekDayText: {
      width: CELL_SIZE,
      textAlign: 'center',
      fontSize: 14,
      marginRight: CELL_GAP,
  },
  calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: CELL_GAP,
  },
  dayCell: {
      width: CELL_SIZE,
      height: CELL_SIZE,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
      padding: 2,
      alignItems: 'center',
      justifyContent: 'flex-start',
  },
  dayCellHasMeal: {
      borderColor: '#d1d5db', // gray-300
      backgroundColor: '#f9fafb', // gray-50
  },
  dayCellSelected: {
      backgroundColor: '#18181b', // black
      borderColor: '#18181b',
  },
  dayText: {
      fontSize: 14,
      marginBottom: 2,
  },
  daySummary: {
      fontSize: 8, // Very small text
      textAlign: 'center',
  },
  textRed: { color: '#ef4444' },
  textBlue: { color: '#3b82f6' },
  textGray: { color: '#4b5563' },
  textWhite: { color: '#fff' },
  textGray200: { color: '#e5e7eb' },
  textGray500: { color: '#6b7280' },
  
  detailContainer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
  },
  detailTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#000',
  },
  mealList: {
      gap: 16,
  },
  mealItem: {
      backgroundColor: '#f9fafb',
      padding: 16,
      borderRadius: 8,
  },
  mealLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#000',
  },
  mealContent: {
      fontSize: 14,
      color: '#1f2937',
  },
  buttonRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
  },
  flex1: {
      flex: 1,
  },
  form: {
      gap: 16,
  },
  emptyState: {
      alignItems: 'center',
      paddingVertical: 16,
  }
});
