import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../components/Activity/menu';
import { CooperationList } from '../../../../components/Cooperation/List';
import { SessionBox } from '../../../../components/User/SessionBox';
import { I18nContext } from '../../../../models/Translation';

interface CooperationListPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{ id: string }, CooperationListPageProps>(jwtVerifier());

const CooperationListPage: FC<CooperationListPageProps> = observer(({ jwtPayload }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = i18n.t('cooperation_management');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={organizerMenu(i18n, activityId)}>
      <CooperationList activityId={activityId} />
    </SessionBox>
  );
});

export default CooperationListPage;