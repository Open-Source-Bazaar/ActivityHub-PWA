import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { AgendaList } from '../../../../components/Activity/AgendaList';
import { organizerMenu } from '../../../../components/Activity/menu';
import { SessionBox } from '../../../../components/User/SessionBox';
import { I18nContext } from '../../../../models/Translation';

interface AgendaListPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{ id: string }, AgendaListPageProps>(
  jwtVerifier(),
);

const AgendaListPage: FC<AgendaListPageProps> = observer(({ jwtPayload }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = i18n.t('agenda_management');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={organizerMenu(i18n, activityId)}>
      <AgendaList activityId={activityId} isOrganizer />
    </SessionBox>
  );
});

export default AgendaListPage;