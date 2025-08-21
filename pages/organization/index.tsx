import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { OrganizationList } from '../../components/Organization/List';
import { SessionBox } from '../../components/User/SessionBox';
import { I18nContext } from '../../models/Translation';

interface OrganizationListPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{}, OrganizationListPageProps>(jwtVerifier());

const OrganizationListPage: FC<OrganizationListPageProps> = observer(({ jwtPayload }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = i18n.t('organization_list');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath}>
      <OrganizationList />
    </SessionBox>
  );
});

export default OrganizationListPage;