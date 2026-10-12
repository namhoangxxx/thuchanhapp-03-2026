import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';
import { Assignment } from '../data/mockData';

type ParamList = {
  AssignmentDetail: {
    assignment: Assignment;
  };
};

export const AssignmentDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'AssignmentDetail'>>();
  const navigation = useNavigation();
  const { assignments, toggleAssignment } = useApp();

  // Lấy dữ liệu live từ context theo id để cập nhật ngay khi bấm nút
  const targetId = route.params.assignment.id;
  const currentAssignment =
    assignments.find(item => item.id === targetId) || route.params.assignment;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerCard}>
        <View style={styles.badgeRow}>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectCodeText}>
              {currentAssignment.subjectCode}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              currentAssignment.isCompleted
                ? styles.statusBadgeCompleted
                : styles.statusBadgePending,
            ]}>
            <Text
              style={[
                styles.statusBadgeText,
                currentAssignment.isCompleted
                  ? styles.statusBadgeTextCompleted
                  : styles.statusBadgeTextPending,
              ]}>
              {currentAssignment.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </Text>
          </View>
        </View>

        <Text style={styles.titleText}>{currentAssignment.title}</Text>
        <Text style={styles.subjectNameText}>
          Môn: {currentAssignment.subjectName}
        </Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.heading}>Chi tiết bài nộp</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Hạn nộp bài</Text>
            <Text style={styles.valueHighlight}>{currentAssignment.deadline}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Ghi chú & Yêu cầu đề bài</Text>
            <Text style={styles.noteContent}>
              {currentAssignment.note || 'Không có ghi chú thêm.'}
            </Text>
          </View>
        </View>
      </View>

      {/* Nút hành động cập nhật trạng thái */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          currentAssignment.isCompleted
            ? styles.actionButtonUndone
            : styles.actionButtonDone,
        ]}
        activeOpacity={0.8}
        onPress={() => toggleAssignment(currentAssignment.id)}>
        <Text style={styles.actionButtonText}>
          {currentAssignment.isCompleted
            ? 'Đánh dấu lại là Chưa hoàn thành'
            : 'Đánh dấu là Đã hoàn thành bài tập'}
        </Text>
      </TouchableOpacity>

      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Quay lại danh sách bài tập</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 12,
  },
  bannerCard: {
    backgroundColor: COLORS.primary,
    padding: 16,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subjectBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  subjectCodeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusBadgePending: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeCompleted: {
    backgroundColor: COLORS.successLight,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadgeTextPending: {
    color: '#B45309',
  },
  statusBadgeTextCompleted: {
    color: '#15803D',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 24,
  },
  subjectNameText: {
    fontSize: 12,
    color: '#FFCDD2',
  },
  detailCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  infoCol: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  valueHighlight: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 20,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  actionButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonDone: {
    backgroundColor: COLORS.primary,
  },
  actionButtonUndone: {
    backgroundColor: '#4B5563',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

