import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../components/Activity/menu';
import { ForumList } from '../../../../components/Forum/List';
import { SessionBox } from '../../../../components/User/SessionBox';
import { I18nContext } from '../../../../models/Translation';

interface ForumListPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{ id: string }, ForumListPageProps>(jwtVerifier());

const ForumListPage: FC<ForumListPageProps> = observer(({ jwtPayload }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = i18n.t('forum_list');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={organizerMenu(i18n, activityId)}>
      <ForumList activityId={activityId} />
    </SessionBox>
  );
});

export default ForumListPage;
