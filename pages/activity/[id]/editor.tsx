import { Activity, User } from '@open-source-bazaar/activityhub-service';
import { Loading } from 'idea-react';
import { observer } from 'mobx-react';
import { FormField } from 'mobx-restful-table';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import { PageHead } from '../../../components/PageHead';
import { SessionForm } from '../../../components/User/SessionForm';
import { ActivityModel } from '../../../models/Activity';
import { I18nContext } from '../../../models/Translation';

interface ActivityEditorProps extends JWTProps<User> {
  activity?: Activity;
}

export const getServerSideProps = compose<{ id: string }, ActivityEditorProps>(
  jwtVerifier(),
  async ({ params }) => {
    // Handle "new" route for creating activities - id 为 0 即为新增
    if (params!.id === 'new' || +params!.id === 0) return { props: {} };
    
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

const ActivityEditor: FC<ActivityEditorProps> = observer(({ jwtPayload, activity }) => {
  const { t } = useContext(I18nContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const activityStore = new ActivityModel();
  
  // Handle modal display after hydration to prevent SSR mismatch
  useEffect(() => {
    setShowAuthModal(!jwtPayload);
  }, [jwtPayload]);
  
  const isEdit = !!activity;
  const title = isEdit ? t('edit_meeting') : t('create_meeting');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = formToJSON(event.currentTarget);

    const { id } = await activityStore.updateOne(formData, activity?.id);

    alert(isEdit ? 'Meeting updated successfully!' : 'Meeting created successfully!');
    window.location.href = `/activity/${id}`;
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Reload the page to get user data
    window.location.reload();
  };

  return (
    <Container className="py-4">
      <PageHead title={title} />
      
      {activityStore.uploading > 0 && <Loading />}
      
      {showAuthModal && (
        <Modal show>
          <Modal.Header>
            <Modal.Title>Please Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SessionForm onSignIn={handleAuthSuccess} />
          </Modal.Body>
        </Modal>
      )}
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="card-title mb-0">{title}</h2>
            </div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <FormField
                  type="text"
                  name="title"
                  required
                  label={t('meeting_name')}
                  defaultValue={activity?.title || ''}
                  className="mb-3"
                />

                <FormField
                  type="datetime-local"
                  name="startTime"
                  required
                  label={t('meeting_start_time')}
                  defaultValue={activity?.startTime ? new Date(activity.startTime).toISOString().slice(0, 16) : ''}
                  className="mb-3"
                />

                <FormField
                  type="datetime-local"
                  name="endTime"
                  required
                  label={t('meeting_end_time')}
                  defaultValue={activity?.endTime ? new Date(activity.endTime).toISOString().slice(0, 16) : ''}
                  className="mb-3"
                />

                <FormField
                  type="text"
                  name="address"
                  label={t('meeting_address')}
                  defaultValue={activity?.address || ''}
                  className="mb-3"
                />

                <FormField
                  type="url"
                  name="url"
                  label={t('meeting_url')}
                  defaultValue={activity?.url || ''}
                  className="mb-3"
                />

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={activityStore.uploading > 0}
                  >
                    {t('save_meeting')}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={activityStore.uploading > 0}
                    onClick={() => window.location.href = '/activity'}
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
});

export default ActivityEditor;