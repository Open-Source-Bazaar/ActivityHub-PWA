import { User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../../components/Activity/menu';
import { SponsorEditor } from '../../../../../components/Sponsor/Editor';
import { SessionBox } from '../../../../../components/User/SessionBox';
import { Sponsor, SponsorModel } from '../../../../../models/Sponsor';
import { I18nContext } from '../../../../../models/Translation';

interface SponsorEditorPageProps extends JWTProps<User> {
  sponsor?: Sponsor;
}

export const getServerSideProps = compose<{ id: string; sid: string }, SponsorEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    try {
      const sponsorStore = new SponsorModel(+params!.id);
      const sponsor = await sponsorStore.getOne(+params!.sid);

      return { props: { sponsor } };
    } catch {
      return { props: {} };
    }
  },
);

const SponsorEditorPage: FC<SponsorEditorPageProps> = observer(({ jwtPayload, sponsor }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = sponsor ? i18n.t('edit_sponsor') : i18n.t('create_sponsor');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={organizerMenu(i18n, activityId)}>
      <SponsorEditor sponsor={sponsor} activityId={activityId} />
    </SessionBox>
  );
});

export default SponsorEditorPage;