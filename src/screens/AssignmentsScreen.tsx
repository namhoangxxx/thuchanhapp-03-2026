import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';
import { Assignment } from '../data/mockData';

type FilterType = 'all' | 'pending' | 'completed';

export const AssignmentsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { assignments, toggleAssignment } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');

  // Lọc bài tập
  const filteredList = assignments.filter(item => {
    if (filter === 'pending') return !item.isCompleted;
    if (filter === 'completed') return item.isCompleted;
    return true;
  });

  const completedCount = assignments.filter(item => item.isCompleted).length;
  const pendingCount = assignments.length - completedCount;

  const renderAssignmentCard = ({ item }: { item: Assignment }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardBody}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AssignmentDetail', { assignment: item })}>
        <View style={styles.cardHeader}>
          <Text style={styles.subjectName}>{item.subjectName}</Text>
          <View style={styles.dueBadge}>
            <Text style={styles.dueText}>Hạn: {item.deadline}</Text>
          </View>
        </View>

        <Text
          style={[
            styles.titleText,
            item.isCompleted && styles.titleTextCompleted,
          ]}>
          {item.title}
        </Text>

        {item.note ? (
          <Text style={styles.noteText} numberOfLines={2}>
            {item.note}
          </Text>
        ) : null}
      </TouchableOpacity>

      {/* Thanh cập nhật trạng thái */}
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[
            styles.statusBtn,
            item.isCompleted ? styles.statusBtnCompleted : styles.statusBtnPending,
          ]}
          activeOpacity={0.8}
          onPress={() => toggleAssignment(item.id)}>
          <Text
            style={[
              styles.statusBtnText,
              item.isCompleted
                ? styles.statusBtnTextCompleted
                : styles.statusBtnTextPending,
            ]}>
            {item.isCompleted ? '[Đã xong] - Chạm đổi' : '[Đang làm] - Chạm xong'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AssignmentDetail', { assignment: item })}>
          <Text style={styles.detailLink}>Chi tiết →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Bộ lọc tab ngang */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}>
          <Text
            style={[
              styles.filterTabText,
              filter === 'all' && styles.filterTabTextActive,
            ]}>
            Tất cả ({assignments.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, filter === 'pending' && styles.filterTabActive]}
          onPress={() => setFilter('pending')}>
          <Text
            style={[
              styles.filterTabText,
              filter === 'pending' && styles.filterTabTextActive,
            ]}>
            Chờ nộp ({pendingCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, filter === 'completed' && styles.filterTabActive]}
          onPress={() => setFilter('completed')}>
          <Text
            style={[
              styles.filterTabText,
              filter === 'completed' && styles.filterTabTextActive,
            ]}>
            Đã xong ({completedCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách bài tập FlatList */}
      <FlatList
        data={filteredList}
        renderItem={renderAssignmentCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không có bài tập nào</Text>
            <Text style={styles.emptySub}>
              Không có bài tập nào thuộc danh mục này.
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
  filterBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    marginHorizontal: 3,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterTabText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 12,
  },
  card: {
    backgroundColor: COLORS.card,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardBody: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  subjectName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
  },
  dueBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dueText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginVertical: 4,
    lineHeight: 20,
  },
  titleTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statusBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statusBtnPending: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  statusBtnCompleted: {
    backgroundColor: COLORS.successLight,
    borderColor: '#BBF7D0',
  },
  statusBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusBtnTextPending: {
    color: '#B45309',
  },
  statusBtnTextCompleted: {
    color: '#15803D',
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
  },
});

