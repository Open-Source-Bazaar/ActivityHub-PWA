import { i18n } from '../../models/Translation';
import { MenuItem } from '../User/SessionBox';

export const organizerMenu = ({ t }: typeof i18n, activityId: number): MenuItem[] => [
  { href: `/activity/${activityId}/editor`, title: t('edit_activity') },
  { href: `/activity/${activityId}/forum`, title: t('forum_list') },
  { href: `/activity/${activityId}/cooperation`, title: t('cooperation_management') },
];

export const userMenu = ({ t }: typeof i18n): MenuItem[] => [
  { href: '/organization', title: t('organization_list') },
  { href: '/activity', title: t('activity_list') },
  // { href: '/session', title: t('session_list') }, // TODO: Add when session management is implemented
];
