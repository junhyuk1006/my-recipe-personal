import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Utensils, Calendar, User, Box } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const tabBarStyleBase = {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    height: 60 + insets.bottom,
    paddingBottom: 8 + insets.bottom,
    paddingTop: 8,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: tabBarStyleBase,
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: '레시피',
          tabBarIcon: ({ color, size }) => (
            <Utensils size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="refrigerator"
        options={{
          title: '냉장고',
          tabBarIcon: ({ color, size }) => (
            <Box size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meal-plan"
        options={{
          title: '식단',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'MY',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      
      {/* Hide the login tab if it still exists in the file structure, we use the stack route for login now */}
      <Tabs.Screen
        name="login"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}