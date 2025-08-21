import { Activity, Cooperation, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { organizerMenu } from '../../../../../components/Activity/menu';
import { CooperationEditor } from '../../../../../components/Cooperation/Editor';
import { SessionBox } from '../../../../../components/User/SessionBox';
import activityStore from '../../../../../models/Activity';
import { CooperationModel } from '../../../../../models/Cooperation';
import { I18nContext } from '../../../../../models/Translation';

interface CooperationEditorPageProps extends JWTProps<User> {
  cooperation?: Cooperation;
  activity?: Activity;
}

export const getServerSideProps = compose<{ id: string; cid: string }, CooperationEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    try {
      const cooperationStore = new CooperationModel(+params!.id);
      const activity = await activityStore.getOne(+params!.id);
      
      const cooperation = +params!.cid ? await cooperationStore.getOne(+params!.cid) : undefined;

      return { props: { cooperation, activity } };
    } catch {
      return { props: {} };
    }
  },
);

const CooperationEditorPage: FC<CooperationEditorPageProps> = observer(({ jwtPayload, cooperation, activity }) => {
  const { asPath, query } = useRouter(),
    i18n = useContext(I18nContext);

  const activityId = +(query.id as string);
  const title = cooperation ? i18n.t('edit_cooperation') : i18n.t('create_cooperation');

  return (
    <SessionBox {...{ title, jwtPayload }} path={asPath} menu={organizerMenu(i18n, activityId)}>
      <CooperationEditor cooperation={cooperation} activityId={activityId} activity={activity} />
    </SessionBox>
  );
});

export default CooperationEditorPage;