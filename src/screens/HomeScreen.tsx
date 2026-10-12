import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';
import { Subject, Assignment } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { student, subjects, assignments } = useApp();

  // Lọc bài tập chưa hoàn thành (sắp đến hạn)
  const upcomingAssignments = assignments.filter(item => !item.isCompleted);

  // Render thẻ môn học nhanh
  const renderSubjectItem = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={styles.subjectCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('SubjectDetail', { subject: item })}>
      <View style={styles.subjectCodeBadge}>
        <Text style={styles.subjectCodeText}>{item.code}</Text>
      </View>
      <Text style={styles.subjectNameText} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.subjectFooter}>
        <Text style={styles.subjectCreditText}>{item.credits} tín chỉ</Text>
        <Text style={styles.viewDetailText}>Chi tiết →</Text>
      </View>
    </TouchableOpacity>
  );

  // Render thẻ bài tập sắp hạn
  const renderAssignmentItem = ({ item }: { item: Assignment }) => (
    <TouchableOpacity
      style={styles.assignmentCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('AssignmentDetail', { assignment: item })}>
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentSubject}>{item.subjectName}</Text>
        <View style={styles.dueBadge}>
          <Text style={styles.dueBadgeText}>Hạn: {item.deadline}</Text>
        </View>
      </View>
      <Text style={styles.assignmentTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.assignmentFooter}>
        <View style={styles.pendingStatusBadge}>
          <Text style={styles.pendingStatusText}>Chưa hoàn thành</Text>
        </View>
        <Text style={styles.viewDetailText}>Xem →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header thẻ sinh viên */}
      <View style={styles.headerBanner}>
        <View style={styles.studentInfoRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {student.name.charAt(student.name.lastIndexOf(' ') + 1) || 'SV'}
            </Text>
          </View>
          <View style={styles.studentTextWrapper}>
            <Text style={styles.welcomeText}>Xin chào,</Text>
            <Text style={styles.studentName}>{student.name}</Text>
            <View style={styles.studentBadge}>
              <Text style={styles.studentCode}>Mã SV: {student.studentCode}</Text>
            </View>
          </View>
        </View>

        {/* Thống kê nhanh */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{subjects.length}</Text>
            <Text style={styles.statLabel}>Môn học</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxBorder]}>
            <Text style={[styles.statNumber, { color: COLORS.primary }]}>
              {upcomingAssignments.length}
            </Text>
            <Text style={styles.statLabel}>Bài tập chờ</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{student.gpa}</Text>
            <Text style={styles.statLabel}>GPA tích lũy</Text>
          </View>
        </View>
      </View>

      {/* 2. Danh sách môn học đang học */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Môn học đang học</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Môn học')}>
            <Text style={styles.seeAllText}>Xem tất cả →</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={subjects}
          renderItem={renderSubjectItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListPadding}
        />
      </View>

      {/* 3. Danh sách bài tập sắp đến hạn */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bài tập sắp đến hạn</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Bài tập')}>
            <Text style={styles.seeAllText}>Tất cả ({assignments.length}) →</Text>
          </TouchableOpacity>
        </View>

        {upcomingAssignments.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Bạn không còn bài tập nào sắp đến hạn.</Text>
          </View>
        ) : (
          <FlatList
            data={upcomingAssignments}
            renderItem={renderAssignmentItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        )}
      </View>

      <View style={{ height: 25 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBanner: {
    backgroundColor: COLORS.primary,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  studentTextWrapper: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 13,
    color: '#FFCDD2',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  studentBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  studentCode: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBoxBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  horizontalListPadding: {
    paddingRight: 8,
  },
  subjectCard: {
    width: 190,
    backgroundColor: COLORS.card,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  subjectCodeBadge: {
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    marginBottom: 6,
  },
  subjectCodeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subjectNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    minHeight: 38,
  },
  subjectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 6,
  },
  subjectCreditText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  viewDetailText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  assignmentCard: {
    backgroundColor: COLORS.card,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
  },
  dueBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dueBadgeText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  assignmentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginVertical: 4,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  pendingStatusBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  pendingStatusText: {
    fontSize: 11,
    color: '#B45309',
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

