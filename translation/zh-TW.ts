import { IDType } from 'mobx-restful';

export default {
  welcome_to: '歡迎使用',
  get_started_by_editing: '開始你的專案吧，編輯',
  upstream_projects: '上游專案',
  home_page: '主頁',
  source_code: '源代碼',
  component: '元件',
  pagination: '分頁',
  powered_by: '強力驅動自',
  documentation: '文檔',
  documentation_summary: '查找有關 Next.js 功能和 API 的深入資訊。',
  learn: '學習',
  learn_summary: '在帶有測驗的交互式課程中了解 Next.js！',
  examples: '示例',
  examples_summary: '發現和部署示例 Next.js 專案。',
  deploy: '部署',
  deploy_summary: '使用 Vercel 立即將您的 Next.js 站點部署到公共 URL。',

  // Pagination Table
  create: '新增',
  view: '查看',
  submit: '提交',
  cancel: '取消',
  edit: '編輯',
  delete: '刪除',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `您確定刪除 ${keys.join('、')} 嗎？`,
  repository_name: '倉庫名',
  programming_language: '編程語言',
  topic: '話題',
  star_count: '星標數',
  description: '描述',

  // Scroll List
  scroll_list: '滾動列表',
  load_more: '加載更多……',
  no_more: '沒有更多',

  // MDX Article
  article: '文章',

  // Homepage sections
  latest_activities: '最新活動',
  active_instructors: '活躍講師',
  partners: '合作夥伴',
  more_activities: '更多活動',
  view_profile: '查看資料',
  participants: '參與者',

  // Activities
  all_activities: '所有活動',
  discover_activities_description: '發現社群中精彩的活動和事件',
  no_activities_found: '沒有找到活動',
  no_activities_description: '暫時沒有可用的活動，請稍後再查看',

  // Activity Editor
  activity_name: '活動名稱',
  banner: '橫幅圖片',
  activity_start_time: '活動開始時間',
  activity_end_time: '活動結束時間',
  create_activity: '創建活動',
  edit_activity: '編輯活動',
  activity_title_placeholder: '請輸入活動名稱',
  activity_address: '活動地址',
  activity_url: '活動連結',
  save_activity: '保存活動',
  activity_created_successfully: '活動創建成功！',
  activity_updated_successfully: '活動更新成功！',
  activity_name_required: '請輸入活動名稱',
  activity_start_time_required: '請選擇活動開始時間',
  activity_end_time_required: '請選擇活動結束時間',

  // General fields
  title: '標題',
  title_required: '請輸入標題',
  summary: '簡介',
  start_time: '開始時間',
  start_time_required: '請選擇開始時間',
  end_time: '結束時間',
  end_time_required: '請選擇結束時間',
  place: '場地',

  // Forum Manager
  manage_forum: '管理論壇',

  // Room/Place Management
  room_management: '會議室管理',
  room_type: '房間類型',
  room_number: '房間編號',
  room_name: '房間名稱',
  room_address: '房間位置',
  room_capacity: '容納人數',
  room_available_time: '可用時間',
  open_time: '開放時間',
  close_time: '關閉時間',
  open_weekdays: '開放日期',
  devices: '設備',
  room_size: '房間大小',
  lecture_hall: '演講廳',
  reception_hall: '會客廳',
  meeting_room: '閉門會議室',
  lounge: '休息室',
  add_room: '添加房間',
  edit_room: '編輯房間',
  delete_room: '刪除房間',
  room_created_successfully: '房間創建成功！',
  room_updated_successfully: '房間更新成功！',
  room_deleted_successfully: '房間刪除成功！',
  room_name_required: '請輸入房間名稱',
  room_capacity_required: '請輸入容納人數',
  select_room: '選擇房間',
  no_rooms_available: '暫無可用房間',
  network: '網路',
  projector: '投影儀',
  led_screen: 'LED螢幕',
  microphone: '麥克風',

  // Partner types
  technology_partners: '技術合作夥伴',
  community_partners: '社群合作夥伴',
  sponsors: '贊助商',
} as const;
