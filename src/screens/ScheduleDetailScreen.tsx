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
import { ScheduleItem } from '../data/mockData';

type ParamList = {
  ScheduleDetail: {
    scheduleItem: ScheduleItem;
  };
};

export const ScheduleDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'ScheduleDetail'>>();
  const navigation = useNavigation();
  const { scheduleItem } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerCard}>
        <View style={styles.badgeRow}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayText}>{scheduleItem.dayOfWeek}</Text>
          </View>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>{scheduleItem.time}</Text>
          </View>
        </View>

        <Text style={styles.subjectTitle}>{scheduleItem.subjectName}</Text>
        <Text style={styles.codeText}>Mã học phần: {scheduleItem.subjectCode}</Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.cardHeading}>Chi tiết lịch trình</Text>

        <View style={styles.row}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Phòng học / Giảng đường</Text>
            <Text style={styles.value}>{scheduleItem.room}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Giảng viên giảng dạy</Text>
            <Text style={styles.value}>{scheduleItem.lecturer}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Nội dung dự kiến buổi học</Text>
            <Text style={[styles.value, styles.contentHighlight]}>
              {scheduleItem.lessonContent}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Quay lại Thời khóa biểu</Text>
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
  dayBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dayText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timeBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  timeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 24,
  },
  codeText: {
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
  cardHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  row: {
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
  contentHighlight: {
    color: COLORS.primary,
    lineHeight: 20,
    fontWeight: '500',
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

