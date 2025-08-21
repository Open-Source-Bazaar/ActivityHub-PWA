import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../components/Activity/menu';
import { SponsorList } from '../../../../components/Sponsor/List';
import { SessionBox } from '../../../../components/User/SessionBox';
import { I18nContext } from '../../../../models/Translation';

interface SponsorListPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{ id: string }, SponsorListPageProps>(jwtVerifier());

const SponsorListPage: FC<SponsorListPageProps> = observer(({ jwtPayload }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = i18n.t('sponsor_management');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={organizerMenu(i18n, activityId)}>
      <SponsorList activityId={activityId} />
    </SessionBox>
  );
});

export default SponsorListPage;