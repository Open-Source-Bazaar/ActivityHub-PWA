import { i18n } from '../../models/Translation';
import { MenuItem } from '../User/SessionBox';

export const organizerMenu = ({ t }: typeof i18n, activityId: number): MenuItem[] => [
  { href: `/activity/${activityId}/editor`, title: t('edit_activity') },
  { href: `/activity/${activityId}/forum`, title: t('forum_list') },
  { href: `/activity/${activityId}/cooperation`, title: t('cooperation_management') },
  { href: `/activity/${activityId}/agenda`, title: t('agenda_management') },
];

export const userMenu = ({ t }: typeof i18n): MenuItem[] => [
  { href: '/user/organization', title: t('organization_list') },
  { href: '/user/activity', title: t('activity_list') },
  { href: '/user/session', title: t('session_list') },
  { href: '/user/agenda', title: t('agenda_management') },
];
