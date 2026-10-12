import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';
import { ScheduleItem } from '../data/mockData';

const DAYS = ['Tất cả', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];

export const ScheduleScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { schedule } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Tất cả');

  // Lọc lịch theo thứ
  const filteredSchedule =
    selectedDay === 'Tất cả'
      ? schedule
      : schedule.filter(item => item.dayOfWeek === selectedDay);

  const renderScheduleCard = ({ item }: { item: ScheduleItem }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() => navigation.navigate('ScheduleDetail', { scheduleItem: item })}>
      <View style={styles.cardTopRow}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>{item.dayOfWeek}</Text>
        </View>
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <Text style={styles.subjectName}>{item.subjectName}</Text>
      <Text style={styles.codeText}>Mã môn: {item.subjectCode}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.footerInfo}>
          <Text style={styles.roomText}>Phòng: {item.room}</Text>
          <Text style={styles.lecturerText}>GV: {item.lecturer}</Text>
        </View>
        <Text style={styles.detailLink}>Chi tiết →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Bộ lọc theo thứ trong tuần */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}>
          {DAYS.map(day => {
            const isSelected = selectedDay === day;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setSelectedDay(day)}>
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextActive,
                  ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Danh sách các buổi học */}
      <FlatList
        data={filteredSchedule}
        renderItem={renderScheduleCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không có lịch học trong {selectedDay}</Text>
            <Text style={styles.emptySub}>
              Bạn không có tiết học nào được xếp lịch vào ngày này.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterSection: {
    backgroundColor: COLORS.card,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterList: {
    paddingHorizontal: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 12,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 0,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dayBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 0,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  timeBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 0,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 2,
    marginBottom: 2,
  },
  codeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },
  footerInfo: {
    flex: 1,
  },
  roomText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: 2,
  },
  lecturerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  detailLink: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});

