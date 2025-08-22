import { Session, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { userMenu } from '../../../components/Activity/menu';
import { SessionEditor } from '../../../components/Session/Editor';
import { SessionBox } from '../../../components/User/SessionBox';
import { SessionModel } from '../../../models/Session';
import { I18nContext } from '../../../models/Translation';

interface SessionEditorPageProps extends JWTProps<User> {
  session?: Session;
}

export const getServerSideProps = compose<{ sid: string }, SessionEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.sid) return { props: {} };

    try {
      const sessionStore = new SessionModel();
      const session = await sessionStore.getOne(+params!.sid);

      return { props: { session } };
    } catch {
      return { props: {} };
    }
  },
);

const SessionEditorPage: FC<SessionEditorPageProps> = observer(({ jwtPayload, session }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = session ? i18n.t('edit_session') : i18n.t('create_session');

  return (
    <SessionBox
      {...{ title, jwtPayload }}
      path={asPath}
      menu={userMenu(i18n)}
    >
      <SessionEditor session={session} />
    </SessionBox>
  );
});

export default SessionEditorPage;