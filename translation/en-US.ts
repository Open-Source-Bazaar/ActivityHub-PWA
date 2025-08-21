import { IDType } from 'mobx-restful';

export default {
  welcome_to: 'Welcome to',
  get_started_by_editing: 'Get started by editing',
  upstream_projects: 'Upstream projects',
  home_page: 'Home Page',
  source_code: 'Source Code',
  component: 'Component',
  pagination: 'Pagination',
  publish_activity: 'Publish Activity',
  submit_agenda: 'Submit Agenda',
  powered_by: 'Powered by',
  documentation: 'Documentation',
  documentation_summary: 'Find in-depth information about Next.js features and API.',
  learn: 'Learn',
  learn_summary: 'Learn about Next.js in an interactive course with quizzes!',
  examples: 'Examples',
  examples_summary: 'Discover and deploy boilerplate example Next.js projects.',
  deploy: 'Deploy',
  deploy_summary: 'Instantly deploy your Next.js site to a public URL with Vercel.',

  // Pagination Table
  create: 'Create',
  view: 'View',
  submit: 'Submit',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  actions: 'Actions',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `Total ${totalCount} rows`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `Are you sure to delete ${keys.join(', ')}?`,
  repository_name: 'Repository Name',
  programming_language: 'Programming Language',
  topic: 'Topic',
  star_count: 'Star Count',
  description: 'Description',

  // Scroll List
  scroll_list: 'Scroll List',
  load_more: 'Load more...',
  no_more: 'No more',

  // MDX Article
  article: 'Article',

  // Homepage sections
  latest_activities: 'Latest Activities',
  active_instructors: 'Active Instructors',
  partners: 'Partners',
  more_activities: 'More Activities',
  view_profile: 'View Profile',
  participants: 'participants',

  // Activities
  all_activities: 'All Activities',
  discover_activities_description:
    'Discover exciting events and activities happening in our community.',
  no_activities_found: 'No Activities Found',
  no_activities_description:
    'There are currently no activities available. Please check back later.',

  // Activity Editor
  activity_name: 'Activity Name',
  banner: 'Banner Image',
  activity_start_time: 'Activity Start Time',
  activity_end_time: 'Activity End Time',
  create_activity: 'Create Activity',
  edit_activity: 'Edit Activity',
  activity_title_placeholder: 'Enter activity name',
  activity_address: 'Activity Address',
  activity_url: 'Activity URL',
  save_activity: 'Save Activity',
  activity_created_successfully: 'Activity created successfully!',
  activity_updated_successfully: 'Activity updated successfully!',

  // General fields
  title: 'Title',
  summary: 'Summary',
  start_time: 'Start Time',
  end_time: 'End Time',
  place: 'Place',

  // Forum Manager
  manage_forum: 'Manage Forum',
  forum_list: 'Forum List',
  create_forum: 'Create Forum',
  edit_forum: 'Edit Forum',
  forum_created_successfully: 'Forum created successfully!',
  forum_updated_successfully: 'Forum updated successfully!',
  name: 'Name',
  type: 'Type',
  address: 'Address',
  location: 'Location',
  capacity: 'Capacity',
  field_required: 'This field is required',
  opening_hours: 'Opening Hours',
  open_days: 'Open Days',
  equipment: 'Equipment',
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',

  // Room/Place Management
  open_time: 'Open Time',
  close_time: 'Close Time',
  open_weekdays: 'Open Weekdays',
  devices: 'Devices',
  lecture_hall: 'Lecture Hall',
  reception_hall: 'Reception Hall',
  meeting_room: 'Meeting Room',
  lounge: 'Lounge',
  room_created_successfully: 'Room created successfully!',
  room_updated_successfully: 'Room updated successfully!',
  room_deleted_successfully: 'Room deleted successfully!',
  network: 'Network',
  projector: 'Projector',
  led_screen: 'LED Screen',
  microphone: 'Microphone',

  // Partner types
  technology_partners: 'Technology Partners',
  community_partners: 'Community Partners',
  sponsors: 'Sponsors',

  // Sponsor Management
  sponsor_management: 'Sponsor Management',
  sponsor_list: 'Sponsor List',
  create_sponsor: 'Add Sponsor',
  edit_sponsor: 'Edit Sponsor',
  sponsor_level: 'Sponsor Level',
  sponsorship_amount: 'Sponsorship Amount',
  contact_person: 'Contact Person',
  remarks: 'Remarks',
  status: 'Status',
  website: 'Website',
  organization: 'Organization',
  english_name: 'English Name',
  logo: 'Logo',
  sponsor_created_successfully: 'Sponsor created successfully!',
  sponsor_updated_successfully: 'Sponsor updated successfully!',
  sponsor_deleted_successfully: 'Sponsor deleted successfully!',

  // Sponsor Levels
  sponsor_level_platinum: 'Platinum Sponsor',
  sponsor_level_gold: 'Gold Sponsor',
  sponsor_level_silver: 'Silver Sponsor',
  sponsor_level_bronze: 'Bronze Sponsor',

  // Sponsor Status
  sponsor_status_active: 'Active',
  sponsor_status_pending: 'Pending',
  sponsor_status_inactive: 'Inactive',
  sponsor_status_rejected: 'Rejected',
} as const;
