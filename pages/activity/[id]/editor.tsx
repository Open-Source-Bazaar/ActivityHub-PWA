import { Activity, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext, useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';

import { ActivityEditor } from '../../../components/ActivityEditor';
import { PageHead } from '../../../components/PageHead';
import { SessionForm } from '../../../components/User/SessionForm';
import { ActivityModel } from '../../../models/Activity';
import { I18nContext } from '../../../models/Translation';

interface ActivityEditorPageProps extends JWTProps<User> {
  activity?: Activity;
}

export const getServerSideProps = compose<{ id: string }, ActivityEditorPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    const activityStore = new ActivityModel();

    try {
      const activity = await activityStore.getOne(+params!.id);

      return { props: { activity } };
    } catch {
      return { notFound: true };
    }
  },
);

const ActivityEditorPage: FC<ActivityEditorPageProps> = observer(({ jwtPayload, activity }) => {
  const { t } = useContext(I18nContext);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Handle modal display after hydration to prevent SSR mismatch
  useEffect(() => {
    setShowAuthModal(!jwtPayload);
  }, [jwtPayload]);

  const isEdit = !!activity;
  const title = isEdit ? t('edit_activity') : t('create_activity');

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Reload the page to get user data
    window.location.reload();
  };

  return (
    <Container className="py-4">
      <PageHead title={title} />

      <h1>{title}</h1>

      <ActivityEditor activity={activity} />

      {showAuthModal && (
        <Modal show>
          <Modal.Body>
            <SessionForm onSignIn={handleAuthSuccess} />
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
});
export default ActivityEditorPage;
