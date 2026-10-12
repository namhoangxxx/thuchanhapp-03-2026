import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { student, updateStudent } = useApp();

  // State cho Modal chỉnh sửa
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(student.name);
  const [editEmail, setEditEmail] = useState(student.email);
  const [editPhone, setEditPhone] = useState(student.phone);

  const handleOpenEdit = () => {
    setEditName(student.name);
    setEditEmail(student.email);
    setEditPhone(student.phone);
    setEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      Alert.alert('Thông báo', 'Vui lòng không để trống thông tin!');
      return;
    }
    updateStudent(editName.trim(), editEmail.trim(), editPhone.trim());
    setEditModalVisible(false);
    Alert.alert('Thành công', 'Đã cập nhật thông tin cá nhân!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Profile */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>
            {student.name.charAt(student.name.lastIndexOf(' ') + 1) || 'SV'}
          </Text>
        </View>
        <Text style={styles.userName}>{student.name}</Text>
        <Text style={styles.userCode}>Mã sinh viên: {student.studentCode}</Text>
      </View>

      {/* Thông tin học tập & Cá nhân */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle}>Thông tin sinh viên</Text>
          <TouchableOpacity style={styles.editBtn} onPress={handleOpenEdit}>
            <Text style={styles.editBtnText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Lớp quản lý:</Text>
          <Text style={styles.value}>{student.className}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Ngành học:</Text>
          <Text style={styles.value}>{student.major}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student.email}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>{student.phone}</Text>
        </View>
      </View>

      {/* Thẻ Kết quả học tập chuyển sang Stack Screen */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Kết quả học tập</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statScore}>{student.gpa}</Text>
            <Text style={styles.statSub}>GPA (hệ 4)</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxBorder]}>
            <Text style={[styles.statScore, { color: COLORS.primary }]}>
              {student.totalCredits}
            </Text>
            <Text style={styles.statSub}>Tín chỉ tích lũy</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statScore, { color: COLORS.success }]}>Khá Giỏi</Text>
            <Text style={styles.statSub}>Xếp loại</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.resultsButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AcademicResults')}>
          <Text style={styles.resultsButtonText}>Xem chi tiết bảng điểm →</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Chỉnh sửa thông tin */}
      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
            <Text style={styles.modalSubtitle}>
              Mã SV, Lớp và Ngành học được cố định theo hồ sơ trường.
            </Text>

            <Text style={styles.inputLabel}>Họ và tên</Text>
            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="Nhập họ và tên"
            />

            <Text style={styles.inputLabel}>Email sinh viên</Text>
            <TextInput
              style={styles.modalInput}
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              placeholder="Nhập địa chỉ email"
            />

            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.modalInput}
              value={editPhone}
              onChangeText={setEditPhone}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setEditModalVisible(false)}>
                <Text style={styles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSaveProfile}>
                <Text style={styles.modalSaveText}>Lưu thay đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userCode: {
    fontSize: 12,
    color: '#FFCDD2',
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    marginHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  editBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBtnText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginVertical: 12,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
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
  statScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  resultsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    alignItems: 'center',
  },
  resultsButtonText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  modalCancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalCancelText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  modalSaveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalSaveText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

