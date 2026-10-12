import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { COLORS } from '../styles/theme';
import { Subject } from '../data/mockData';

type ParamList = {
  SubjectDetail: {
    subject: Subject;
  };
};

export const SubjectDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'SubjectDetail'>>();
  const navigation = useNavigation();
  const { subject } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header card môn học */}
      <View style={styles.headerCard}>
        <View style={styles.badgeRow}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{subject.code}</Text>
          </View>
          <View style={styles.creditBadge}>
            <Text style={styles.creditText}>{subject.credits} Tín chỉ</Text>
          </View>
        </View>
        <Text style={styles.subjectTitle}>{subject.name}</Text>
        <Text style={styles.semesterText}>Học kỳ: {subject.semester}</Text>
      </View>

      {/* Thông tin chi tiết */}
      <View style={styles.detailCard}>
        <Text style={styles.sectionHeading}>Thông tin lớp học phần</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Giảng viên phụ trách</Text>
            <Text style={styles.value}>{subject.lecturer}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Địa điểm học tập</Text>
            <Text style={styles.value}>{subject.room}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Mô tả môn học</Text>
            <Text style={[styles.value, styles.descText]}>{subject.description}</Text>
          </View>
        </View>
      </View>

      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Quay lại danh sách môn học</Text>
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
  headerCard: {
    backgroundColor: COLORS.primary,
    padding: 16,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  codeBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  codeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  creditBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  creditText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 24,
  },
  semesterText: {
    fontSize: 12,
    color: '#FFCDD2',
  },
  detailCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  sectionHeading: {
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
  value: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  descText: {
    fontWeight: 'normal',
    lineHeight: 20,
    color: '#334155',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
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

