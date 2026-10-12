import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../styles/theme';

// Các màn hình chính (Tabs)
import { HomeScreen } from '../screens/HomeScreen';
import { SubjectsScreen } from '../screens/SubjectsScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { AssignmentsScreen } from '../screens/AssignmentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

// Các màn hình chi tiết (Stack)
import { SubjectDetailScreen } from '../screens/SubjectDetailScreen';
import { ScheduleDetailScreen } from '../screens/ScheduleDetailScreen';
import { AssignmentDetailScreen } from '../screens/AssignmentDetailScreen';
import { AcademicResultsScreen } from '../screens/AcademicResultsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Cấu hình Bottom Tab Navigator (5 Tabs)
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Tổng quan"
        component={HomeScreen}
        options={{
          title: 'Tổng quan',
          tabBarLabel: 'Tổng quan',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>
              ⌂
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Môn học"
        component={SubjectsScreen}
        options={{
          title: 'Danh sách môn học',
          tabBarLabel: 'Môn học',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>
              ☰
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Thời khóa biểu"
        component={ScheduleScreen}
        options={{
          title: 'Thời khóa biểu',
          tabBarLabel: 'Lịch học',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>
              ▦
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Bài tập"
        component={AssignmentsScreen}
        options={{
          title: 'Quản lý bài tập',
          tabBarLabel: 'Bài tập',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>
              ✓
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={ProfileScreen}
        options={{
          title: 'Thông tin cá nhân',
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcon, { color }]}>
              ●
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 2. Cấu hình Native Stack Navigator (Bọc Tab + Các màn hình Chi tiết)
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Quay lại',
        }}>
        {/* Màn hình chính chứa Bottom Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />

        {/* 4 Màn hình chi tiết theo yêu cầu đề bài */}
        <Stack.Screen
          name="SubjectDetail"
          component={SubjectDetailScreen}
          options={{ title: 'Chi tiết môn học' }}
        />
        <Stack.Screen
          name="ScheduleDetail"
          component={ScheduleDetailScreen}
          options={{ title: 'Chi tiết buổi học' }}
        />
        <Stack.Screen
          name="AssignmentDetail"
          component={AssignmentDetailScreen}
          options={{ title: 'Chi tiết bài tập' }}
        />
        <Stack.Screen
          name="AcademicResults"
          component={AcademicResultsScreen}
          options={{ title: 'Kết quả học tập' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

