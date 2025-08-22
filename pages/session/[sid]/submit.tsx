import { Activity, Session, User } from '@open-source-bazaar/activityhub-service';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { userMenu } from '../../../components/Activity/menu';
import { SessionBox } from '../../../components/User/SessionBox';
import activityStore from '../../../models/Activity';
import { AgendaModel } from '../../../models/Agenda';
import { SessionModel } from '../../../models/Session';
import { I18nContext } from '../../../models/Translation';

interface SessionSubmitPageProps extends JWTProps<User> {
  session?: Session;
  activities: Activity[];
}

export const getServerSideProps = compose<{ sid: string }, SessionSubmitPageProps>(
  jwtVerifier(),
  async ({ params }) => {
    if (!+params!.sid) return { props: { activities: [] } };

    try {
      const sessionStore = new SessionModel();
      const session = await sessionStore.getOne(+params!.sid);
      
      // Get list of activities to submit to
      const activities = await activityStore.getList({}, 1, 100);

      return { props: { session, activities: activities || [] } };
    } catch {
      return { props: { activities: [] } };
    }
  },
);

const SessionSubmitPage: FC<SessionSubmitPageProps> = observer(({ jwtPayload, session, activities = [] }) => {
  const { asPath } = useRouter(),
    i18n = useContext(I18nContext);

  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = i18n.t('submit_to_activity');

  const handleSubmit = async () => {
    if (!selectedActivityId || !session) return;

    setIsSubmitting(true);
    try {
      const agendaStore = new AgendaModel(selectedActivityId);
      
      // Create agenda from session data
      const agendaData = {
        forum: {
          title: session.title,
          summary: session.summary,
          // Set default times that organizers can modify
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + (session.durationMinute || 60) * 60000).toISOString(),
        },
        adopted: false, // Not adopted until organizer approves
      };

      await agendaStore.updateOne(agendaData as any);
      
      alert(i18n.t('agenda_submitted_successfully'));
      window.location.href = '/user/session';
    } catch (error) {
      console.error('Error submitting agenda:', error);
      alert('Failed to submit agenda. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <SessionBox
        {...{ title, jwtPayload }}
        path={asPath}
        menu={userMenu(i18n)}
      >
        <Container>
          <Card>
            <Card.Body>
              <Card.Text>Session not found.</Card.Text>
              <Button variant="primary" href="/user/session">
                {i18n.t('session_list')}
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </SessionBox>
    );
  }

  return (
    <SessionBox
      {...{ title, jwtPayload }}
      path={asPath}
      menu={userMenu(i18n)}
    >
      <Container>
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h3" className="mb-0">
                  {session.title}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <p><strong>{i18n.t('session_summary')}:</strong> {session.summary || '-'}</p>
                <p><strong>{i18n.t('duration_minutes')}:</strong> {session.durationMinute} {i18n.t('minutes')}</p>
                {session.peopleCapacity && (
                  <p><strong>{i18n.t('people_capacity')}:</strong> {session.peopleCapacity}</p>
                )}
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title as="h4" className="mb-0">
                  {i18n.t('submit_to_activity')}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>{i18n.t('select_activity')}</Form.Label>
                    <Form.Select 
                      value={selectedActivityId || ''} 
                      required
                      onChange={(e) => setSelectedActivityId(+e.target.value || null)}
                    >
                      <option value="">{i18n.t('please_select')}</option>
                      {activities.map((activity) => (
                        <option key={activity.id} value={activity.id}>
                          {activity.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button 
                      variant="primary" 
                      disabled={!selectedActivityId || isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? i18n.t('submitting') : i18n.t('submit')}
                    </Button>
                    <Button variant="secondary" href="/user/session">
                      {i18n.t('cancel')}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </SessionBox>
  );
});

export default SessionSubmitPage;