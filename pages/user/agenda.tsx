import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { AgendaList } from '../../components/Activity/AgendaList';
import { userMenu } from '../../components/Activity/menu';
import { SessionBox } from '../../components/User/SessionBox';
import { I18nContext } from '../../models/Translation';

interface UserAgendaPageProps extends JWTProps<User> {}

export const getServerSideProps = jwtVerifier<UserAgendaPageProps>();

const UserAgendaPage: FC<UserAgendaPageProps> = observer(({ jwtPayload }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = i18n.t('agenda_management');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={userMenu(i18n)}>
      <AgendaList activityId={0} userId={jwtPayload?.id} />
    </SessionBox>
  );
});

export default UserAgendaPage;