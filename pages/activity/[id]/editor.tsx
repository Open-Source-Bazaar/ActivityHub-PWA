import { Activity, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { ActivityEditor } from '../../../components/Activity/Editor';
import { organizerMenu } from '../../../components/Activity/menu';
import { SessionBox } from '../../../components/User/SessionBox';
import { ActivityModel } from '../../../models/Activity';
import { I18nContext } from '../../../models/Translation';

interface ActivityEditorPageProps extends JWTProps<User> {
  activity?: Activity;
}

export const getServerSideProps = compose<{ id: string }, ActivityEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    const activityStore = new ActivityModel();

    try {
      const activity = await activityStore.getOne(+params!.id);

      return { props: { activity } };
    } catch {
      return { notFound: true };
    }
  },
);

const ActivityEditorPage: FC<ActivityEditorPageProps> = observer(({ jwtPayload, activity }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = i18n.t(activity ? 'edit_activity' : 'create_activity');

  return (
    <SessionBox
      title={title}
      path={asPath}
      menu={organizerMenu(i18n, activity?.id || 0)}
      jwtPayload={jwtPayload}
    >
      <ActivityEditor activity={activity} />
    </SessionBox>
  );
});
export default ActivityEditorPage;
