import { Activity, User } from '@open-source-bazaar/activityhub-service';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC } from 'react';
import { Container, Modal } from 'react-bootstrap';

import { PageHead } from '../../../components/PageHead';
import { SessionForm } from '../../../components/User/SessionForm';
import { ActivityModel } from '../../../models/Activity';

interface ActivityEditorProps extends JWTProps<User> {
  activity?: Activity;
}

export const getServerSideProps = compose<{ id: string }, ActivityEditorProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.id) return { props: {} };

    const activityStore = new ActivityModel();

    const activity = await activityStore.getOne(+params!.id);

    return { props: { activity } };
  },
);

const ActivityEditor: FC<ActivityEditorProps> = ({ jwtPayload }) => (
  <Container>
    <PageHead />

    {!jwtPayload && (
      <Modal show>
        <Modal.Body>
          <SessionForm />
        </Modal.Body>
      </Modal>
    )}
  </Container>
);

export default ActivityEditor;
