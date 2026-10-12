import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';
import { AcademicResult } from '../data/mockData';

export const AcademicResultsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { student, academicResults } = useApp();

  const renderResultCard = ({ item }: { item: AcademicResult }) => {
    // Màu sắc theo điểm chữ
    const isGood = item.gradeLetter.startsWith('A') || item.gradeLetter.startsWith('B');

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleWrapper}>
            <Text style={styles.codeText}>{item.subjectCode}</Text>
            <Text style={styles.nameText}>{item.subjectName}</Text>
          </View>
          <View
            style={[
              styles.gradeBadge,
              { backgroundColor: isGood ? COLORS.primaryLight : '#FEF3C7' },
            ]}>
            <Text
              style={[
                styles.gradeLetter,
                { color: isGood ? COLORS.primaryDark : '#D97706' },
              ]}>
              {item.gradeLetter}
            </Text>
          </View>
        </View>

        <View style={styles.scoreGrid}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Chuyên cần (10%)</Text>
            <Text style={styles.scoreVal}>{item.attendanceScore}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Giữa kỳ (40%)</Text>
            <Text style={styles.scoreVal}>{item.midtermScore}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Cuối kỳ (50%)</Text>
            <Text style={styles.scoreVal}>{item.finalScore}</Text>
          </View>
          <View style={[styles.scoreItem, styles.scoreItemTotal]}>
            <Text style={styles.scoreLabelTotal}>Tổng kết (Hệ 10)</Text>
            <Text style={styles.scoreValTotal}>{item.totalScore}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.creditText}>Số tín chỉ: {item.credits}</Text>
          <Text
            style={[
              styles.statusText,
              { color: item.totalScore >= 4.0 ? COLORS.success : COLORS.danger },
            ]}>
            {item.totalScore >= 4.0 ? 'Đạt' : 'Học lại'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Thẻ tóm tắt GPA */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{student.gpa}</Text>
          <Text style={styles.summaryLabel}>GPA Hệ 4</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {student.totalCredits}
          </Text>
          <Text style={styles.summaryLabel}>Tín chỉ tích lũy</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {academicResults.length}
          </Text>
          <Text style={styles.summaryLabel}>Môn hoàn thành</Text>
        </View>
      </View>

      {/* Danh sách bảng điểm */}
      <FlatList
        data={academicResults}
        renderItem={renderResultCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Nút quay lại */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Quay lại trang Cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  summaryCard: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#FFCDD2',
    marginTop: 2,
  },
  listContent: {
    padding: 12,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleWrapper: {
    flex: 1,
    marginRight: 8,
  },
  codeText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  gradeBadge: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gradeLetter: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  scoreGrid: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    marginBottom: 8,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  scoreItemTotal: {
    borderLeftWidth: 1,
    borderColor: COLORS.border,
    paddingLeft: 2,
  },
  scoreLabel: {
    fontSize: 9,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  scoreVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  scoreLabelTotal: {
    fontSize: 9,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  scoreValTotal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  creditText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  bottomBar: {
    padding: 12,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
});

