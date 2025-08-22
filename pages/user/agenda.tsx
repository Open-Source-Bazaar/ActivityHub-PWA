import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { userMenu } from '../../components/Activity/menu';
import { SessionBox } from '../../components/User/SessionBox';
import { I18nContext } from '../../models/Translation';

interface UserAgendaPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{}, UserAgendaPageProps>(
  jwtVerifier(),
  async () => ({ props: {} }),
);

const UserAgendaPage: FC<UserAgendaPageProps> = observer(({ jwtPayload }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = i18n.t('agenda_management');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={userMenu(i18n)}>
      <div className="text-center mt-5">
        <h3>{i18n.t('agenda_management')}</h3>
        <p>{i18n.t('get_started_by_editing')}</p>
        {/* Users can create agenda items directly through the table's new button */}
      </div>
    </SessionBox>
  );
});

export default UserAgendaPage;