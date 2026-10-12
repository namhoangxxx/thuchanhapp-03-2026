export interface Student {
  id: string;
  name: string;
  studentCode: string;
  className: string;
  major: string;
  email: string;
  phone: string;
  gpa: number;
  totalCredits: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  room: string;
  semester: string;
  description: string;
}

export interface ScheduleItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  dayOfWeek: string; // "Thứ 2", "Thứ 3",...
  time: string;      // "07:30 - 10:00"
  room: string;      // "Phòng A3-201"
  lecturer: string;
  lessonContent: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  deadline: string;   // "15/10/2026"
  isCompleted: boolean;
  note: string;
}

export interface AcademicResult {
  id: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  attendanceScore: number; // Điểm chuyên cần (10%)
  midtermScore: number;    // Điểm giữa kỳ (40%)
  finalScore: number;      // Điểm cuối kỳ (50%)
  totalScore: number;      // Thang 10
  gradeLetter: string;     // A, B+, B, C, D, F
}

export const INITIAL_STUDENT: Student = {
  id: '1',
  name: 'Nguyễn Nam Hoàng',
  studentCode: 'B22DCCN123',
  className: 'D22CQCN01-B',
  major: 'Công nghệ thông tin',
  email: 'namhoang.nguyen@student.edu.vn',
  phone: '0987 654 321',
  gpa: 3.45,
  totalCredits: 78,
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-1',
    code: 'INT1340',
    name: 'Lập trình ứng dụng di động',
    credits: 3,
    lecturer: 'ThS. Thiều Minh Duy',
    room: 'Lab 4 - Nhà A2',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description: 'Nghiên cứu kiến trúc React Native, React Navigation, State Management và xây dựng ứng dụng di động đa nền tảng.',
  },
  {
    id: 'sub-2',
    code: 'INT1312',
    name: 'Cấu trúc dữ liệu & Giải thuật',
    credits: 4,
    lecturer: 'TS. Nguyễn Văn Toàn',
    room: 'Phòng 302 - Nhà A3',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description: 'Các cấu trúc dữ liệu cơ bản và nâng cao: Tree, Graph, Heap và các thuật toán tìm kiếm, sắp xếp, quy hoạch động.',
  },
  {
    id: 'sub-3',
    code: 'INT1405',
    name: 'Thiết kế giao diện UI/UX',
    credits: 3,
    lecturer: 'ThS. Trần Thị Mai',
    room: 'Phòng 205 - Nhà B1',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description: 'Quy chuẩn thiết kế giao diện di động, trải nghiệm người dùng, Design System và sử dụng Figma trong dự án phần mềm.',
  },
  {
    id: 'sub-4',
    code: 'INT1331',
    name: 'Cơ sở dữ liệu nâng cao',
    credits: 3,
    lecturer: 'PGS.TS. Lê Hoàng Sơn',
    room: 'Phòng 401 - Nhà A2',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description: 'Tối ưu hóa câu truy vấn, chỉ mục, lưu trữ NoSQL và mô hình cơ sở dữ liệu phân tán.',
  },
  {
    id: 'sub-5',
    code: 'INT1422',
    name: 'Kiến trúc máy tính & HĐH',
    credits: 3,
    lecturer: 'TS. Phạm Minh Tuấn',
    room: 'Phòng 101 - Nhà A1',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description: 'Kiến trúc phần cứng, vi xử lý, quản lý bộ nhớ, tiến trình và đa luồng trong hệ điều hành.',
  },
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    subjectCode: 'INT1340',
    subjectName: 'Lập trình ứng dụng di động',
    dayOfWeek: 'Thứ 2',
    time: '07:30 - 10:00',
    room: 'Lab 4 - Nhà A2',
    lecturer: 'ThS. Thiều Minh Duy',
    lessonContent: 'Bài thực hành 3: Điều hướng màn hình với React Navigation',
  },
  {
    id: 'sch-2',
    subjectCode: 'INT1312',
    subjectName: 'Cấu trúc dữ liệu & Giải thuật',
    dayOfWeek: 'Thứ 3',
    time: '09:00 - 11:30',
    room: 'Phòng 302 - Nhà A3',
    lecturer: 'TS. Nguyễn Văn Toàn',
    lessonContent: 'Cây nhị phân tìm kiếm cân bằng (AVL Tree)',
  },
  {
    id: 'sch-3',
    subjectCode: 'INT1405',
    subjectName: 'Thiết kế giao diện UI/UX',
    dayOfWeek: 'Thứ 4',
    time: '13:30 - 16:00',
    room: 'Phòng 205 - Nhà B1',
    lecturer: 'ThS. Trần Thị Mai',
    lessonContent: 'Thực hành tạo wireframe và prototype trên ứng dụng di động',
  },
  {
    id: 'sch-4',
    subjectCode: 'INT1331',
    subjectName: 'Cơ sở dữ liệu nâng cao',
    dayOfWeek: 'Thứ 5',
    time: '07:30 - 10:00',
    room: 'Phòng 401 - Nhà A2',
    lecturer: 'PGS.TS. Lê Hoàng Sơn',
    lessonContent: 'Tối ưu chỉ mục B-Tree và Query Execution Plan trong SQL Server',
  },
  {
    id: 'sch-5',
    subjectCode: 'INT1340',
    subjectName: 'Lập trình ứng dụng di động',
    dayOfWeek: 'Thứ 6',
    time: '13:30 - 16:00',
    room: 'Lab 4 - Nhà A2',
    lecturer: 'ThS. Thiều Minh Duy',
    lessonContent: 'Quản lý state toàn cục và kết nối API',
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Xây dựng điều hướng Bottom Tab & Stack',
    subjectCode: 'INT1340',
    subjectName: 'Lập trình ứng dụng di động',
    deadline: '14/10/2026',
    isCompleted: false,
    note: 'Sử dụng React Navigation 7, kết hợp tab bar với màn hình chi tiết',
  },
  {
    id: 'asg-2',
    title: 'Cài đặt cây đỏ đen (Red-Black Tree)',
    subjectCode: 'INT1312',
    subjectName: 'Cấu trúc dữ liệu & Giải thuật',
    deadline: '16/10/2026',
    isCompleted: false,
    note: 'Cài đặt thuật toán chèn và quay cây bằng C++',
  },
  {
    id: 'asg-3',
    title: 'Thiết kế Design System cho App Học tập',
    subjectCode: 'INT1405',
    subjectName: 'Thiết kế giao diện UI/UX',
    deadline: '18/10/2026',
    isCompleted: true,
    note: 'Xuất file prototype Figma kèm tài liệu đặc tả màu sắc, typography',
  },
  {
    id: 'asg-4',
    title: 'Bài tập truy vấn nâng cao và Index',
    subjectCode: 'INT1331',
    subjectName: 'Cơ sở dữ liệu nâng cao',
    deadline: '22/10/2026',
    isCompleted: false,
    note: 'Viết báo cáo đánh giá thời gian truy vấn trước và sau khi đánh index',
  },
  {
    id: 'asg-5',
    title: 'Báo cáo tìm hiểu kiến trúc ARM',
    subjectCode: 'INT1422',
    subjectName: 'Kiến trúc máy tính & HĐH',
    deadline: '25/10/2026',
    isCompleted: true,
    note: 'So sánh tập lệnh RISC và CISC',
  },
];

