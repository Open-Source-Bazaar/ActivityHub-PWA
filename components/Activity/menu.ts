import { i18n } from '../../models/Translation';
import { MenuItem } from '../User/SessionBox';

export const organizerMenu = ({ t }: typeof i18n, activityId: number): MenuItem[] => [
  { href: `/activity/${activityId}/editor`, title: t('edit_activity') },
  { href: `/activity/${activityId}/forum`, title: t('forum_list') },
  { href: `/activity/${activityId}/sponsor`, title: t('sponsor_management') },
];
