import { Activity, User } from '@open-source-bazaar/activityhub-service';
import { FormField } from 'mobx-restful-table';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext, useEffect,useState } from 'react';
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap';
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
    // Handle "new" route for creating activities
    if (params!.id === 'new') return { props: {} };
    
    if (!+params!.id) return { props: {} };

    const activityStore = new ActivityModel();

    try {
      const activity = await activityStore.getOne(+params!.id);

      return { props: { activity } };
    } catch {
      // If activity not found, redirect to new
      return { props: {} };
    }
  },
);

const ActivityEditor: FC<ActivityEditorProps> = ({ jwtPayload, activity }) => {
  const { t } = useContext(I18nContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Handle modal display after hydration to prevent SSR mismatch
  useEffect(() => {
    setShowAuthModal(!jwtPayload);
  }, [jwtPayload]);
  
  const isEdit = !!activity;
  const title = isEdit ? t('edit_meeting') : t('create_meeting');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = formToJSON<{
        title: string;
        startTime: string;
        endTime: string;
        address?: string;
        url?: string;
      }>(event.currentTarget);
      
      // Validate required fields
      if (!formData.title?.trim()) {
        throw new Error('Meeting name is required');
      }
      if (!formData.startTime) {
        throw new Error('Meeting start time is required');
      }
      if (!formData.endTime) {
        throw new Error('Meeting end time is required');
      }
      
      // Validate that end time is after start time
      if (new Date(formData.endTime) <= new Date(formData.startTime)) {
        throw new Error('Meeting end time must be after start time');
      }

      const activityStore = new ActivityModel();
      await activityStore.updateOne(formData, activity?.id);
      
      setSuccess(true);
      
      // Redirect to activity list after success
      setTimeout(() => {
        window.location.href = '/activity';
      }, 1500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Reload the page to get user data
    window.location.reload();
  };

  return (
    <Container className="py-4">
      <PageHead title={title} />
      
      {showAuthModal && (
        <Modal show onHide={() => setShowAuthModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Please Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SessionForm onSignIn={handleAuthSuccess} />
          </Modal.Body>
        </Modal>
      )}
      
      {jwtPayload && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="card-title mb-0">{title}</h2>
              </div>
              <div className="card-body">
                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert variant="success">
                    {isEdit ? 'Meeting updated successfully!' : 'Meeting created successfully!'}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <FormField
                    as="input"
                    type="text"
                    name="title"
                    required
                    label={t('meeting_name')}
                    placeholder={t('meeting_title_placeholder')}
                    defaultValue={activity?.title || ''}
                    className="mb-3"
                  />

                  <FormField
                    as="input"
                    type="datetime-local"
                    name="startTime"
                    required
                    label={t('meeting_start_time')}
                    defaultValue={activity?.startTime ? new Date(activity.startTime).toISOString().slice(0, 16) : ''}
                    className="mb-3"
                  />

                  <FormField
                    as="input"
                    type="datetime-local"
                    name="endTime"
                    required
                    label={t('meeting_end_time')}
                    defaultValue={activity?.endTime ? new Date(activity.endTime).toISOString().slice(0, 16) : ''}
                    className="mb-3"
                  />

                  <FormField
                    as="input"
                    type="text"
                    name="address"
                    label={t('meeting_address')}
                    placeholder="Optional meeting address"
                    defaultValue={activity?.address || ''}
                    className="mb-3"
                  />

                  <FormField
                    as="input"
                    type="url"
                    name="url"
                    label={t('meeting_url')}
                    placeholder="Optional meeting URL"
                    defaultValue={activity?.url || ''}
                    className="mb-3"
                  />

                  <div className="d-flex gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading || success}
                    >
                      {loading ? 'Saving...' : t('save_meeting')}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={loading}
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
      )}
    </Container>
  );
};

export default ActivityEditor;