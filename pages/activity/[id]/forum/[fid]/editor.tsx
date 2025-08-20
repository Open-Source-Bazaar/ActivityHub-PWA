import { Forum, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../../components/Activity/menu';
import { ForumEditor } from '../../../../../components/Forum/Editor';
import { SessionBox } from '../../../../../components/User/SessionBox';
import { ForumModel } from '../../../../../models/Forum';
import { I18nContext } from '../../../../../models/Translation';

interface ForumEditorPageProps extends JWTProps<User> {
  forum?: Forum;
}

export const getServerSideProps = compose<{ id: string; fid: string }, ForumEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    try {
      const forumStore = new ForumModel(+params!.id);

      const forum = await forumStore.getOne(+params!.fid);

      return { props: { forum } };
    } catch {
      return { notFound: true };
    }
  },
);

const ForumEditorPage: FC<ForumEditorPageProps> = observer(({ jwtPayload, forum }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = forum ? '编辑分论坛' : '创建分论坛';

  return (
    <SessionBox
      title={title}
      path={asPath}
      menu={organizerMenu(i18n, activityId)}
      jwtPayload={jwtPayload}
    >
      <ForumEditor activityId={activityId} forum={forum} />
    </SessionBox>
  );
});

export default ForumEditorPage;