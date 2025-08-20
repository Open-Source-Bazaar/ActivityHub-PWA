import { IDType } from 'mobx-restful';

export default {
  welcome_to: '欢迎使用',
  get_started_by_editing: '开始你的项目吧，编辑',
  upstream_projects: '上游项目',
  home_page: '主页',
  source_code: '源代码',
  component: '组件',
  pagination: '分页',
  powered_by: '强力驱动自',
  documentation: '文档',
  documentation_summary: '查找有关 Next.js 功能和 API 的深入信息。',
  learn: '学习',
  learn_summary: '在带有测验的交互式课程中了解 Next.js！',
  examples: '示例',
  examples_summary: '发现和部署示例 Next.js 项目。',
  deploy: '部署',
  deploy_summary: '使用 Vercel 立即将您的 Next.js 站点部署到公共 URL。',

  // Pagination Table
  create: '新增',
  view: '查看',
  submit: '提交',
  cancel: '取消',
  edit: '编辑',
  delete: '删除',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `您确定删除 ${keys.join('、')} 吗？`,
  repository_name: '仓库名',
  programming_language: '编程语言',
  topic: '话题',
  star_count: '星标数',
  description: '描述',

  // Scroll List
  scroll_list: '滚动列表',
  load_more: '加载更多……',
  no_more: '没有更多',

  // MDX Article
  article: '文章',

  // Homepage sections
  latest_activities: '最新活动',
  active_instructors: '活跃讲师',
  partners: '合作伙伴',
  more_activities: '更多活动',
  view_profile: '查看资料',
  participants: '参与者',

  // Activities
  all_activities: '所有活动',
  discover_activities_description: '发现社区中精彩的活动和事件',
  no_activities_found: '没有找到活动',
  no_activities_description: '暂时没有可用的活动，请稍后再查看',

  // Activity Editor
  activity_name: '活动名称',
  banner: '横幅图片',
  activity_start_time: '活动开始时间',
  activity_end_time: '活动结束时间',
  create_activity: '创建活动',
  edit_activity: '编辑活动',
  activity_title_placeholder: '请输入活动名称',
  activity_address: '活动地址',
  activity_url: '活动链接',
  save_activity: '保存活动',
  activity_created_successfully: '活动创建成功！',
  activity_updated_successfully: '活动更新成功！',
  activity_name_required: '请输入活动名称',
  activity_start_time_required: '请选择活动开始时间',
  activity_end_time_required: '请选择活动结束时间',

  // General fields
  title: '标题',
  title_required: '请输入标题',
  summary: '简介',
  start_time: '开始时间',
  start_time_required: '请选择开始时间',
  end_time: '结束时间',
  end_time_required: '请选择结束时间',
  place: '场地',

  // Forum Manager
  manage_forum: '管理论坛',

  // Room/Place Management
  room_management: '会议室管理',
  room_type: '房间类型',
  room_number: '房间编号',
  room_name: '房间名称',
  room_address: '房间位置',
  room_capacity: '容纳人数',
  room_available_time: '可用时间',
  open_time: '开放时间',
  close_time: '关闭时间',
  open_weekdays: '开放日期',
  devices: '设备',
  room_size: '房间大小',
  lecture_hall: '演讲厅',
  reception_hall: '会客厅',
  meeting_room: '闭门会议室',
  lounge: '休息室',
  add_room: '添加房间',
  edit_room: '编辑房间',
  delete_room: '删除房间',
  room_created_successfully: '房间创建成功！',
  room_updated_successfully: '房间更新成功！',
  room_deleted_successfully: '房间删除成功！',
  room_name_required: '请输入房间名称',
  room_capacity_required: '请输入容纳人数',
  select_room: '选择房间',
  no_rooms_available: '暂无可用房间',
  network: '网络',
  projector: '投影仪',
  led_screen: 'LED屏幕',
  microphone: '麦克风',

  // Partner types
  technology_partners: '技术合作伙伴',
  community_partners: '社区合作伙伴',
  sponsors: '赞助商',
} as const;
