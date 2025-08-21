import { Organization, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { OrganizationEditor } from '../../../components/Organization/Editor';
import { SessionBox } from '../../../components/User/SessionBox';
import organizationStore from '../../../models/Organization';
import { I18nContext } from '../../../models/Translation';

interface OrganizationEditorPageProps extends JWTProps<User> {
  organization?: Organization;
}

export const getServerSideProps = compose<{ id: string }, OrganizationEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    try {
      const organization = await organizationStore.getOne(+params!.id);

      return { props: { organization } };
    } catch {
      return { props: {} };
    }
  },
);

const OrganizationEditorPage: FC<OrganizationEditorPageProps> = observer(({ jwtPayload, organization }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const title = organization ? i18n.t('edit_organization') : i18n.t('create_organization');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath}>
      <OrganizationEditor organization={organization} />
    </SessionBox>
  );
});

export default OrganizationEditorPage;