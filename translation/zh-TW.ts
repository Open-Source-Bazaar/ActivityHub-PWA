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

  // Partner types
  technology_partners: '技術合作夥伴',
  community_partners: '社群合作夥伴',
  sponsors: '贊助商',
} as const;
