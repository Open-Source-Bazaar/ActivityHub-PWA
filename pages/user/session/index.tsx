import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { userMenu } from '../../../components/Activity/menu';
import { SessionList } from '../../../components/Session/List';
import { SessionBox } from '../../../components/User/SessionBox';
import { I18nContext } from '../../../models/Translation';

interface SessionListPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{}, SessionListPageProps>(
  jwtVerifier(),
  async () => ({ props: {} }),
);

const SessionListPage: FC<SessionListPageProps> = observer(({ jwtPayload }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = i18n.t('session_list');

  return (
    <SessionBox
      {...{ title, jwtPayload }}
      path={asPath}
      menu={userMenu(i18n)}
    >
      <SessionList />
    </SessionBox>
  );
});

export default SessionListPage;