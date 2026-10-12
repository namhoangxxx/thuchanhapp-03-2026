import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';
import { Subject } from '../data/mockData';

export const SubjectsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { subjects } = useApp();

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>(subjects);

  // Lọc danh sách môn học theo tên khi keyword thay đổi
  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredSubjects(subjects);
    } else {
      const lower = searchKeyword.toLowerCase();
      const filtered = subjects.filter(
        item =>
          item.name.toLowerCase().includes(lower) ||
          item.code.toLowerCase().includes(lower)
      );
      setFilteredSubjects(filtered);
    }
  }, [searchKeyword, subjects]);

  const renderSubjectCard = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('SubjectDetail', { subject: item })}>
      <View style={styles.cardHeader}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{item.code}</Text>
        </View>
        <View style={styles.creditBadge}>
          <Text style={styles.creditText}>{item.credits} tín chỉ</Text>
        </View>
      </View>

      <Text style={styles.subjectName}>{item.name}</Text>

      <View style={styles.cardInfoRow}>
        <Text style={styles.infoLabel}>Giảng viên:</Text>
        <Text style={styles.infoValue}>{item.lecturer}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.roomText}>Phòng: {item.room}</Text>
        <Text style={styles.detailLink}>Xem chi tiết →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm môn học */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm môn học theo tên hoặc mã..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            clearButtonMode="while-editing"
          />
          {searchKeyword.length > 0 && (
            <TouchableOpacity onPress={() => setSearchKeyword('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Thông tin số lượng */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>
          Tìm thấy <Text style={styles.countHighlight}>{filteredSubjects.length}</Text> môn học
        </Text>
      </View>

      {/* Danh sách môn học FlatList */}
      <FlatList
        data={filteredSubjects}
        renderItem={renderSubjectCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không tìm thấy môn học nào</Text>
            <Text style={styles.emptySub}>
              Vui lòng thử tìm kiếm với từ khóa khác.
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
  searchContainer: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  clearBtn: {
    fontSize: 14,
    color: COLORS.textSecondary,
    paddingHorizontal: 6,
  },
  countRow: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 2,
  },
  countText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  countHighlight: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 12,
    paddingTop: 6,
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
    marginBottom: 6,
  },
  codeBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  codeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  creditBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  creditText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  cardInfoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginRight: 4,
  },
  infoValue: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginTop: 4,
  },
  roomText: {
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

