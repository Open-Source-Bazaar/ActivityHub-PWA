import { Activity, Forum, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../components/Activity/menu';
import { ForumEditor } from '../../../../components/Forum/Editor';
import { SessionBox } from '../../../../components/User/SessionBox';
import { ActivityModel } from '../../../../models/Activity';
import { ForumModel } from '../../../../models/Forum';
import { I18nContext } from '../../../../models/Translation';

interface ForumEditorPageProps extends JWTProps<User> {
  activity?: Activity;
  forum?: Forum;
}

export const getServerSideProps = compose<{ id: string; fid?: string }, ForumEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    const activityStore = new ActivityModel();

    try {
      const activity = await activityStore.getOne(+params!.id);

      if (params!.fid) {
        const forumStore = new ForumModel(+params!.id);
        const forum = await forumStore.getOne(+params!.fid);

        return { props: { activity, forum } };
      }

      return { props: { activity } };
    } catch {
      return { notFound: true };
    }
  },
);

const ForumEditorPage: FC<ForumEditorPageProps> = observer(({ jwtPayload, activity, forum }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = forum ? '编辑分论坛' : '创建分论坛';

  return (
    <SessionBox
      title={title}
      path={asPath}
      menu={organizerMenu(i18n, activity?.id || 0)}
      jwtPayload={jwtPayload}
    >
      <ForumEditor activityId={activity?.id || 0} forum={forum} />
    </SessionBox>
  );
});

export default ForumEditorPage;