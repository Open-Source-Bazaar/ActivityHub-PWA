import { Activity, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../components/Activity/menu';
import { AgendaList } from '../../../../components/Session/AgendaList';
import { SessionBox } from '../../../../components/User/SessionBox';
import activityStore from '../../../../models/Activity';
import { I18nContext } from '../../../../models/Translation';

interface AgendaListPageProps extends JWTProps<User> {
  activity?: Activity;
}

export const getServerSideProps = compose<{ id: string }, AgendaListPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    try {
      const activity = await activityStore.getOne(+params!.id);

      return { props: { activity } };
    } catch {
      return { props: {} };
    }
  },
);

const AgendaListPage: FC<AgendaListPageProps> = observer(({ jwtPayload }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = i18n.t('agenda_management');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={organizerMenu(i18n, activityId)}>
      <AgendaList activityId={activityId} />
    </SessionBox>
  );
});

export default AgendaListPage;