export const INITIAL_ACADEMIC_RESULTS: AcademicResult[] = [
  {
    id: 'res-1',
    subjectCode: 'INT1340',
    subjectName: 'Lập trình ứng dụng di động',
    credits: 3,
    attendanceScore: 9.5,
    midtermScore: 8.5,
    finalScore: 8.8,
    totalScore: 8.8,
    gradeLetter: 'A',
  },
  {
    id: 'res-2',
    subjectCode: 'INT1312',
    subjectName: 'Cấu trúc dữ liệu & Giải thuật',
    credits: 4,
    attendanceScore: 10.0,
    midtermScore: 7.5,
    finalScore: 8.0,
    totalScore: 8.0,
    gradeLetter: 'B+',
  },
  {
    id: 'res-3',
    subjectCode: 'INT1405',
    subjectName: 'Thiết kế giao diện UI/UX',
    credits: 3,
    attendanceScore: 9.0,
    midtermScore: 9.0,
    finalScore: 9.2,
    totalScore: 9.1,
    gradeLetter: 'A',
  },
  {
    id: 'res-4',
    subjectCode: 'INT1331',
    subjectName: 'Cơ sở dữ liệu nâng cao',
    credits: 3,
    attendanceScore: 8.5,
    midtermScore: 7.0,
    finalScore: 7.5,
    totalScore: 7.4,
    gradeLetter: 'B',
  },
  {
    id: 'res-5',
    subjectCode: 'INT1422',
    subjectName: 'Kiến trúc máy tính & HĐH',
    credits: 3,
    attendanceScore: 9.0,
    midtermScore: 8.0,
    finalScore: 8.0,
    totalScore: 8.1,
    gradeLetter: 'B+',
  },
];

